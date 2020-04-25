const express = require('express')

const router = express.Router()

// controllers

const user = require('../controllers/user.controller')

const auth = require('../controllers/auth.controller')

const category = require('../controllers/category.controller')







// to create category !! ADMIN !! must

router.param("userid",user.getuserbyID) // populate profile field in req object


router.param("categoryid",category.getCategoryById)


// routes
// for creating category needs to be logged in , authenticated , then needs to be admin
// create route
router.post('/category/create/:userid',
auth.isSignedIn,
auth.isAuthenticated,
auth.isAdmin,
category.createCategory
)

// read routes
router.get('/category/:categoryid',category.getOneCategory)

router.get('/categories/:userid',
category.getAllCategories)  // giving the protected link may be to render

// update routes
router.put('/category/:categoryid/:userid',
auth.isSignedIn,
auth.isAuthenticated,
auth.isAdmin,
category.updateCategory
)

// delete route

router.delete('/category/:categoryid/:userid',
auth.isSignedIn,
auth.isAuthenticated,
auth.isAdmin,
category.deleteCategory
)




module.exports = router