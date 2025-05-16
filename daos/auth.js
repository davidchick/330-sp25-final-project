const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = {};

module.exports.findByEmail = (email) => {
  return User.findOne({ email: email }).lean();
}

module.exports.findById = (userId) => {
  return User.findById(userId).lean();
}

module.exports.login = async (user) => {
  try {
    const savedUser = await User.findOne({ email: user.email }).lean();
    if (!savedUser) {
      return undefined;
    }
    const hasValidPassword = await bcrypt.compare(user.password, savedUser.password);
    if (hasValidPassword) {
      return savedUser;
    } else {
      return undefined;
    }
  } catch (e) {
    throw e;
  }
}

module.exports.create = async (userData) => {
  try {
    const usersExist = await User.find();

    // first user automatically gets admin
    const rolesToAssign = ['shopper'];
    usersExist[0] ? true : rolesToAssign.push('admin');

    const hashedPassword = await bcrypt.hash(userData.password, 3);
    const created = await User.create({ email: userData.email, password: hashedPassword, roles: rolesToAssign });
    return created;
  } catch (e) {
    throw e;
  }
}

module.exports.changePassword = async (userId, newPassword) => {
  try {
    const newPasswordHash = await bcrypt.hash(newPassword, 3);
    await User.findOneAndUpdate({ _id: userId }, { password: newPasswordHash });
    return true;
  } catch (e) {
    throw e;
  }
}

module.exports.updateRoles = async (userId, roles) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, { roles: roles }, { returnDocument: 'after' });
    return updatedUser;
  } catch (e) {
    throw e;
  }
}

module.exports.deleteUser = async (userId) => {
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    return deletedUser;
  } catch (e) {
    throw e;
  }
}