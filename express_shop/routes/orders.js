const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const oc = require('../controllers/ordercontroller');

// reitti yksittäiselle tilaukselle id:n perusteella
router.get('/:id', authorize, oc.orderById);

// reitti tilauksen hakuun asiakkaan mukaan
router.get('/customer/:customer_id', authorize, oc.ordersByCustomer);

// reitti tilauksen hakuun tilan mukaan
router.get('/status/:status', authorize, oc.ordersByStatus);

// reitti uuden tilauksen lisäämiseen
router.post('/', authorize, oc.newOrder);

// reitti tilauksen muokkaamiseen
router.put('/:id', authorize, oc.updateOrder);

// reitti kaikkien tilausten hakemiseen
router.get('/all', authorize, oc.allOrders);

module.exports = router;
