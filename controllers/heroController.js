const Hero = require("../models/hero");
const async = require("async");

// display list of all heroes on home page
exports.index = function (req, res) {
  Hero.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_heroes) {
      if (err) return next(err);
      // successful, so render
      res.render("index", { title: "Hero Inventory", hero_list: list_heroes });
    });
};

// display detail page for a specific hero
exports.hero_detail = function (req, res, next) {
  async.parallel(
    {
      hero: function (callback) {
        Hero.findById(req.params.id).exec(callback);
      },
    },
    function (err, results) {
      if (err) return next(err);
      if (results.hero == null) {
        // no results
        const err = new Error("Hero not found");
        err.status = 404;
        return next(err);
      }
      // successful, so render
      res.render("hero_detail", {
        title: results.hero.name,
        hero: results.hero,
      });
    }
  );
};

exports.add_hero = function (req, res) {
  res.render("add_hero", { title: "Create a New Hero" });
};
