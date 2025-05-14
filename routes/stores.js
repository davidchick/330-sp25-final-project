const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const storesDAO = require('../daos/stores');

// Authenticate User
const authenticateUser = (req, res, next) => {
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

// Get by item ID
router.get("/:id", authenticateUser, async (req, res, next) => {
    const { id } = req.params;
    const allItems = await storesDAO.getById(id);
    return res.status(200).json(allItems);
});

// Get all items
router.get("/", authenticateUser, async (req, res, next) => {
    const allItems = await storesDAO.getAll();
    return res.status(200).json(allItems);
});

// Create a new item
router.post("/", authenticateUser, authorizeUser, async (req, res, next) => {
    const { name, location } = req.body;
    if (name && location) {
        console.log(req.user);
        const newItem = await storesDAO.create(name, location, req.user);
        return res.status(200).json(newItem);
    }
});

// Update an item
router.put("/:id", authenticateUser, authorizeUser, async (req, res, next) => {
    const { id } = req.params;
    const updatedItem = await storesDAO.updateItem(id, req.body)
    return res.status(200).json(updatedItem);
});


module.exports = router;

