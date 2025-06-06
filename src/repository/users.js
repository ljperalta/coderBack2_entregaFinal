const User = require('../models/user');
const { hashPassword, comparePassword } = require('../utils/utils.js');
const { addCart } = require('../repository/carts');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class loginManager
{
  async login(user, password) {
      try {
          const foundUser = await User.findOne({ email: user });

          if (!foundUser || !comparePassword(foundUser, password)) {
          return false; // Usuario no encontrado o contraseña incorrecta
          }

          return foundUser; // Autenticación exitosa

      } catch (err) {
          console.error("Error en login:", err);
          return res.json({ ok: false, message: "Error interno del servidor" });
      }
  }

  async registrar(first_name, last_name, user, password){
    try {
      const userExist = await User.findOne({ email: user });
      if (userExist) {
        return 'existente'; // El usuario ya existe
      }

      const cart = await addCart();
      password = hashPassword(password); // Hashear la contraseña
      const newUser = new User({ email: user, password: password, role: 'user', cart: cart, age: 40, first_name: first_name, last_name: last_name });
      await newUser.save();

      return 'nuevo'; // Usuario registrado exitosamente
    } catch (err) {
      console.error(err);
      return false; // Error al registrar el usuario
    }
  }

  async getUserById(id) {
      try {
          const user = await User.findById(id);
          if (!user) { return null; } 
    
          return user;
      } catch (err) {
          throw err; // Error al buscar el usuario
      } 
  }

  async updateUser(email, userData) {
    try {
        const user = await User.findOne({ email });
        if (!user) return null;

        // Si viene la contraseña, hacemos validación y hash
        if (userData.password) {
            const isSamePassword = await bcrypt.compare(userData.password, user.password);
            if (isSamePassword) {
                throw new Error('No puedes usar la misma contraseña anterior.');
            }

            const hashedPassword = await bcrypt.hash(userData.password, 10);
            userData.password = hashedPassword;
        }

        // Actualizamos el resto de los campos
        Object.assign(user, userData);
        await user.save();

        return user;
    } catch (err) {
        console.error("Error al actualizar el usuario:", err);
        throw err;
    }
  }

  async checkUser(email) {
      try {
          const user = await User.findOne({ email: email });
          if (!user) {
              return false;
          }
          return true;
      } catch (err) {
          console.error("Error al verificar el usuario:", err);
          throw err;
      }
  }

  generateToken(user) {
      const payload = { id: user._id, first_name: user.first_name, last_name: user.last_name ,email: user.email, role: user.role, };
      return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '12h' });
  }
}

const useR = new loginManager();

module.exports = useR;