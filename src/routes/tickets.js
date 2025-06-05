const express = require('express');
const router = express.Router();

const ticketController = require('../controllers/tickets');

router.post('/', ticketController.generateTicket);

module.exports = router;