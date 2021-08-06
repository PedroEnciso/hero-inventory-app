const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const HeroSchema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  identity: { type: String, required: true, maxLength: 100 },
  alignment: {
    type: String,
    required: true,
    enum: ["good", "bad"],
    default: "good",
  },
});

// virtual for hero's url
HeroSchema.virtual("url").get(function () {
  return "/hero/" + this.name;
});

module.exports = mongoose.model("Hero", HeroSchema);
