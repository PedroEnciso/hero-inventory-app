let express = require("express");
let router = express.Router();

// GET heros home page
router.get("/", (req, res) => {
  res.render("index", { title: "Hero Inventory" });
});

module.exports = router;
