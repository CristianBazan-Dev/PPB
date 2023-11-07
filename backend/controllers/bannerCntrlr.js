const Banner = require("../models/bannerModel");

const bannerCntrlr = {
  getBanners: async (req, res) => {
    try {
      const getBanners = await Banner.find();

      res.json(getBanners);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createBanner: async (req, res) => {
    try {
      const { name, images } = req.body;

      const newBanner = new Banner({
        name,
        images,
      });

      await newBanner.save();

      res.json({ msg: "Banner creado wachin!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateBanner: async (req, res) => {
    try {
        const {images} = req.body;  
       
        const banner = await Banner.findOneAndUpdate({_id: req.params.id}, {images})
      

        res.json(banner)
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = bannerCntrlr;
