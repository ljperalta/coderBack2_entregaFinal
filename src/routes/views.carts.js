const express = require('express')
const router = express.Router()
const { getCartById } = require('../repository/carts');

router.get('/', async (req, res) => {
    try {
        const carts = await getCartById(req.user.id); 
        
        res.render("view_carts", {layout: "carts", carts });
    } catch (error) {
        res.status(500).send("Error al cargar los productos");
    }
})

module.exports = router