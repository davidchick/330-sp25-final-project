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

module.exports.updateItem = (id, update) => {
    return Item.findByIdAndUpdate(id, update, { new: true })
}