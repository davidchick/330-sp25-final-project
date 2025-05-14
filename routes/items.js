const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const itemsDAO = require('../daos/items');

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
    const oneItem = await itemsDAO.getById(id);
    return res.status(200).json(oneItem);
});

// Get all items
router.get("/", authenticateUser, async (req, res, next) => {
    const allItems = await itemsDAO.getAll();
    return res.status(200).json(allItems);
});

// Create a new item
router.post("/", authenticateUser, authorizeUser, async (req, res, next) => {
    const newItem = req.body;
    if (newItem.name) {
        newItem.userId = req.user;
        const createdItem = await itemsDAO.create(newItem);
        return res.status(200).json(createdItem);
    }
});

// Update an item
router.put("/:id", authenticateUser, authorizeUser, async (req, res, next) => {
    const { id } = req.params;
    const updatedItem = await itemsDAO.updateItem(id, req.body)
    return res.status(200).json(updatedItem);
});


module.exports = router;