const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const pricesDAO = require('../daos/prices');

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

// Get by price ID
router.get("/:id", async (req, res, next) => {
    const { id } = req.params;
    const onePrice = await pricesDAO.getById(id);
    return res.status(200).json(onePrice);
});

// Get all prices
router.get("/", async (req, res, next) => {
    const allPrices = await pricesDAO.getAll();
    return res.status(200).json(allPrices);
});

// Create a new price
router.post("/", authenticateUser, authorizeUser, async (req, res, next) => {
    const newPrice = req.body;
    if (newPrice.price) {
        newPrice.userId = req.user;
        newPrice.date = new Date();
        const createdPrice = await pricesDAO.create(newPrice);
        return res.status(200).json(createdPrice);
    }
});

// Update a price
router.put("/:id", authenticateUser, authorizeUser, async (req, res, next) => {
    const { id } = req.params;
    const updatedPrice = await pricesDAO.updateItem(id, req.body)
    return res.status(200).json(updatedPrice);
});

// Admin user can delete a price
router.delete("/:id", authenticateUser, authorizeUser, async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send('priceId is required');
    }
    const deletedPrice = await pricesDAO.deletePrice(id);
    return res.status(200).json(deletedPrice);
});

module.exports = router;