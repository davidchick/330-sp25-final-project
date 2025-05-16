const mongoose = require('mongoose');
const Store = require('../models/store');

module.exports = {};

module.exports.create = (store) => {
  try {
    const created = Store.create(store);
    return created;
  } catch (e) {
    throw e;
  }
}

module.exports.getAll = () => {
  return Store.find().populate('userId');
}

module.exports.getById = (id) => {
  return Store.findById(id).populate('userId');
}

module.exports.updateItem = (id, update) => {
  return Store.findByIdAndUpdate(id, update, { new: true })
}

module.exports.deleteStore = async (storeId) => {
  try {
    const deletedStore = await Store.findByIdAndDelete(storeId);
    return deletedStore;
  } catch (e) {
    throw e;
  }
}