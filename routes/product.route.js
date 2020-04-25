const express = require('express')

const router = express.Router()

// const check = require('express-validator').check or

//const { check } = require('express-validator')
 
// controllers

const user = require('../controllers/user.controller')


const auth = require('../controllers/auth.controller')

const product = require('../controllers/product.controller')


// params


router.param("userid",user.getuserbyID)
// basic mwares
router.param("productid",product.getProductById)


// crud routes

router.post ('/product/create/:userid',

auth.isSignedIn,
auth.isAuthenticated,
auth.isAdmin,

// making an array of mware funs before creating Product


product.createProduct

)

// read

router.get('/product/:productid',product.getProduct)

// route mWare before read
// this means it would be used the moment user asks for the product 
// wont call it directly will use it in the front-end


// delete

router.delete('/product/:productid/:userid',
auth.isSignedIn,
auth.isAuthenticated,
auth.isAdmin,

product.deleteProduct

)

// update
router.put('/product/:productid/:userid',
auth.isSignedIn,
auth.isAuthenticated,
auth.isAdmin,

product.updateProduct

)


// Listing Products

router.get('/all',product.getAllProducts)

router.get('/allproducts/:userid',product.getAllProductsAdmin) //EJS


// link to put pics for each product

router.post('/product/:userid/upload/:productid',
auth.isSignedIn,
auth.isAuthenticated,
auth.isAdmin,
product.productUpload)


// this for displaying all categories while creating Product or Update Product
// written in View



module.exports = router