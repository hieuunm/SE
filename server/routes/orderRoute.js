const express = require('express');
const orderController = require('../controllers/orderController');
const { isAuth, isAdmin } = require('../middleware/authenticate');
const router = express.Router();

router.get('/get-all-orders', isAuth, isAdmin, orderController.getAllOrders);
router.get('/order-by-user', isAuth, orderController.getOrderByUser);

router.post('/create-order', isAuth, orderController.postCreateOrder);
router.post('/update-order', isAuth, orderController.postUpdateOrder);
router.post('/delete-order', isAuth, orderController.postDeleteOrder);

module.exports = router;
