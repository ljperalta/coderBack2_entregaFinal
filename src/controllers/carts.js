const { getCart, getCartById, addCart, addProductsToCart, deleteAllProductsbyId, deleteProductbyId, updateAllProductsbyId, updateProductsbyId } = require('../managers/carts');

const getCarts = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await getCart(id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: `Carrito con ID ${id} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el carrito", error });
    }
};

const getCartsById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await getCartById(id);

        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: `Carrito con ID ${id} no encontrado` });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el carrito", error });
    }
};

const addCarts = async (req, res) => {
    try {
        const newCart = await addCart();
        res.status(201).json({ message: "Carrito creado con exito", cart: newCart });
    } catch (error) {
        console.error("Error al crear carrito:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

const addProductToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const result = await addProductsToCart(cid, pid);

        if (result.error) {
            return res.status(404).json({ message: result.error });
        }

        res.status(200).json({ message: "Producto agregado al carrito", cart: result });
    } catch (error) {
        console.error("Error al agregar producto al carrito:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

const deleteAllProdbyId = async (req, res) => {
    try {
        const data = req.params;
        const result = await deleteAllProductsbyId(data);
        res.status(201).json({ message: "Carrito limpiado con exito", data : result});
    } catch (error) {
        console.error("Error al limpiar el carrito:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

const deleteProdbyId = async (req, res) => {
    try {
        const {idC, idP} = req.params;
        const result = await deleteProductbyId(idC, idP);
        res.status(201).json({ message: "Producto eliminado con exito", data : result});
    } catch (error) {
        console.error("Error al limpiar el carrito:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

const updateAllProdbyId = async (req, res) => {
    try {
        const id = req.params;
        const data = req.body;

        const result = await updateAllProductsbyId(id, data);
        res.status(201).json({ message: "Carrito Actualizado con exito", data: result});
    } catch (error) {
        console.error("Error al limpiar el carrito:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

const updateProdbyId = async (req, res) => {
    try {
        const {idC, idP} = req.params;
        const data = req.body;
        console.log(idC , idP, data , "test")
        await updateProductsbyId(idC, idP, data);
        res.status(201).json({ message: "Carrito Actualizado con exito"});
    } catch (error) {
        console.error("Error al actualizar el carrito:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
};

module.exports = {  getCarts, 
                    getCartsById,
                    addCarts, 
                    addProductToCart, 
                    deleteAllProdbyId,
                    deleteProdbyId,
                    updateAllProdbyId,
                    updateProdbyId };