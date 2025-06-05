const Ticket = require("../models/ticket");
const Cart = require("../models/cart");

class TicketManager {
    
    async generateTicket(user) {
        const cart = await Cart.findOne({ user: user._id }).populate('products.product');

        const code = Math.floor(Math.random() * 1000000);

        const newTicket = {
            code: code,
            purchase_datetime: new Date().toLocaleString(),
            amount: 0,
            purchaser: user.email
        };

        const result = await Ticket.create(newTicket);
        return result;
    }
}

module.exports = {
    generateTicket: async (user) => await TicketManager.generateTicket(user),
};