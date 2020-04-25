const User = require('../models/users.model')

const {validationResult} = require('express-validator')

const sendMail = require('../util/sendEmail')

// decoding
const {promisify} = require('util')
// jwt

const ejs = require('ejs')  // templating engine here used to make ejs into html
const htmlToText = require('html-to-text'); // converts html to text


const jwt = require('jsonwebtoken')

const expressJwt = require('express-jwt')

const signup = (req,res,next) => {

    const error = validationResult(req)

    if (!error.isEmpty()){  // this means if error or Validation Result is not Empty then

        var errobj = error.array()[0].msg  // throwing first error
        // changing error data into Array then taking [0] first object
        // then showing the message property of that error
        
        // synatx of error object{ location : " " , msg : " " , param : "  "}
        return res.status(422).json({status : "fail",error : errobj})
    }

    var obj = new User(req.body)
    
    obj.save(
        (err,user) => {  // here user is the full object that is just created
            
            if (err){
                return res.status(400).json({status : "fail",error : "Not Saved due to some error may be a duplicate email found"})
            }
            else{
                next()
            }
           
                // just to send Greetings Email
                
                // this was the virtual field that is exactly created on the fly

                    // then with our db methods ency_password is generated


        })
    
    

}

const signin = (req,res) => {

    const error = validationResult(req)

    if (!error.isEmpty()){ 
        var errobj = error.array()[0].msg
        return res.status(422).json({status : "fail",error : errobj})
    }

    const {email , password} = req.body  // extracting email and password from req.body
    // destructuring of data
    // instead of writing req.body.email , req.body.password

    User.findOne({email : email},
        (err,user) => {  // user is the object returned from the query
            // that could be used further for calling any methods or using any properties
            if (err || !user){ // any error or no user with that
               return res.status(400).json({status : "fail",error : "Email Id not Found"})
            }

            else if (!user.authenticate(password)){ // using our custom authenticate method written in the Model
              return   res.status(401).json({status : "fail",error : "Email and Password does not match"})
            }

            else{
                // create token or generating using payload data and secret
                // signature of token is being created
                // payload data is user_id here which is insesnsitive info 

                // i would get this _id back when subsequent req is made in the req.UserProperty object
                const token = jwt.sign({_id : user._id},process.env.SECRET) // any secret
                // any server secret code for creating token string
                const cookieOptions = {
                    expires: new Date(
                      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                  };
                  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
                
    
                // putting token in cookie
                // res.cookie ('cookiename', value , expiryTime)
                res.cookie('jwt',token,cookieOptions) // in milliseconds

                // sending some Json data to front-end 
                const {_id,firstname,email,salt} = user;
                
                // creating session also  for managing some flaw due to EJS
                

                return res.status(200).json({
                    status : "success",
                    jwt : token,
                    user : {
                        _id,
                        firstname,
                        email,
                        salt
                    }
                 
                })

            }

        }
        )


}

const signout = (req,res) =>{

    res.clearCookie("jwt")  // clearing the token 
    res.json({status : "success",message : "Logout Successfull"});
}



// required middleware

// will check whether a user is logged in the application or not
isSignedIn = expressJwt({

    secret : process.env.SECRET,   // the secret through which it decodes the JWT in the request

    userProperty : 'auth'  // payload would be attached to this as [req.auth = "user_id"]
    // user_id because that was only set as the payload while creating token
})

// my Custom middlewares
// further authorizations

isAdminEJS = (req,res) => {

    // if (!req.profile){                more check
    //     return res.status(403).json({
    //         error : "User Details not found"
    //     })
    // }
    //console.log('Upto here')
    let check = req.profile.role   // this profile is totally set by front-End

    if(check === 0){
        
        return res.status(403).json({status : "fail",
            error : "ACCESS DENIED ! NOT AN ADMIN"
        })
    }

    return res.status(200).json({status : "success",
            message : "ADMIN ACCESS GRANTED"
        })
    
}


isAdmin = (req,res,next) => {

    // if (!req.profile){                more check
    //     return res.status(403).json({
    //         error : "User Details not found"
    //     })
    // }
    console.log('Upto here')
    let check = req.profile.role   // this profile is totally set by front-End

    if(check === 0){
        
        return res.status(403).json({status : "fail",
            error : "ACCESS DENIED ! NOT AN ADMIN"
        })
    }

    next()
    
}



isAuthenticatedEJS = (req,res) => {

    let check = req.profile && req.auth && (req.profile._id == req.auth._id)
    // this req.profile is set while checking whether any user exits making that req
    // note it is changed to == as req.profile._id is of type (object)
    if (!req.auth){
        return res.render('badreq',{msg : "Session Ended Login Again",url : '/gvj-api'})

    }
    if (!check){
        return res.status(403).json({status : "fail",
            error : "ACCESS DENIED NOT AUTHENTICATED"
        })
    }
    return res.status(200).json({status : "success",
            message : "USER ACCESS GRANTED"
        })
    
}


isAuthenticated = (req,res,next) => {

    let check = req.profile && req.auth && (req.profile._id == req.auth._id)
    // this req.profile is set while checking whether any user exits making that req
    // note it is changed to == as req.profile._id is of type (object)
    if (!check){
        return res.status(403).json({status : "fail",
            error : "ACCESS DENIED NOT AUTHENTICATED"
        })
    }
    next()
    
}








const sendGreetingMail = (req,res) => {
    
    const {firstname , email  } = req.body

 
    // sending mail
    data = {
        firstname : firstname,
        url : `${req.protocol}://${req.get('host')}/gvj-api`
    }
    const mypath = `${require('../config_paths.js')}/views/welcome.ejs`
    ejs.renderFile(mypath,data,(err,html) => {

        if (err){
            return res.status(402).json({
                status : "fail",
                error : "Error in sending Link"
            })
        }
         html_data = html
     })
    sendMail({
        email : email,
        subject : 'Greetings From GVJ -- ACCOUNT CREATED',
        html : html_data,
        text: htmlToText.fromString(html_data)
    }).then(
        ()=> {
            return res.status(200).json({
                status : 'success',
                message : "Signed up Successfully",
                data : {
                        firstname : firstname,
                        email : email,
                }
            })
        }
    ).catch(
        (err) => {
                return res.status(400).json({
                    status : "success1",
                    message : "details are Saved Successfully",
                    data : {
                        firstname : firstname,
                        email : email
                }
                })
    
        }
    )      

    }




// THIS MWARE is for just checking whether user is logged in or not 
// just for rendering the same page differently

const isLoggedInEJS = async (req,res,next) => {

    if (req.cookies.jwt) {
        try {
            //console.log(req.cookies.jwt)
          // 1) verify token
          const decoded = await promisify(jwt.verify)(
            req.cookies.jwt,
            process.env.SECRET
          );
           // console.log(decoded) {_id : ' ' ,updatedit : ' '}
          // 2) Check if user still exists
          const currentUser = await User.findById(decoded._id)
          if (!currentUser) {
            return next();
          }
    
          // THERE IS A LOGGED IN USER
          res.locals.user = currentUser; // can use user in EJS
          return next();
        } catch (err) {
          return next();
        }
      }
      next();
}

const checkFlaw = (req,res,next) => {

    const p_salt = req.profile.salt
    const req_salt = req.url.split('/')[req.url.split('/').length-1]
        if (p_salt != req_salt)
        {
            return res.render('badreq',{msg : "Trying to Compromise the website Don't do it",url : '/gvj-api'})

        }
        next()
    
    

}


const checkFlawLogin = async (req,res,next) => {

    if (req.cookies.jwt) {
        try {
            //console.log(req.cookies.jwt)
          // 1) verify token
          const decoded = await promisify(jwt.verify)(
            req.cookies.jwt,
            process.env.SECRET
          );
           // console.log(decoded) {_id : ' ' ,updatedit : ' '}
          // 2) Check if user still exists
          const currentUser = await User.findById(decoded._id)
          if (!currentUser) {
        return res.render('badreq',{msg : "Session Ended Login Again",url : '/gvj-api'})

          }
          return next();
        } catch (err) {
          return next();
        }
      }
      else{
        return res.render('badreq',{msg : "Session Ended Login Again",url : '/gvj-api'}
    )      }
}


module.exports = {
    signout : signout,
    signup : signup,
    signin : signin,
    isSignedIn : isSignedIn,
    isAdmin : isAdmin,
    isAuthenticated : isAuthenticated,
    isAdminEJS : isAdminEJS,
    isAuthenticatedEJS : isAuthenticatedEJS,
    sendGreetingMail : sendGreetingMail,
    isLoggedInEJS : isLoggedInEJS,
    checkFlaw : checkFlaw,
    checkFlawLogin : checkFlawLogin
}