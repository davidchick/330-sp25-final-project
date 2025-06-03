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

module.exports.getPricesForStore = (id) => {
  return Store.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "prices",
        localField: "_id",
        foreignField: "storeId",
        as: "prices"
      }
    },
    { $unwind: "$prices" },
    {
      $lookup: {
        from: "items",
        localField: "prices.itemId",
        foreignField: "_id",
        as: "items"
      }
    },
    { $unwind: "$items" },
    // {
    //   $group: {
    //     _id: "$_id",
    //     name: { $first: "$name" },
    //     location: { $first: "$location" },
    //     prices: { $addToSet: "$prices" },
    //     items: { $addToSet: "$items"}
    //   }
    // },
    {
      $project: {
        _id: 1,
        name: 1,
        location: 1,
        prices: 1,
        items: 1
      }
    }
  ])
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