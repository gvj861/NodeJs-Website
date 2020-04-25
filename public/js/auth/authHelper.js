import axios from 'axios';



// these are the fields expected from the user

const login = (email,password) => 

{
    // this whole axios function will return a promise that would be handled by pair of then and catch
axios({
        headers : {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        method : 'post',
        url : '/gvj-api/signin',
        data : {
            email,                      // js is smart enough to understand this as 
            password                            // email : email
        }
    })
.then ( (response) => {
    if (response.data.status == 'success'){
        // response.data is the whole object recieved --- response.data.anything which you sent is the key here
        //console.log(response)
        localStorage.setItem('userid',response.data.user._id)
        localStorage.setItem('name',response.data.firstname)
        localStorage.setItem('token',response.data.jwt)
        localStorage.setItem('chk-data',response.data.user.salt)
        // user cart
        // will be used for protected routes and much more

        // redirecting to home

        // TODO give an alert button
        
       window.setTimeout( ()=> {
                location.assign(`/gvj-api/`) // going to home page
        },1500)

    
    }
})
.catch ( (error)=> {  // if res status is other than 200 then it is treated as error
    // and response object gets stored in error obj
    if (error.response.data.error){
        console.log(error.response.data.error)
        
    }
    else{
        console.log("Internal Server Error")
    }
})


}

// login ends



const logout = ()=> {

    axios({
        method : 'get',
        url : '/gvj-api/signout'

    })
    .then(
        (response) => {
            console.log(response.data.message)
            // a small example to redirect to some page
            localStorage.removeItem('token')
            localStorage.removeItem('userid')
            localStorage.removeItem('chk-data')
            window.setTimeout(() => {
                location.assign('/gvj-api');
              }, 2000);
        }
    )
    .catch((err)=>{
        console.log(err.response.data.error)
    })
}

// logout ends





const signup = (firstname,lastname,email,password) => {


axios({
    headers : {
        'Content-Type': 'application/json;charset=UTF-8',
    },
    method : 'post',
    url : '/gvj-api/signup',
    data : {firstname,lastname,email,password}
})
.then(
    (response) => {
        console.log(response.data.message)
        
        // any alert button
        window.setTimeout( ()=> {
            location.assign('/gvj-api/login')
        },1500)
    }
)
.catch(
    (error) => {

        if (error.response.data.error){
            console.log(error.response.data.error)
        }
        else{
            console.log("Internal Server Error")
        }

    }
)

}


const forgotpassword = (email) => {

    axios({
        headers : {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        method : 'post',
        url : '/gvj-api/user/forgotpassword',
        data : {email}
    })
    .then(
        (response) => {
            
            console.log(response.data.message)
            // alert to be put check the reset link for reset password

            window.setTimeout(()=>{
                location.assign('/gvj-api/login')
            },2000)
        }
        )
    .catch(
        (error) => {

            // TODO again an alert to be put with below messages
            if (error.response.data.error){
                console.log(error.response.data.error)
                
                window.setTimeout(()=>{
                    location.reload(true)
                },2000)
                
            }
            else{
                console.log("Internal Server Error")
            }

        }
    )


    
}

const resetpassword = (password,passwordconfirm) => {
    const path = 'http://'+location.host+location.pathname

    axios({
        headers : {
            'Content-Type': 'application/json;charset=UTF-8',
        },
        method : 'put',
        url : path,
        data : {password,passwordconfirm}
    })
    .then(
        (response) => {
    console.log(response)
    console.log(response.data.message)
            // alert to be put check the reset link for reset password

            window.setTimeout(()=>{
                location.assign('/gvj-api/login')
            },2000)
        }
    )
    .catch(
        (error) => {

            if (error.response.data.error){
                console.log(error.response.data.error)
                location.assign('/gvj-api')
                
            }
            else{
                console.log("Internal Server Error")
            }

        }
    )
    

}

const getforgotpassword = ()=> {

    location.assign('/gvj-api/forgotpassword') // would be rendering in Login Page
}

const getlogin = () => {
    console.log("Clicked here")
    location.assign('/gvj-api/login')
}

const getsignup = () => {
    location.assign('/gvj-api/signup')
}


module.exports = {
    login : login,
    logout : logout,
    signup : signup,
    forgotpassword : forgotpassword,
    resetpassword : resetpassword,
    getforgotpassword : getforgotpassword,
    getlogin : getlogin,
    getsignup : getsignup
   
}