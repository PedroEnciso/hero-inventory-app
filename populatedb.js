const fetch = require("node-fetch");

// import Hero Schema
const Hero = require("./models/hero");

// copy and pasted from MDN express tutorial
// Get arguments passed on command line
var userArgs = process.argv.slice(2);
var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// array that contains the API numbers of each hero I want in the inventory
const heroNumbers = [
  38,
  60,
  70,
  105,
  106,
  107,
  149,
  157,
  165,
  213,
  216,
  226,
  234,
  263,
  275,
  299,
  303,
  332,
  346,
  370,
  405,
  414,
  431,
  432,
  487,
  489,
  510,
  550,
  558,
  566,
  579,
  620,
  630,
  644,
  655,
  659,
  687,
  697,
  717,
  720,
];

// object that will contain all hero data
const heroData = [];

// api variables
const accessToken = "1527366697602365";
const url = `https://superheroapi.com/api/${accessToken}/`;

heroNumbers.forEach((hero) => {
  fetch(url + hero)
    .then((resp) => resp.json())
    .then((data) => {
      const herodetail = {
        name: data.name,
        identity: data["biography"]["full-name"],
        alignment: data.biography.alignment,
        image: data.image.url,
        publisher: data.biography.publisher,
        first_appearence: data.biography["first-appearence"],
        powerstats: data.powerstats,
      };

      const newHero = new Hero(herodetail);

      newHero.save((error) => {
        if (error) {
          console.log("caught: ", error);
        } else {
          console.log("Success saving " + newHero.name);
        }
      });
    })
    .catch((err) => {
      console.log("caught", err.message + " for " + hero);
    });
});
