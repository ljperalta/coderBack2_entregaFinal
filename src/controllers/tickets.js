const {generateTicket} = require('../repository/tickets');

const ticketController = {
    generateTicket: async (req, res) => {
        try {
            const user = req.user; // Assuming user is set in the request by authentication middleware
            const ticket = await generateTicket(user);
            res.status(200).json({message: "Ticket creado exitosamente", data : ticket});
        } catch (error) {
            console.error("Error al generar el ticket:", error);
            res.status(500).json({ error: "Falla al generar el ticket" });
        }
    }
};

module.exports = ticketController;