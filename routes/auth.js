const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const authDAO = require('../daos/auth');

// Authenticate
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401);
    }
    const token = authHeader.split(' ')[1];
    try {
        const user = jwt.verify(token, 'shhhhh');
        req.user = user;
        next();
    } catch (error) {
        return res.sendStatus(401);
    }
};

// Authorize User
const authorizeUser = (req, res, next) => {
    if (req.user.roles.includes('admin')) {
        return next();
    } else {
        return res.sendStatus(403);
    }
};

// Login
router.post("/login", async (req, res, next) => {
    try {
        if (!req.body.password || !req.body.email) {
            return res.sendStatus(400);
        }
        const user = await authDAO.login(req.body);
        if (user) {
            const token = jwt.sign({
                email: user.email,
                _id: user._id,
                roles: user.roles
            }, 'shhhhh', {expiresIn: '30m'});
            return res.status(200).send({token});
        } else {
            return res.sendStatus(401);
        }
    } catch(e) {
        return res.status(500).send(e.message);
    }
});

// Update Password
router.put("/password", authenticate, async (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        return res.sendStatus(400);
    }
    await authDAO.changePassword(req.user._id, password);
    return res.sendStatus(200);
});

// Create User
router.post("/signup", async (req, res, next) => {
    try {
        const user = req.body;
        if (!user.password || !user.email) {
            return res.status(400).send('email and password are required');
        } else {
            const userExists = await authDAO.findByEmail(user.email);
            if (userExists) {
                return res.sendStatus(409);
            }
            const savedUser = await authDAO.create(user);
            return res.json(savedUser); 
        }
    } catch(e) {
        return res.status(500).send(e.message);
    }
});

// Admin user can update roles
router.put("/roles", authenticate, authorizeUser, async (req, res, next) => {
    const { userId, roles } = req.body;
    if (!userId || !roles) {
        return res.status(400).send('userId and roles are required');
    }
    const updatedUser = await authDAO.updateRoles(userId, roles);
    return res.status(200).json(updatedUser); 

});

// Admin user can delete a user
router.delete("/delete/:id", authenticate, authorizeUser, async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send('userId is required');
    }
    const deletedUser = await authDAO.deleteUser(id);
    return res.status(200).json(deletedUser); 

});


module.exports = router;