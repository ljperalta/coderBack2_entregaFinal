const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "El Titulo es obligatorio"],
      trim: true,
      // trim: true elimina espacios en blanco al principio y al final
    },
    description: {
      type: String,
      required: [true, "La descripcion es obligatoria"],
      trim: true,
    },
    code: {
      type: String,
      required: [true, "El Codigo es obligatorio"],
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatoria"],
    },
    status: { 
      type: Boolean,
      required: true,
    },
    stock: {
      type: Number,
      required: [true, "El Stock es obligatorio"],
    },
    thumbnails: {
      type: String,
      required: true,
    },
  }
);

// Índices para mejorar rendimiento en búsquedas
productSchema.index({ title: 1 });
productSchema.index({ description: 1 });
productSchema.index({ code: 1 });

productSchema.plugin(mongoosePaginate)

const Product = mongoose.model("productos", productSchema);
module.exports = Product;