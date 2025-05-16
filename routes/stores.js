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

// Get by store ID
router.get("/:id", authenticateUser, async (req, res, next) => {
    const { id } = req.params;
    const oneStore = await storesDAO.getById(id);
    return res.status(200).json(oneStore);
});

// Get all stores
router.get("/", authenticateUser, async (req, res, next) => {
    const allStores = await storesDAO.getAll();
    return res.status(200).json(allStores);
});

// Create a new store
router.post("/", authenticateUser, authorizeUser, async (req, res, next) => {
    const newStore = req.body;
    if (newStore.name && newStore.location) {
        newStore.userId = req.user;
        const createdStore = await storesDAO.create(newStore);
        return res.status(200).json(createdStore);
    }
});

// Update a store
router.put("/:id", authenticateUser, authorizeUser, async (req, res, next) => {
    const { id } = req.params;
    const updatedItem = await storesDAO.updateItem(id, req.body)
    return res.status(200).json(updatedItem);
});

// Admin user can delete a store
router.delete("/:id", authenticateUser, authorizeUser, async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send('priceId is required');
    }
    const deletedStore = await storesDAO.deleteStore(id);
    return res.status(200).json(deletedStore);

});

module.exports = router;

