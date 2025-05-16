const mongoose = require('mongoose');
const Price = require('../models/price');

module.exports = {};

module.exports.create = (price) => {
    try {
        const created = Price.create(price);
        return created;
    } catch (e) {
        throw e;
    }
}

module.exports.getAll = () => {
    return Price.find().populate('itemId').populate('storeId');
}

module.exports.getById = (id) => {
    return Price.findById(id);
}

module.exports.updateItem = (id, update) => {
    return Price.findByIdAndUpdate(id, update, { new: true })
}