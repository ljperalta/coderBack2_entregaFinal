const { sendMail, resetPass } = require('../repository/enviar_mail');
const { checkUser } = require('../repository/users.js');

const enviarMail = async (req, res) => {
  try {
    const email = req.body.user;
    const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !mailRegex.test(email)) {
      return res.status(400).json({ message: 'Email inválido' });
    }
    const mailExists = await checkUser(email);
    if (!mailExists) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    await sendMail(email);
    res.status(200).json({ message: 'Email enviado correctamente', ok: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error al enviar el mail', error: error.message });
  }
}

const resetPassword = async (req, res) => {
  try {
    const token = req.body.token;
    const newPassword = req.body.newPassword;
    
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token y nueva contraseña son requeridos' });
    }

    await resetPass(token, newPassword);
        res.status(200).json({ message: 'Contraseña actualizada correctamente', ok: true });
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        res.status(500).json({ message: 'Error al restablecer la contraseña', error: error.message });
    }
}

module.exports = {  enviarMail , resetPassword };