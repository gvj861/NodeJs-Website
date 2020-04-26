import {getAccountPage,changePassword,uploadUserPhoto,getMyProfile} from './SettingsHelper'


const token = localStorage.getItem('token')
const userid = localStorage.getItem('userid')
const usersalt = localStorage.getItem('chk-data')




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
        alert("Password fields doesnot match! Check again")
    }
     // minimum 5 characters password
    else if (usernewpassword.length < 5)
    {
        alert("Minimum length should be 5 characters")
    }
    else if (usercurrentpassword == usernewpassword){
        alert("New Password and Current Password should not be same..Change it!")
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
