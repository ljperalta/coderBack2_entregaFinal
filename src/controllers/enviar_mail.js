const { transporter, configMail } = require('../repository/enviar_mail');

const enviarMail = async (req, res) => {
  try {
    await transporter.sendMail(configMail);
    res.status(200).json({ message: 'Email emviado correctamente' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error al enviar el mail', error: error.message });
  }
}

module.exports = {  enviarMail };