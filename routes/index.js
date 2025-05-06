const { Router } = require("express");
const router = Router();

router.use("/auth", require('./auth'));
router.use("/stores", require('./stores'));
router.use("/items", require('./items'));
router.use("/prices", require('./prices'));

module.exports = router;
