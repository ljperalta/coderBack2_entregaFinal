const express = require("express");
const router = express.Router();
const { enviarMail, resetPassword } = require("../controllers/enviar_mail.js");

router.post("/mail", enviarMail);
router.post("/reset-password", resetPassword);


module.exports = router;