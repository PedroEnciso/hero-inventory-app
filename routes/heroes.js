const express = require("express");
const router = express.Router();
const hero_controller = require("../controllers/heroController");

// GET heros home page
router.get("/", hero_controller.index);

// Get add hero form
router.get("/add_hero", hero_controller.add_hero);

// POST request to create a hero
router.post("/add_hero", hero_controller.hero_create_post);

// GET hero detail page
router.get("/:id", hero_controller.hero_detail);

// GET hero delete page
router.get("/:id/delete", hero_controller.hero_delete_get);

module.exports = router;
