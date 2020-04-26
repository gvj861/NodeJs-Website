const User = require('../models/users.model')

const Order = require('../models/order.model')

// saving image data
const formidable = require('formidable')


// emails--essentials

const ejs = require('ejs')
const htmlToText = require('html-to-text')


// for sending emails

const crypto = require('crypto')

const sendMail = require('../util/sendEmail')

const getuserbyID = (req,res,next,userid) => {

    User.findById(userid)  // will search for user with given id
    .exec( (err,userobj) => {   // after executing it even returns a promise
        // userobj is the whole bunch of details retrived from the DB 
        if (err || !userobj){
            return res.status(403).json({status : "fail",
                error : "User not found in DB"
            })
        }
        
        req.profile = userobj   // populating on req.profile for further authorizations
        next()
    } )
    
}



const getUser = (req,res) => {

    // ovio would be called after calling the above middleware 

    // therefore can use req.profile which i set above


    // the salt values and encry_pass should not be sent

    // so any value if its undefined it would not be sent

    req.profile.salt = undefined
    req.profile.ency_password = undefined
    // these two values would not be sent now 

    // and created at and updated at should be not sent [useless]
    req.profile.createdAt = undefined

    req.profile.updatedAt = undefined

    return res.status(200).json({status : "success",message : req.profile})

    // remember here for user Password some thing needs to be done
    // as "password" is a virtual field
    
    // and "ency_pass" is not which the user set
    

}

const updateUser = (req,res) => {   // may be will not use this project....! 22/04/2020
    
    User.findByIdAndUpdate(
        // even can do {_id : req.profile._id}
        req.profile._id,  // searching with the id
        {$set : req.body},  // req.body is an object with name value pairs 
        // and {$set : updatedvalues in {object from}}
        {new : true, useFindAndModify : false}, // mongoose inbuilt function saying no to it
        // new = true means it would return the updated document rather than old doc

    )
    .exec(
        (err,updateduser) => {

            if (err || !updateduser){
                return res.status(400).json({status : "fail",
                    error : "Updation Error"
                })
            }

            updateduser.salt = undefined
            updateduser.ency_password = undefined
            updateduser.createdAt = undefined
            return res.status(200).json({status : "success",message : updateduser})
        }
    )

} 


const userPurchaseList = (req,res) =>{

    // when asked about user purchase list
    // the whole orders regarding this user is sent by populating name and id 
    // in the object it returns

    Order.find( {_id : req.profile._id} )
    // populate used as ('refname','name1 name2 name3')
    // it populates the values paired to those names
    // populate('propertyname' , 'name1 name2 ... so on with space seperated')
    .populate("user","_id firstname") // this actually fills those details in the Order obj
    .exec( (err,userorders) => {

        if (err || !userorders){
            return res.status(400).json({status : "fail",
                error : "No Purchase History"
            })
        }

        return res.status(200).json({status : 'success',message : userorders})
    })
    
    }       
        
    
const pushOrderInPurchaseList = (req , res , next) => {

    // first of all 
    // an order can contain n number of products
    // each product has its own characteristics

    // let this purchases list be empty at first [ ]

    var purchaseList = [ ]

    // req.body would contain all the data regarding order
    // manually populating data into req.body.order for readability

    // after that products could be many so purchases term is used 

    //*****
    // req.body.order contains every thing 
    // so in the order there could be many products of diff variety
    // therefore having the complete detail of them and pushing to the purchaseList
    
    // even arrow fun could be used here as
    // req.body.order.products.forEach(eachItem => {
        
    // });
    for (eachItem of req.body.order.products) 
    {
    

        purchaseList.push(

            {

                _id : eachItem._id,

                name : eachItem.name,

                description : eachItem.description,

                category : eachItem.category,

                quantity : eachItem.quantity,

                // imp other info

                amount : req.body.order.amount,

                transaction_id : req.body.order.transaction_id

            }
        )
    }
    // after getting all products and info in the purchaseList

    //storing in the database


    User.findByIdAndUpdate({_id : req.profile._id},
        
        {$push : {purchases : purchaseList}},

        // push because thats an array

        // so {purchase property gets updated with purchaseList}

        {new : true , useFindAndModify : false},

        (err) => {
            if (err){
                return res.status(400).json({status : "fail",
                    error : "Unable to save Purchase List"
                })
            }
            next()
        }


        
        
        )

}

// forgot Password

// get the email from te user

const forgotPassword = (req,res) => {
    
    const {email} = req.body

    User.findOne({email},  //1. get the email
        
        (err,user) => {
            if (err || !user) {
                return res.status(400).json({
                    status : "fail",
                    error : "No user exists"
                    
                })
            }

           const reset_token =  user.create_reset_token() // create token

          

            user.save();
            
            // send the reset_token to email

const reset_URL = `${req.protocol}://${req.get('host')}/gvj-api/user/resetpassword/${reset_token}` ;


const data = {

    url : `${req.protocol}://${req.get('host')}/gvj-api`,
    resetLink : reset_URL,
    firstname : user.firstname
}


const mypath = `${require('../config_paths.js')}/views/PasswordLink.ejs`
    ejs.renderFile(mypath,data,(err,html) => {    
        if (err){  // converting to html 
            return res.status(402).json({
                status : "fail",
                error : "Error in sending Link"
            })
        }
         html_data = html
     })

sendMail({
    email : user.email,
    subject : 'Password Reset Link <support@rapidbasket.com>',
    html : html_data,
    text : htmlToText.fromString(html_data)
}).then(
    ()=> {
        return res.status(200).json({
            status : 'success',
            message : "Reset link sent to the email successfully"
        })
    }
).catch(
    (err) => {
        user.password_ResetExpires = undefined
        user.password_ResetToken = undefined
            return res.status(400).json({
                status : "fail",
                error : "Cannot Send the reset Link right now"
            })

    }
)      
})
}

const resetPassword = (req,res) => {

    var {password,passwordconfirm} = req.body
    
  
    if (!(password === passwordconfirm)){
        return res.status(400).json({
            status : "fail",
            error : "Both password and confirm password should match"
        })
    }
    const user = req.profile
    user.password_ResetToken = undefined
    user.password_ResetExpires = undefined
    user.password = password
    user.save(
        (err,updateduser) => {

            if (err || !updateduser) {
                console.log(err)
                return res.status(500).json({
                    status : "fail",
                    error : "Cannot Update Password Please again try for the reset link"
                })

            }
            res.clearCookie('jwt');
            return res.status(200).json({
                status : "success",
                message : "Password Reset Completed,Login Again"
            })

        })
    



}

const checkToken = (req,res,next,tokenid)=> {

    console.log('CHECKING TOKEN')
    const gen_pass = crypto.createHmac("sha256",process.env.RESET)
    .update(tokenid)
    .digest('hex');
    
    User.findOne({password_ResetToken : gen_pass},
        (err,userobj)=>
        {
            if (err || !userobj){
                return res.status(400).json({
                    status : "fail",
                    error : "Invalid Token or Link Expired associated with the link"
                })
            }
            req.profile = userobj
            next()



    })
}

    

// resizing photo -- Image Processing
  
const uploadPhoto = (req,res) => {

    var user = req.profile

    var form = new formidable.IncomingForm({multiples : false});
    form.keepExtensions = true
    form.uploadDir = `${require('../config_paths')}/public/img/users` // our photos are stored here the full path is given
    //form.uploadDir = '/img/users' // this should be the link in users
    // form.multiples = true
    form.on('fileBegin',function(name,file){
        file.name = `${user._id}-${Date.now()}.${file.name.split('.')[1]}`
        file.path =  form.uploadDir+'/'+ file.name
        
    })
    .on('file',function(name,file){

        if (file.size  < 5){
            return res.status(400).json({
                error : "No file selected"
            })
        }
        if (!(file.type.split('/')[0] == 'image') || !(file.size <= 2*1024*1024)){
            return res.status(400).json({
                error : `Problem with the uploaded file ${ 'Not a Valid File'}`
            })
        }

    
    

    
    user.photo = `/img/users/${file.name}`
    
    user.save(
        (err,Saved_user) => {
            if (err || !Saved_user){
                return res.status(400).json({
                    error : "Cannot Save the image Server Error"
                })
            }
            return res.status(200).json({
                status : "success",
                message : 'Uploaded successfully',
                userdetails : Saved_user
            })
        })
        

    })
    form.parse(req)
        
        
}


const changePassword = (req,res) => {   // specially for EJS

    const {usercurrentpassword,usernewpassword } = req.body

    const user = req.profile

    if (!user.authenticate(usercurrentpassword)){
        return res.status(400).json({
            status : "fail",
            error : "Current Password does not match! Try Forgot Password!!"
        })
    }

    user.password = usernewpassword

    user.save(
        (err,userobj) => {
            if (err || !userobj) {

                return res.status(500).json({
                    status : "fail",
                    error : "Not able to change Password right now. Sorry!"
                })

            }
            
        res.clearCookie('jwt');
        return res.status(200).json({
            status : "success",
            message : "Password Changed Successfully. Please Login again with new Password"
        })
    }
    )


}


module.exports = {

    getuserbyID : getuserbyID,

    getUser : getUser,

    updateUser : updateUser,

    userPurchaseList : userPurchaseList,

    pushOrderInPurchaseList : pushOrderInPurchaseList,

    forgotPassword : forgotPassword,

    resetPassword : resetPassword,

    checkToken : checkToken,

    uploadPhoto : uploadPhoto,

    changePassword : changePassword

}