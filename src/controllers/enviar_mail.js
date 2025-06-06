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

module.exports = {  enviarMail };