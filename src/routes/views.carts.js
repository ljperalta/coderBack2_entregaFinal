const express = require('express')
const router = express.Router()
const { getCartById } = require('../managers/carts');

router.get('/:id', async (req, res) => {
    try {
        const carts = await getCartById(req.params.id); 
        
        res.render("view_carts", {layout: "carts", carts });
    } catch (error) {
        res.status(500).send("Error al cargar los productos");
    }
})

module.exports = router