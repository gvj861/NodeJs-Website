const express = require('express')


const router = express.Router()



const auth = require('../controllers/auth.controller')

const user = require('../controllers/user.controller')

router.param('userid',user.getuserbyID)

const {check} = require('express-validator') // destructuring

// check is nothing but express-validator.check function for validation

// ex -- check('field-name' , 'error message').validationFunction()

// validationResult is nothing but an array of error objects placed in it if
// any error occurs


router.get('/signout',auth.signout)

router.post('/signup',


// these are middlewares from express-validator
[ 
  check('firstname','Name Should be more than 3 Characters' ).isLength({min:3,max:31}),

  check('email',"Appropriate Email is Required").isEmail(),

  check ('password',"Password Length should be atleast 5 characters").isLength({min : 5})

  // these are combinations of (middleware) callbacks that could be used in routing

], // if any error occurs then it gets pushed into ValidationResult -- there in Controller
auth.signup,auth.sendGreetingMail)

// adding new feature to say Hello to the user


router.post('/signin',

[
 
    check('email',"Appropriate email is Required").isEmail(),

    check('password',"Password cannot be empty").isLength({min:1})

],

auth.signin

)

// router.get('/test',auth.isSignedIn,(req,res) => {  
//     res.status(200).json({
//         message : "Protected Route",
//         data : req.auth  // in req.auth = { _id : " " } this is planted that we gave as a payload in the token
//     })
// })


// to use this user_id is damn important

router.get('/check/:userid',auth.isSignedIn,auth.isAuthenticatedEJS);
// simple these doesnt return next thats it


router.get('/checkAdmin/:userid',auth.isSignedIn,auth.isAdminEJS)


















module.exports = router