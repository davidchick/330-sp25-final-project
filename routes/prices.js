const { Router } = require("express");
const router = Router();
const jwt = require('jsonwebtoken');
const pricesDAO = require('../daos/prices');

module.exports = router;