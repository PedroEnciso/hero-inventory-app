const Hero = require("../models/hero");
const async = require("async");
const { body, validationResult } = require("express-validator");
const hero_image = require("../public/images/default-hero.png");

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

// display form to add a new hero on GET
exports.add_hero = function (req, res) {
  res.render("add_hero", { title: "Create a New Hero" });
};

// handle hero create on post
exports.hero_create_post = [
  // validate and sanitize fields
  body("hero_name")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("New hero must have a name")
    .isAlphanumeric()
    .withMessage("Hero name contains non-alphanumeric characters."),
  body("hero_identity")
    .optional({ checkFalsy: true })
    .isAlphanumeric()
    .withMessage("Hero identity contains non-alphanumeric characters."),
  body("alignment", "You must choose an alignment")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body(
    "intelligence",
    "Rating must be between a number between 1 and 100"
  ).isInt({ min: 1, max: 100 }),
  body("strength", "Rating must be between a number between 1 and 100").isInt({
    min: 1,
    max: 100,
  }),
  body("speed", "Rating must be between a number between 1 and 100").isInt({
    min: 1,
    max: 100,
  }),
  body(
    "durability",
    "Rating must be between a number between 1 and 100"
  ).isInt({ min: 1, max: 100 }),
  body("power", "Rating must be between a number between 1 and 100").isInt({
    min: 1,
    max: 100,
  }),
  body("combat", "Rating must be between a number between 1 and 100").isInt({
    min: 1,
    max: 100,
  }),
  body("publisher")
    .optional({ checkFalsy: true })
    .isAlphanumeric()
    .withMessage("Publisher contains non-alphanumeric characters."),
  body("first_appearance").optional({ checkFalsy: true }),

  // process request after validation/sanitization
  (req, res, next) => {
    // extract validation errors from a request
    const errors = validationResults(req);

    // create powerstats object from request to feed to new hero
    const userStats = {
      intelligence: req.body.intelligence,
      strength: req.body.strength,
      speed: req.body.speed,
      durability: req.body.durability,
      power: req.body.power,
      combat: req.body.combat,
    };

    // create a Hero object with escaped and trimmed data
    const hero = new Hero({
      name: req.body.hero_name,
      identity: req.body.hero_identity,
      alignment: req.body.alignment,
      image: hero_image,
      publisher: req.body.publisher,
      first_appearence: req.body.first_appearance,
      powerstats: userStats,
    });

    if (!errors.isEmpty()) {
      // there are errors, render form again with error messages
      res.render("add_hero", {
        title: "Create a New Hero",
        errors: errors.array(),
      });
      return;
    } else {
      // data from form is valid
      hero.save((err) => {
        if (err) return next(err);
      });
      // successfully saved hero to database, so render new hero page
      res.redirect(hero.url);
    }
  },
];
