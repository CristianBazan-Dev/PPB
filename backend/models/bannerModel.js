const mongoose = require("mongoose");

const bannerModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    images: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Banners", bannerModel)