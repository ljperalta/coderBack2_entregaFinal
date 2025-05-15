const express = require('express')
const router = express.Router()
const Product = require('../models/product');

router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10, sort, query, category, available } = req.query;
        let filter = {};
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
        };

        if (query) {
            filter.$or = [
                { title: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ];
        }
        
        if (category) {
            filter.category = category;
        }
        if (available) {
            filter.available = available === "true";
        }
    
        const result = await Product.paginate(filter, options);
        
        res.render("view_products", {
            layout: "products", // layout personalizado
            status: result.docs.length > 0? 1 : 0,
            payload: result.docs,
            page: result.page,
            totalPages: result.totalPages,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            limit : limit,
            query: query,
            sort: sort,
            available: available
          });
      } catch (err) {
        res.status(500).send(err.message);
      }
})

module.exports = router