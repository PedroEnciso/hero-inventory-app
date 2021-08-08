const Hero = require("../models/hero");

// display list of all heroes on hopme page
exports.index = function (req, res) {
  Hero.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_heroes) {
      if (err) return next(err);
      // successful, so render
      res.render("index", { title: "Hero Inventory", hero_list: list_heroes });
    });
};
