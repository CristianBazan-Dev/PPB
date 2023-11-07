const Subcategory = require("../models/subcategoryModel");
const Category = require("../models/categoryModel");
const Products = require("../models/productModel");

const subcategoryCntrlr = {
  getSubcategories: async (req, res) => {
    try {
      const subcategories = await Subcategory.find();

      res.json(subcategories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCategory: async (req, res) => {
    try {
      const { category } = req.body;


      const getCategory = await Category.findOne({ name: category });


      const categoryInfo = {
        category: getCategory.id,
        mainCategoryName: getCategory.name,
      };

      res.json(categoryInfo);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createSubcategory: async (req, res) => {
    try {
      const { category, mainCategoryName, name, images } = req.body;
      console.log(category, mainCategoryName, name, images);

      const subcategory = await Subcategory.findOne({ name });

      if (subcategory)
        return res.status(400).json({ msg: "La subcategoría ya existe." });

      const newSubcategory = new Subcategory({
        category,
        mainCategoryName,
        name,
        images,
      });

      console.log(newSubcategory);

      await newSubcategory.save();
      res.json({ msg: "Subcategoría creada." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  searchSubcategory: async (req, res) => {
    try{
      const searchSubcategories = await Subcategory.find({category: req.params.id })  
      console.log(searchSubcategories)
      res.json(searchSubcategories)
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateSubcategory: async (req, res) => {
    try {
      const { name, images } = req.body;
      await Subcategory.findOneAndUpdate(
        { _id: req.params.id },
        { name, images }
      );

      res.json({ msg: "Subcategoría actualizada" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteSubcategory: async (req, res) => {
    try {
      const products = await Products.findOne({ subcategory: req.params.id });

      if (products)
        return res.status(400).json({
          msg: "Por favor, elimina todos los productos relacionados.",
        });

      await Subcategory.findByIdAndDelete(req.params.id);
      res.json({ msg: "Subcategoría eliminada" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteAllSubcategories: async (req,res) => {
    try{
      const products = await Products.findOne({ subcategory: req.params.id })

      if (products)
        return res.status(400).json({
          msg: "Por favor, elimina todos los productos relacionados."
        });

        await Subcategory.findOneAndDelete({category: req.params.id});
        res.json({ msg: "Subcategoría eliminada" });

      } catch (err) {
        return res.status(500).json({ msg: err.message });
      }
    },
  }



module.exports = subcategoryCntrlr;
