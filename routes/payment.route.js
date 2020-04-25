const express = require('express')

const router = express.Router()

// controllers

const cart = require('../controllers/cart.controller')


const user = require('../controllers/user.controller')

const auth = require('../controllers/auth.controller')

const payment = require('../controllers/payment.controller')


// mWares

router.param('userid',user.getuserbyID)

router.get('/checkout/:userid',
auth.isSignedIn,
auth.isAuthenticated,
cart.populateProducts,
payment.getCheckoutSession

)













module.exports = router