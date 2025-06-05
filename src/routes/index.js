const express = require("express");
const router = express.Router();
const products = require("./products");
const carts = require("./carts");
const vistaProducts = require("./views.router");
const vistaCarts = require("./views.carts");
const users = require("./users");
const tickets = require("./tickets");

const passport = require("./../utils/passport.config.js");

router.use("/api/products", passport.authenticate("current", { session: false }), products);
router.use("/api/carts", passport.authenticate("current", { session: false }), carts);
router.use("/products", passport.authenticate("current", { session: false }), vistaProducts);
router.use("/carts", passport.authenticate("current", { session: false }) , vistaCarts);
router.get("/realTimeProducts", passport.authenticate("current", { session: false }), (req, res) => {
    res.render("realTimeProducts");
});
router.use("/", users);
router.use("/api/tickets", passport.authenticate("current", { session: false }), tickets);

module.exports = router;