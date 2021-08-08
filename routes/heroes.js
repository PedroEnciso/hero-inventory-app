const express = require("express");
const router = express.Router();
const hero_controller = require("../controllers/heroController");

// GET heros home page
router.get("/", hero_controller.index);

module.exports = router;
