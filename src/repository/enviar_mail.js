const createTransport = require("nodemailer").createTransport;
const { templateHtml } = require("../utils/template.js");
require("dotenv").config();

const transporter = createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const sendMail = async (toEmail) => {
  const configMail = {
    from: process.env.EMAIL_USER,
    to: toEmail, // acá va el correo del usuario
    subject: "Recuperación de contraseña",
    html: `
      <h1>Recuperación de contraseña</h1>
      <p>Hacé clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="http://localhost:8080/reset?token=aca-va-el-token">Restablecer contraseña</a>
    `,
  };

  await transporter.sendMail(configMail);
};


module.exports = {
  sendMail
};
