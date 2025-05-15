const express = require("express");
const router = express.Router();
const {loginn, registrarr, logoutt} = require("../controllers/users.js");
const passport = require("passport");

router.post("/login", loginn);
router.post("/registrar", registrarr);
router.get("/logout", logoutt );
router.get("/api/sessions/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send({ status: "success", payload: req.user });
    });

module.exports = router;