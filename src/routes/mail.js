const express = require("express");
const router = express.Router();
const { enviarMail } = require("../controllers/enviar_mail.js");

router.post("/mail", enviarMail);

module.exports = router;