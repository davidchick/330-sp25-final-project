const mongoose = require('mongoose');
const Store = require('../models/store');

module.exports = {};

module.exports.create = (name, location, user) => {
    try {
      const created = Store.create({name: name, location: location, userId: user});
      return created;
    } catch (e) {
      throw e;
    }
  }
  
  module.exports.getAll = () => {
    return Store.find().populate('userid');
  }
  
  module.exports.getById = (id) => {
    return Store.findById(id).populate('userId');
  }
  
  module.exports.getAList = (items) => {
    return Store.find({ _id: { $in: items } });
  }
  
  module.exports.updateItem = (id, update) => {
    return Store.findByIdAndUpdate(id, update, {new: true})
  }