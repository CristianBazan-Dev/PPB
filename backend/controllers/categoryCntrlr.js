const Category = require("../models/categoryModel");
const Products = require("../models/productModel");

const categoryCntrlr = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();

      res.json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getCategory: async (req, res) => {
    try {
      const { category } = req.body;

      const getCategory = await Category.findOne({ name: category });
      console.log(getCategory);

      const subcategoriesModel = {
        category: getCategory.name,
        subcategories: getCategory.subcategories,
      };

      res.json(subcategoriesModel);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name, subcategories, images } = req.body;
      const category = await Category.findOne({ name });

      if (category)
        return res.status(400).json({ msg: "La categoría ya existe." });

      const newCategory = new Category({
        name,
        subcategories,
        images,
      });

      await newCategory.save();
      res.json({ msg: "Categoría creada." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const products = await Products.findOne({ category: req.params.id });

      if (products)
        return res.status(400).json({
          msg: "Por favor, elimina todos los productos relacionados.",
        });

      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "Categoría eliminada" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name, images } = req.body;
      await Category.findOneAndUpdate({ _id: req.params.id }, { name, images });

      res.json({ msg: "Categoría actualizada" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = categoryCntrlr;
