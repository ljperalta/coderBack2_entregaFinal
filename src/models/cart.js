const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
      default: 1
    },
    products: [
              { product: { type: mongoose.Schema.Types.ObjectId, ref: "productos"} }
              ]
  }
);

const Cart = mongoose.model("carritos", cartSchema);
module.exports = Cart;