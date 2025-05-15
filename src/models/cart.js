const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El Titulo es obligatorio"]
    },
    products: [
              { product: { type: mongoose.Schema.Types.ObjectId, ref: "productos"} }
              ]
  }
);

// Índices para mejorar rendimiento en búsquedas
cartSchema.index({ title: 1 });

const Cart = mongoose.model("carritos", cartSchema);
module.exports = Cart;