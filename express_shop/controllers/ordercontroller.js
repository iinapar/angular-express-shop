const Order = require('../models/order');

const ordercontroller = {
  // Tilauksen hakeminen id:n perusteella
  orderById: (req, res) => {
    Order.findOne({ _id: req.params.id }, (error, order) => {
      if (error || !order) {
        return res.status(400).json({
          error: 'Order not found',
        });
      }
      res.json(order);
    });
  },

  // Uuden tilauksen luonti
  newOrder: (req, res) => {
    const newOrder = Order(req.body);
    Order.create(newOrder)
      .then((order) => {
        console.log('New order inserted succesfully:' + order);
        res.json(order);
      })
      .catch((error) => {
        return res.status(400).json({
          error: 'Error creating order',
        });
      });
  },

  // Tilauksen tilan muuttaminen
  updateOrder: (req, res) => {
    Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then((updatedOrder) => {
        if (!updatedOrder) {
          return res.status(404).json({ message: 'Order not found' });
        }
        console.log('Order updated successfully:', updatedOrder);
        res.json(updatedOrder);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
      });
  },

  // Tilausten haku tilan perusteella
  ordersByStatus: (req, res) => {
    Order.find({ status: req.params.status }, (err, orders) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      if (orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this status' });
      }
      res.json(orders);
    });
  },

  // Tilausten haku asiakastunnuksen perusteella
  ordersByCustomer: (req, res) => {
    Order.find({ customer_id: req.params.customer_id }, (err, orders) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
      }
      if (orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this customer' });
      }
      res.json(orders);
    });
  },

  // Kaikkien tilausten haku
  allOrders: (req, res) => {
    Order.find((error, orders) => {
      if (error || !orders) {
        return res.status(400).json({
          error: 'Orders not found',
        });
      }
      res.json(orders);
    });
  },
};

module.exports = ordercontroller;
