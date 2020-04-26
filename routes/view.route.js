const express = require('express')

const router = express.Router()

const auth = require('../controllers/auth.controller')

const view = require('../controllers/views.controller')

const product = require('../controllers/product.controller')

const category = require('../controllers/category.controller')

const user = require('../controllers/user.controller')

const cart = require('../controllers/cart.controller')

const order = require('../controllers/order.controller')

router.use(auth.isLoggedInEJS) //  used here for conditional rendering on the page 
// based on user Logging in


// for product viewings

// MWARES ALREADY WRITTEN USED HERE ALSO

router.use('/',product.getAllProducts) // HOME PAGE

router.use('/getcreateproduct',category.getAllUniqueCategories) // used to fill drop down of categories


router.param('productid',product.getProductById) // also put response.locals.product = the product itself if req.product doesnt work


router.param('userid',user.getuserbyID)

// will also populate req.profile that would be very helpful



// R routes read routes static and dynamic both
router.get('/aboutus',view.showAboutUs)


router.get('/',view.getHomepage)  // all products with few details needed so done

router.get('/signup',view.getSignup)

router.get('/login',view.getLogin)

router.get('/forgotpassword',view.getForgotPassword)

router.get('/user/resetpassword/:resetid',view.getResetPage)


router.get('/categories',category.getAllCategories)


router.get('/getcreateproduct',view.getCreateProduct) // will view the page for 
// creating Product with Category name Dynamically

router.get('/getupdateproduct/:productid',view.getUpdateProduct)


router.get('/adminpanel*123/',view.showAdminPanel)

// the additional security is only provided to user when given dynamic pages to him 

// providing additional security to rendering pages

router.get('/getaccountpage/:userid/:usersalt',
auth.checkFlawLogin,
auth.checkFlaw,
view.getAccountPage)



router.get('/cart/:userid/:usersalt',
auth.checkFlawLogin,
auth.checkFlaw,
cart.populateProducts,
cart.getCart)


// getting profile


// LOADING ALL # AT ONCE AS IT IS A Single Page containing all

router.get('/profilepage/:userid/:usersalt',
auth.checkFlawLogin,
auth.checkFlaw,
order.getPurchases,
order.getOrders,
view.getProfilePage)

// about us


module.exports = router