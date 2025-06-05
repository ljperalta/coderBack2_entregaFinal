const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    products: [
              { 
                _id:  false,
                quantity: { type: Number, default: 1 },                
                product: { type: mongoose.Schema.Types.ObjectId, ref: "productos"} }
              ]
  }
);

const Cart = mongoose.model("carritos", cartSchema);
module.exports = Cart;