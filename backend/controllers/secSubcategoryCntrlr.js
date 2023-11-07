const Category = require("../models/categoryModel");
const Subcategory = require("../models/subcategoryModel");
const SecSubcategory = require("../models/secSubcategoryModel");

const secSubcategoryCntrl = {
  getSecSubcategories: async (req, res) => {
    try {
      const secSubcategories = await SecSubcategory.find();

      res.json(secSubcategories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createSecSubcategory: async (req, res) => {
    try {
      const { mainCategoryId, subcategoryId, name, images } = req.body;

      const secSubcategory = await SecSubcategory.findOne({ name });

      if (secSubcategory) {
        return res.status(400).json({ msg: "La subcategoría ya existe" });
      }

      const newSecSubcategory = new SecSubcategory({
        mainCategoryId,
        subcategoryId,
        name,
        images,
      });

  

      await newSecSubcategory.save();
      res.json({ msg: "Subcategoría creada." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getSecSubcategory: async (req, res) => {
    try {
      const secSubcategory = await SecSubcategory.findById(req.params.id);

      res.json(secSubcategory);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateSecSubcategory: async (req, res) => {
    try {
      const { mainCategoryId, subcategoryId, name, images } = req.body;

      await SecSubcategory.findOneAndUpdate(
        { _id: req.params.id },
        { mainCategoryId, subcategoryId, name, images }
      );

      res.json({msg: "Subcategoría actualizada"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteSecSubcategory: async(req,res) => {
    try{
      await SecSubcategory.findOneAndDelete({_id: req.params.id})

      res.json({msg: "Se fue re deleteada paaaa"})
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  }
};

module.exports = secSubcategoryCntrl;
