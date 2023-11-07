const Checkout = require("../models/checkoutModel");

const checkoutCntrlr = {
  getCheckouts: async (req, res) => {
    try {
      const checkouts = await Checkout.find();

      res.json(checkouts);
    } catch (err) {
      return res.json(500).json({ msg: err.message });
    }
  },
  createCheckoutInfo: async (req, res) => {
    try {
      const { name } = req.body;

      const newCheckout = new Checkout({
        name,
        lastName,
        personalId,
        phone,
        country,
        state,
        city,
        postalCode,
        items,
        total,
      });

      await newCheckout.save();
      res.json("Información del checkout obtenida");
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateCheckout: async (req, res) => {
    const checkout = await Checkout.findById(req.params.id);

    const { seen } = req.body;

    await Checkout.findOneAndUpdate(
      { _id: req.params.id },
      {
        seen,
      }
    );

    res.json({ checkout });
  },
};

module.exports = checkoutCntrlr;
