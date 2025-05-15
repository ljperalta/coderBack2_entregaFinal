const express = require("express");
const router = express.Router();
const products = require("./products");
const carts = require("./carts");
const vistaProducts = require("./views.router");
const vistaCarts = require("./views.carts");
const users = require("./users");

const passport = require("./../utils/passport.config.js");

router.use("/api/products", passport.authenticate("jwt", { session: false }), products);
router.use("/api/carts", passport.authenticate("jwt", { session: false }), carts);
router.use("/products", passport.authenticate("jwt", { session: false }), vistaProducts);
router.use("/carts", passport.authenticate("jwt", { session: false }) , vistaCarts);
router.get("/realTimeProducts", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.render("realTimeProducts");
});
router.use("/", users);

module.exports = router;