import axios from 'axios'


const getAccountPage = (userid,token,usersalt) => {  // thsi is not used because pavan made a SPA for USers
    axios({
        headers : {
            Authorization : `Bearer ${token}`
        },
        method : 'get',
        url : `/gvj-api/check/${userid}`,
        
 
    })
    .then(
        (response) => {
            console.log(response)
            if (response.data.status == 'success'){

                location.assign(`/gvj-api/getaccountpage/${userid}/${usersalt}`) // get me just all the categories
            }

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



const changePassword = (userid,token,usercurrentpassword,usernewpassword) => 
{

    axios({
        headers : {
            Authorization : `Bearer ${token}`
        },

        method : 'put',
        url : `/gvj-api/user/changepassword/${userid}`,
        data : {usercurrentpassword,usernewpassword}
        

    })
    .then(
        (response) => {
            
            if (response.data.status == 'success'){
                console.log(response.data.message)    
                localStorage.removeItem('token')
                localStorage.removeItem('userid')
                localStorage.removeItem('chk-data')
                window.setTimeout(()=>{
                    location.assign(`/gvj-api/login`)
                },2000)
                 // redirect to login
            }

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


const uploadUserPhoto = (userid,token,usersalt,photo) => {


        var form = new FormData();
        form.append('photo',photo)
        axios({
            headers : {
                'Content-Type': form.getHeaders,
                Authorization : `Bearer ${token}`
            },
            method : 'post',
            url : `/gvj-api/user/upload/${userid}`,
            data : form
        })
        .then(
            (response) => {
    
                console.log(response.data.message)
                window.setTimeout(()=> {
                    location.assign(`/gvj-api/profilepage/${userid}/${usersalt}`)
                },2000)
    
            }
        )
        .catch(
            (error) => {
                console.log(error.response)
                if (error.response.data.error){
                    console.log(error.response.data.error)
                    
                }
                else{
                    console.log("Internal Server Error")
                }
    
            }
        )
    
    
    
    }



const getMyProfile = (userid,token,usersalt) => {

    axios({
        headers : {
            Authorization : `Bearer ${token}`
        },
        method : 'get',
        url : `/gvj-api/check/${userid}`,
        
 
    })
    .then(
        (response) => {
            console.log(response)
            if (response.data.status == 'success'){

                location.assign(`/gvj-api/profilepage/${userid}/${usersalt}`) // get me just all the categories
            }

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



module.exports = {
    getAccountPage : getAccountPage,
    changePassword : changePassword,
    uploadUserPhoto : uploadUserPhoto,
    getMyProfile : getMyProfile
}