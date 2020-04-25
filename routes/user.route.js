const express = require('express')

const router = express.Router()


const user = require('../controllers/user.controller')

const auth = require('../controllers/auth.controller')


router.param("userid",user.getuserbyID)

router.param("tokenid",user.checkToken)

router.get('/user/:userid',auth.isSignedIn,auth.isAuthenticated,user.getUser)

// understand this because 
// if a user needs his details
// step-1 should be signed in
// step-2 he must be asking his profile only right??? so thats authorization

// above steps are taken from auth controller where we set the middlewares

// step-3 show him his details



// update some of the details of the user
// user should be updated his own details so the JWT auth

router.put('/user/:userid',auth.isSignedIn,auth.isAuthenticated,user.updateUser)

// Purchase List of the User
// url be like /orders/user/id

router.get('/orders/user/:userid',auth.isSignedIn,auth.isAuthenticated,user.userPurchaseList)


// forgot password

router.post('/user/forgotpassword',user.forgotPassword);

// reset Password

router.put('/user/resetpassword/:tokenid',user.resetPassword)


// password change manually--

router.put('/user/changepassword/:userid',
auth.isSignedIn,auth.isAuthenticated,
user.changePassword)


// uploading pic for user

router.post('/user/upload/:userid',
auth.isSignedIn,
auth.isAuthenticated,
user.uploadPhoto)





module.exports = router