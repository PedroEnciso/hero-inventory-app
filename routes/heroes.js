const express = require("express");
const router = express.Router();
const hero_controller = require("../controllers/heroController");

// GET heros home page
router.get("/", hero_controller.index);

// Get add hero form
router.get("/add_hero", hero_controller.add_hero);

// GET hero detail page
router.get("/:id", hero_controller.hero_detail);

module.exports = router;
