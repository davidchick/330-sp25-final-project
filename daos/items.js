const mongoose = require('mongoose');
const Item = require('../models/item');

module.exports = {};

module.exports.create = (item) => {
    try {
        const created = Item.create(item);
        return created;
    } catch (e) {
        throw e;
    }
}

module.exports.getAll = () => {
    return Item.find().populate('userId');
}

module.exports.getById = (id) => {
    return Item.findById(id).populate('userId');
}

module.exports.getPricesForItem = (id) => {
    return Item.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
            $lookup: {
                from: "prices",
                localField: "_id",
                foreignField: "itemId",
                as: "prices"
            }
        },
        { $unwind: "$prices" },
        {
            $group: {
                _id: "$_id",
                name: { $first: "$name" },
                description: { $first: "$description" },
                category: { $first: "$category" },
                averagePrice: { $avg: "$prices.price" },
                lowPrice: { $min: "$prices.price" },
                highPrice: { $max: "$prices.price" },
                priceCount: { $sum: 1 },
                prices: { $addToSet: "$prices" }
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                description: 1,
                category: 1,
                averagePrice: 1,
                lowPrice: 1,
                highPrice: 1,
                priceCount: 1,
                prices: 1
            }
        }
    ]);
}

module.exports.getPriceLimit = (id, limit) => {
    return Item.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
            $lookup: {
                from: "prices",
                localField: "_id",
                foreignField: "itemId",
                as: "price"
            }
        },
        { $unwind: "$price" },
        {
            $lookup: {
                from: "stores",
                localField: "price.storeId",
                foreignField: "_id",
                as: "store"
            }
        },
        { $sort: { price: limit } },
        { $limit: 1 },
    ]);
}

module.exports.updateItem = (id, update) => {
    return Item.findByIdAndUpdate(id, update, { new: true })
}

module.exports.deleteItem = async (itemId) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(itemId);
        return deletedItem;
    } catch (e) {
        throw e;
    }
}