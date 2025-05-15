const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "El campo first_name es obligatorio"],
      trim: true,
      // trim: true elimina espacios en blanco al principio y al final
    },
    last_name: {
      type: String,
      required: [true, "El campo last_name es obligatorio"],
      trim: true,
      // trim: true elimina espacios en blanco al principio y al final
    },
    email: {
      type: String,
      required: [true, "El campo email es obligatoria"],
      regex: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
      unique: true,
      trim: true,
    },
    age: {
      type: Number
    },
    password: {
      type: String,
      required: [true, "El campo password es obligatoria"],
      trim: true,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId, ref: "carritos"
    },
    role: {
      type: String,
      default: "user",
      trim: true,
    }
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;