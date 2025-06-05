const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
{    
    _id:  false,
    code: { type: Number, unique: true, required: true },
    purchase_datetime: { type: Date, default: Date.now },                
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true }
});

const Ticket = mongoose.model("tickets", ticketSchema);
module.exports = Ticket;