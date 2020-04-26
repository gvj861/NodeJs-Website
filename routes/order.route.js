const express = require('express')

const router = express.Router()

// controllers

const user = require('../controllers/user.controller')

const auth = require('../controllers/auth.controller')

const product = require('../controllers/product.controller')

const order = require('../controllers/order.controller')

const cart = require('../controllers/cart.controller')

// params

router.param('userid',user.getuserbyID)
router.param('orderid',order.getOrderById)

// routes
// get becaues this would be feeded by success url of the Stripe

// creating order
router.get('/order/create/:userid',
 cart.populateProducts,   // will get the same products that user bought
 order.createOrder,
 product.updateInventory,       // Updates out Stock
 cart.emptyAll,          // delete everything in the cart of this user
 order.redirectHome
 )    


//   --- MAJOR CHANGE REFER GVJ-1.txt
 // for all customer orders
// router.get('/myorders/:userid/:usersalt',
// auth.checkFlawLogin,
// auth.checkFlaw,
// order.getOrders
// // get all orders regarding that user
//  // populates the product information into the orders // then render it
// )

// router.get('/mypurchases/:userid/:usersalt',
// auth.checkFlawLogin,
// auth.checkFlaw,
// order.getPurchases)  // moving to view understand that profile page contains all 3



// updating status Order

// only admin can update status 
// so

router.put('/order/changestatus/:userid/:orderid',
auth.isSignedIn,
auth.isAuthenticated,
auth.isAdmin,

order.updateOrderStatus

)

// all orders for Admin to manipulate

router.get('/getallorders*123',order.getAllOrders)




module.exports = router
