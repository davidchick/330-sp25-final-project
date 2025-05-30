const express = require("express");
// const { Router } = require("express");
const router = express.Router();

router.use("/auth", require('./auth'));
router.use("/stores", require('./stores'));
router.use("/items", require('./items'));
router.use("/prices", require('./prices'));

router.use(express.static(__dirname + '/../frontend/dist'));

module.exports = router;
