const express = require('express');
const routerC = express.Router();

const { getCarts, getCartsById, addCarts, addProductToCart, deleteAllProdbyId, deleteProdbyId, updateAllProdbyId, updateProdbyId } = require('../controllers/carts');

routerC.get('/', getCarts);
routerC.get('/:id', getCartsById);
routerC.post('/', addCarts);
routerC.post('/:cid/product/:pid', addProductToCart);
routerC.delete('/:id', deleteAllProdbyId);
routerC.delete('/:id/products/:pid', deleteProdbyId);
routerC.put('/:id', updateAllProdbyId);
routerC.put('/:idC/products/:idP', updateProdbyId);

module.exports = routerC;