import {login,logout,signup,forgotpassword,resetpassword,getforgotpassword,getlogin,getsignup} from './authHelper'

const LoginListener = (e) => {
    
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);


} 

const LogoutListener = (e) => {

    e.preventDefault();
    logout();

}


const SignupListener = (e) => {

    e.preventDefault();
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('signuppassword').value;

    signup(firstname,lastname,email,password)

}

const ForgotPasswordListener = (e) => 
{
    e.preventDefault();
    const email = document.getElementById('email').value;
    forgotpassword(email)
}

const ResetPasswordListener = (e) => {

    e.preventDefault()
    const newpassword = document.getElementById('newpassword').value;
    const newpasswordconfirm = document.getElementById('newpasswordconfirm').value;
    if (!(newpassword == newpasswordconfirm)){
        alert("Password fields doesnot match! Check again")
    }
     // minimum 5 characters password
    else if (newpassword.length < 5)
    {
        alert("Minimum length should be 5 characters")
    }
    else{
    resetpassword(newpassword,newpasswordconfirm)
    }
}

const GetForgotPasswordListener = (e) => {
    e.preventDefault()
    getforgotpassword();
}

const GetLoginListener = (e) => {
    e.preventDefault()
    getlogin()
}

const GetSignupListener = (e) => {
    e.preventDefault()
    getsignup()
}


module.exports = {
    LoginListener : LoginListener,
    LogoutListener : LogoutListener,
    SignupListener : SignupListener,
    ForgotPasswordListener : ForgotPasswordListener,
    ResetPasswordListener : ResetPasswordListener,
    GetForgotPasswordListener : GetForgotPasswordListener,
    GetLoginListener : GetLoginListener,
    GetSignupListener : GetSignupListener
}