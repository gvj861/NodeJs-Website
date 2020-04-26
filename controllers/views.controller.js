// this is for rendering views for subsequent get requests

// Routes would be specific for each controller

// It would be defined there only

// This is a static controller



const getHomepage = (req,res) =>
 {
    //console.log(res.locals.user) use user to get every detail

    res.status(200).render('home',{title : ''})
    

}

const getLogin = (req,res) => 
{
    res.status(200).render('login',{title : 'Login Here'});
}

const getForgotPassword = (req,res) =>{
    res.status(200).render('forgotpassword', {
        title: 'We will help you reset the Password'
      });
}

const getResetPage = (req,res) => {
    res.status(200).render('resetpassword', {
        title: 'Create Your Password Here'
      });
}


const getSignup = (req,res) => 
{
    res.status(200).render('signup',{title : 'Register Here'});

}


const getCreateProduct = (req,res) => {

    res.status(200).render('createproduct');

}

const getUpdateProduct = (req,res) => {
    res.status(200).render('getupdateproduct',{product : req.product})
}

const getAccountPage = (req,res) => {

    res.status(200).render('getaccountpage')
}


const showAdminPanel = (req,res) => {
    res.status(200).render('adminHome')
}

const showAboutUs = (req,res) => {
    res.status(200).render('aboutus')
}

const getProfilePage = (req,res) => {
    res.status(200).render('profile.ejs')

}
module.exports = {
    getForgotPassword : getForgotPassword,
    getResetPage : getResetPage,
    getLogin : getLogin,
    getHomepage : getHomepage,
    getSignup : getSignup,
    getCreateProduct : getCreateProduct,
    getUpdateProduct : getUpdateProduct,
    getAccountPage : getAccountPage,
  // middleware,
  showAdminPanel : showAdminPanel,
  showAboutUs : showAboutUs,
  getProfilePage : getProfilePage

}