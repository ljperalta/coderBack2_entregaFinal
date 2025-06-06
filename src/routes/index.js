const express = require("express");
const router = express.Router();
const products = require("./products");
const carts = require("./carts");
const vistaProducts = require("./views.router");
const vistaCarts = require("./views.carts");
const users = require("./users");
const tickets = require("./tickets");
const mail = require("./mail");

const passport = require("./../utils/passport.config.js");
const checkRole = require("../middlewares/checkRole");

router.use("/api/products", passport.authenticate("current", { session: false }), checkRole(["user", "admin"]),products);
router.use("/api/carts", passport.authenticate("current", { session: false }), checkRole(["user", "admin"]),carts);
router.use("/products", passport.authenticate("current", { session: false }), checkRole(["user", "admin"]), vistaProducts);
router.use("/carts", passport.authenticate("current", { session: false }) , checkRole(["user", "admin"]), vistaCarts);
router.get("/realTimeProducts", passport.authenticate("current", { session: false }), checkRole(["admin"]), (req, res) => {
    res.render("realTimeProducts");
});
router.use("/", users);
router.use("/api/tickets", passport.authenticate("current", { session: false }), tickets);
router.use("/", mail);

module.exports = router;