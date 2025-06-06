const { sendMail } = require('../repository/enviar_mail');

const enviarMail = async (req, res) => {
  try {
    const email = req.body.user;
    await sendMail(email);
    res.status(200).json({ message: 'Email enviado correctamente', ok: true });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error al enviar el mail', error: error.message });
  }
}

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.query;
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token y nueva contraseña son requeridos' });
    }

    await resetPassword(token, newPassword);
    res.status(200).json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ message: 'Error al restablecer la contraseña', error: error.message });
  }
}

module.exports = {  enviarMail , resetPassword };