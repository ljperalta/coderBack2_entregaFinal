const { log } = require("console");
const Product = require("../models/product")

class ProductManager
{
    async getProducts(){
        return await this.leerJSON()
    }

    async getProductById(id) {
        const productos = await this.leerJSON();
        return productos.find(producto => producto.id === id) || null;
    }

    async getProduct(title, code) {
        const productos = await this.leerJSON();
        const producto = productos.find(producto => producto.title === title && producto.code === code);
        return producto || null;
    }

    async addProduct(newproduct) {
        
        const prodExis = await this.getProduct(newproduct[0].title, newproduct[0].code);
        if (prodExis) {
            return await this.updateProductById(prodExis._id, newproduct[0]);
        }

        const nuevoProducto = {  
                                title: newproduct[0].title, 
                                description: newproduct[0].description,
                                code: newproduct[0].code,
                                price: Number(newproduct[0].price),
                                status: (newproduct[0].status > 0)?true: false,
                                stock: Number(newproduct[0].stock),
                                thumbnails: newproduct[0].thumbnails 
                            };
        const result = await Product.create(nuevoProducto);

        return result;
    }

    async updateProductById(id, data) {

        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
        if (!updatedProduct) {
            return false; // Producto no encontrado
        }

        return updatedProduct; // Devolvemos el producto actualizado
    }

    async deleteProductById(id) {
        let productos = await this.leerJSON();
        const producto = productos.find(producto => producto._id.toString() === id);

        if (!producto) {
            return null; // No encontrado
        }

        await Product.deleteOne({_id : producto._id}); // Guardar cambios en el JSON
        return producto;
    }

    async leerJSON() {
        try {
            const data = await Product.find();
            /* console.log(data) */
            return data
        } catch (error) {
            console.error('Error al leer o procesar el archivo JSON:', error);
            return [];
        }
    }
}

prod = new ProductManager('src/bd/bd.products.json')

module.exports = {
    getAllProducts: async () => await prod.getProducts(),
    getProductById: async (id) => await prod.getProductById(id),
    addProduct: async (producto) => await prod.addProduct(producto),
    updateProductById: async (id, newPrice) => await prod.updateProductById(id, newPrice),
    deleteProductById: async (id) => await prod.deleteProductById(id)
};