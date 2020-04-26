import {getAccountPage,changePassword,uploadUserPhoto,getMyProfile} from './SettingsHelper'


const token = localStorage.getItem('token')
const userid = localStorage.getItem('userid')
const usersalt = localStorage.getItem('chk-data')

import {showAlert} from '../alerts'



const getAccountPageListener  = (e) => {
    e.preventDefault();
    getAccountPage(userid,token,usersalt)
}



const changePasswordListener = (e) => {
    e.preventDefault()
    var usercurrentpassword = document.getElementById('usercurrentpassword').value
    var usernewpassword = document.getElementById('usernewpassword').value
    var usernewconfirmpassword = document.getElementById('usernewconfirmpassword').value
    

    if (!(usernewpassword == usernewconfirmpassword)){

        showAlert("fail","Password fields doesnot match! Check again")
        window.setTimeout(()=> {
            location.reload(true)
        },2000)

    }
     // minimum 5 characters password
    else if (usernewpassword.length < 5)
    {
        showAlert("fail","Minimum length should be 5 characters")
        window.setTimeout(()=> {
            location.reload(true)
        },2000)

    }
    else if (usercurrentpassword == usernewpassword){
        showAlert("fail","New Password and Current Password should not be same..Change it!")
        window.setTimeout(()=> {
            location.reload(true)
        },2000)
    }
    else{
    changePassword(userid,token,usercurrentpassword,usernewpassword);
    }
}


const uploadUserPhotoListener = (e) => {

    const id = e.target.name // getting the clicked element
    const photo = document.getElementById(id).files[0]  // only _id given as id to photos--

    uploadUserPhoto(userid,token,usersalt,photo)


}



const getMyProfileListener = (e) => {
    
    e.preventDefault()
    getMyProfile(userid,token,usersalt)
}







module.exports = {
    getAccountPageListener : getAccountPageListener,
    changePasswordListener : changePasswordListener,
    uploadUserPhotoListener : uploadUserPhotoListener,
    getMyProfileListener : getMyProfileListener // adding here as its the root of all user data
}
