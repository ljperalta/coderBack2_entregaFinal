const Ticket = require("../models/ticket");
const { getCartById, deleteAllProductsbyId } = require('../repository/carts');
const { updateProductById } = require("../repository/products");
class TicketManager {
    
    async generateTicket(user) {
        const cart = await getCartById(user.id );
        let Stock = 0;
        let amounT = 0;
        
        for (const item of cart.products) {
            if (item.product.stock < item.quantity) {                
                throw new Error(`Insufficient stock for product: ${product.title}`);
            }

            Stock = item.product.stock - item.quantity;
            amounT += item.product.price * item.quantity;
            await updateProductById(item.product._id, { stock: Stock });
        }
        const code = Math.floor(Math.random() * 1000000);

        const newTicket = {
            code: code,
            purchase_datetime: new Date().toLocaleString(),
            amount: amounT,
            purchaser: user.email
        };

        const result = await Ticket.create(newTicket);
        await deleteAllProductsbyId(cart.cartId);
        return result;
    }
}
const newTicket = new TicketManager();

module.exports = {
    generateTicket: async (user) => await newTicket.generateTicket(user),
};