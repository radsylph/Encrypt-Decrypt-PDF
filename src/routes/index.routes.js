const { Router } = require("express");
const { hello } = require("../controllers/index.controllers.js");

const router = Router();
router.get("/", hello);

module.exports = router;
