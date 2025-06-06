const createTransport = require("nodemailer").createTransport;
const { templateHtml } = require("../utils/template.js");
require("dotenv").config();

const transporter = createTransport({
  host: "gmail",
  port: 465,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const configMail = {
  from: process.env.USER_ETH,
  to: process.env.USER_ETH,
  subject: "Bienvenido/a",
  //   text: "Te damos la bienvenida al curso",
  html: '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Bienvenido/a</title></head><body>' + templateHtml + '</body></html>',
};

module.exports = {
  transporter,
  configMail,
};