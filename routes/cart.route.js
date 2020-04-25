const express = require('express')

const router = express.Router()

// controllers

const user = require('../controllers/user.controller')

const auth = require('../controllers/auth.controller')

const product = require('../controllers/product.controller')

const cart = require('../controllers/cart.controller')


// using userid 

router.param('userid',user.getuserbyID)

// using cartid

router.param('cartid',cart.getCartById)


// understand this the product id will be sent in body of the req

router.post('/cart/addtocart/:userid',
auth.isSignedIn,
auth.isAuthenticated,
cart.checkDuplicates,
cart.addItemToCart)


// i need to render a page here so making sure that 
// i get all his items in the cart as a middleware to render this page



// removing item from cart

router.delete('/cart/:cartid/:userid',
auth.isSignedIn,
auth.isAuthenticated,
cart.removeItem)


// updating quantity in the cart

router.put('/cart/:cartid/:userid',
auth.isSignedIn,
auth.isAuthenticated,
cart.updateCount
)

module.exports = router