const mongoose = require('mongoose');
const Store = require('../models/store');

module.exports = {};

module.exports.create = (name, location) => {
    try {
      const created = Store.create({name: name, location: location});
      return created;
    } catch (e) {
      throw e;
    }
  }
  
  module.exports.getAll = () => {
    return Store.find();
  }
  
  module.exports.getById = (id) => {
    return Store.findById(id);
  }
  
  module.exports.getAList = (items) => {
    return Store.find({ _id: { $in: items } });
  }
  
  module.exports.updateItem = (id, update) => {
    return Store.findByIdAndUpdate(id, update, {new: true})
  }