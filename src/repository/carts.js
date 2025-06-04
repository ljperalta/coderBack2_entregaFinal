const User = require("../models/user")
const Cart = require("../models/cart");
const products = require("./products");

class CartManager {

    async getCartById(userId) {
        const user = await User.findById(userId).populate({
            path: 'cart',
            populate: { path: 'products.product' }
        });

        if (!user || !user.cart) {
            return { error: `No se encontró carrito para el usuario con ID ${userId}` };
        }

        return {
            cartId: user.cart._id,
            products: user.cart.products,
            totalProd: user.cart.products.length 
        };
    }


    addCart = async () => {

        const newCart = {
            quantity: 1,
            products: []
        };

        const result = await Cart.create(newCart)
        return result;
    }

    async addProductsToCart(cartId, prodId) {
        const cart = await Cart.findById(cartId);
        if (!cart) {     return { error: `Carrito con ID ${cartId} no encontrado` };     }
        
        cart.products.push({ product: prodId });

        await cart.save();

        return cart;
    }
    
    deleteAllProductsbyId = async (id) => {

        const result = await Cart.updateOne(
            { _id: id.id },
            { $set: { products: [] } }
        );
        
        return result;
    };

    deleteProductsbyId = async (idCart, idProduct) => {

        const updatedCart = await Cart.findByIdAndUpdate(
            idCart,
            { $pull: { products: { product: idProduct } } },
            { new: true }
          );
          if (!updatedCart) {
            throw new Error("Carrito no encontrado");
          }
        
        return updatedCart;
    };

    updateAllProductsbyId = async (id, data) => {

        const result = await Cart.updateOne(
            { _id: id.id },
            { $set: { products: data.products } }
        );
        
        return result;
    };

    updateProductsbyId = async (idC, idP, data) => {
        console.log(idC , idP, data , "test222")
        const cart = await Cart.findById(idC).populate("products.product")
        //console.log(cart)
        const productToUpdate = cart.products.find(item => item._id.toString() === idP);
        //console.log(productToUpdate)

        Object.keys(data).forEach(key => {
            console.log(key, productToUpdate.product[key], data[key])
            if (productToUpdate.product[key] !== undefined) {
              productToUpdate.product[key] = data[key];
              console.log(productToUpdate.product[key],"=", data[key])
            }
          });
      
        await cart.save();      
        console.log(productToUpdate)
        return cart;
    };

    async leerJSON() {
        try {
            const data = await Cart.find().populate("products.product");
            return data;
        } catch (error) {
            console.error('Error al leer o procesar el archivo JSON:', error);
            return [];
        }
    }
}

const cartManager = new CartManager('server/bd/carts.json')

module.exports = {
    getCartById: async (id) => await cartManager.getCartById(id),
    addCart: async () => await cartManager.addCart(),
    addProductsToCart: async (idCart, idProduct) => await cartManager.addProductsToCart(idCart, idProduct),
    deleteAllProductsbyId: async (id) => await cartManager.deleteAllProductsbyId(id),
    deleteProductbyId: async (idCart, idProduct) => await cartManager.deleteProductbyId(idCart, idProduct),
    updateAllProductsbyId: async (id, data) => await cartManager.updateAllProductsbyId(id, data),
    updateProductsbyId: async (idC, idP, data) => await cartManager.updateProductsbyId(idC, idP, data),
};