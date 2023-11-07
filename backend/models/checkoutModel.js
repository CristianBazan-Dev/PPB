const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    personalId: {
      type: String,
      required: true,
    },
    payer_email: {
      type: String,
      required: false,
    },
    phone: {
      type: Number,
      required: true,
    },
    country: {
      type: String,
      required: false,
    },
    state: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: false,
    },
    postalCode: {
      type: Number,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    addressNumber: {
      type: Number,
      required: false,
    },
    items: {
      type: Array,
      default: [],
    },
    total: {
      type: Number,
    },
    seen: {
      type: Boolean,
      default: false,
    },
    payed: {
      type: Boolean,
      default: false,
    },
    payedAt: {
      type: Date,
    },
    send: {
      type: Boolean,
      default: false,
    },
    sendAt: {
      type: Date,
      required: false,
    },
    paymentMethod: {
      type: String,
      required: false,
    },
    shippingMethod: {
      type: String,
      required: false,
    },
    shippingPrice: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Checkout", checkoutSchema);
