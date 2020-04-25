import axios from 'axios';

const getAdminPanel = (userid,token) => {

    axios({
        headers : {
            'Content-Type': 'application/json;charset=UTF-8',
            
            Authorization : `Bearer ${token}`
        },
        method : 'get',
        url : `/gvj-api/checkAdmin/${userid}`
    })
    .then(
        (response) => {
            console.log('getting Admin Page')
           location.assign(`/gvj-api/adminpanel*123/`)
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
    getAdminPanel : getAdminPanel
}