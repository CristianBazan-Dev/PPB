const Products = require("../models/productModel");
const Shipping = require("../models/shippingModel");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString };

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));

    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

const productCntrlr = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      const products = await features.query;

      res.json({
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await Products.findOne({ _id: req.params.id });

      res.json(product);
    } catch (err) {
      return res.status(400).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        offer,
        old_price,
        usd,
        usd_type,
        usd_price,
        unit_price,
        dues,
        transfer_offer,
        transfer_offer_value,
        description,
        content,
        images,
        category,
        subcategory,
        secSubcategory, 
        model,
        brand,
      } = req.body;

      if (!images)
        return res
          .status(400)
          .json({ msg: "No se ha proporcionado una imagen. " });

      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: "El producto ya existe." });

      const newProduct = new Products({
        product_id,
        title: title,
        unit_price,
        usd,
        usd_type,
        usd_price,
        description,
        content,
        images,
        category,
        subcategory,
        secSubcategory, 
        offer,
        old_price,
        dues,
        transfer_offer,
        transfer_offer_value,
        model,
        brand,
      });

      console.log(newProduct);

      await newProduct.save();
      res.json({ msg: "Producto creado" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Producto eliminado" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      // Soon to be updated to introduce the new params of the model
      const {
        title,
        offer,
        old_price,
        usd,
        usd_type,
        usd_price,
        unit_price,
        dues,
        transfer_offer,
        transfer_offer_value,
        description,
        content,
        images,
        category,
        subcategory,
        secSubcategory, 
        model,
        brand,
      } = req.body;

      if (!images)
        return res
          .status(400)
          .json({ msg: "No se ha proporcionado una imagen. " });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title,
          offer,
          old_price,
          usd,
          usd_type,
          usd_price,
          unit_price,
          dues,
          transfer_offer,
          transfer_offer_value,
          description,
          content,
          images,
          category,
          subcategory,
          secSubcategory, 
          model,
          brand,
        }
      );
      res.json({ msg: "Producto actualizado" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updatePrices: async(req,res) => {
    try{
       const {porcentageValue} = req.body

       const products = await Products.find();

       for (i = 0; i < products.length; i++) {
         let id = products[i]._id;
         let price = products[i].unit_price;
 
         let operation = Math.round(price + price * (porcentageValue / 100)).toFixed(2);
 
         try {
           const product = await Products.findOneAndUpdate(
             { _id: id },
             {
               unit_price: operation
             }
           );
          } catch (err) {
            return res.status(500).json({ msg: err.message });
          }
        }
       res.json(porcentageValue)
    } catch (err) {
      return res.status(500).json({msg: err.message})
    }
  },
  createShipping: async (req, res) => {
    try {
      const { product_id, state, unit_price, postal_code, zone } = req.body;

      const newShipping = new Shipping({
        product_id,
        state,
        unit_price,
        dues,
        postal_code,
        zone,
      });

      await newShipping.save();

      res.json("Nueva provincia añadida");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getShipping: async (req, res) => {
    try {
      const shipping = await Shipping.find().sort({ zone: 1 });

      res.json(shipping);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getShippingsByZone: async (req, res) => {
    try {
      const { zone } = req.body;
      console.log(zone);
      const shipping = await Shipping.findOne({ zone: zone });
      console.log(shipping);
      res.json(shipping);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteShipping: async (req, res) => {
    try {
      const shipping = await Shipping.findOne({ state: req.params.id });

      if (shipping) {
        confirm("Está seguro de querer eliminar esta provincia?");
      }

      await Shipping.findByIdAndDelete(req.params.id);

      res.json({ msg: "Provincia Eliminada" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateShipping: async (req, res) => {
    try {
      const { unit_price } = req.body;
      await Shipping.findOneAndUpdate(
        { _id: req.params.id },
        {
          unit_price,
        }
      );
      console.log(unit_price);
      res.json("Envío actualizado.");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  gettingOfferProducts: async (req, res) => {
    try {
      const features = new APIfeatures(
        Products.find({ offer: true }),
        req.query
      )
        .filtering()
        .sorting()
        .paginating();

      const products = await features.query;

      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCntrlr;
