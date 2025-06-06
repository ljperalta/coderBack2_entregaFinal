const createTransport = require("nodemailer").createTransport;
const { templateHtml } = require("../utils/template.js");
const jwt = require("jsonwebtoken");
const { updateUser } = require("../repository/users.js");
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

    const token = jwt.sign(
        { email: toEmail },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    const resetLink = `http://localhost:8080/reset-password?token=${token}`;

    const configMail = {
        from: process.env.EMAIL_USER,
        to: toEmail, // acá va el correo del usuario
        subject: "Recuperación de contraseña",
        html: `
        <h2>Restablecer tu contraseña</h2>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="http://localhost:8080/recuperar/reset.html">Restablecer contraseña</a>
        <p>O copia y pega el siguiente enlace en tu navegador: ${resetLink}</p>
        <p><small>Este enlace expirará en 1 hora.</small></p>
        `,
    };

    await transporter.sendMail(configMail);
};

const resetPassword = async (token, newPassword) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const email = decoded.email;

        await updateUser(email, { password: newPassword });

        console.log(`Contraseña actualizada para el usuario: ${email}`);
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        throw new Error(error.message || 'Token inválido o expirado');
    }
};


module.exports = {
    sendMail,
    resetPassword
};
