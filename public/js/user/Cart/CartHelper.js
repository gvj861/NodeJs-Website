import axios from 'axios';


import { showAlert } from '../alerts';


const addItemToCart = (userid,token,id) => {

    axios({
        headers : {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization : `Bearer ${token}`
        },
        method : 'post',
        url : `/gvj-api/cart/addtocart/${userid}`,
        data : {id}
    })
    .then(
        (response) => {
    
        // console.log(response.data.message)
        showAlert('success',response.data.message)
        window.setTimeout(()=>{
                location.assign(`/gvj-api/`)
            },1500)
        }
    )
    .catch(
        (error) => {

            if (error.response.data.error){
                // console.log(error.response.data.error)

                showAlert('fail',error.response.data.error)
               
            
                
            }
            else{
                showAlert('fail',"Internal Server Error")
            }
            

        }
    )
    
}




const getCartPage = (userid,token,usersalt) => {

    axios({
        headers : {
            'Content-Type': 'application/json;charset=UTF-8',
            
            Authorization : `Bearer ${token}`
        },
        method : 'get',
        url : `/gvj-api/check/${userid}`
    })
    .then(
        (response) => {
            // console.log('getting cart Page')
           location.assign(`/gvj-api/cart/${userid}/${usersalt}`)
        }
    )
    .catch(
        (error) => {

            if (error.response.data.error){
                // console.log(error.response.data.error)
                showAlert('fail',error.response.data.error)
                
            }
            else{
                showAlert('fail',"Internal Server Error")
            }
            

        }
    )
    


}


const removeFromCart = (userid,token,usersalt,cartid) => {

    axios({
        headers : {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization : `Bearer ${token}`
        },
        method : 'delete',
        url : `/gvj-api/cart/${cartid}/${userid}`,
    })
    .then(
        (response) => {
    
        // console.log(response.data.message)
        showAlert('success',response.data.message)

        window.setTimeout(()=>{
                location.assign(`/gvj-api/cart/${userid}/${usersalt}`)
            },1500)
        }
    )
    .catch(
        (error) => {

            if (error.response.data.error){
                // console.log(error.response.data.error)
                showAlert('fail',error.response.data.error)
                
            }
            else{
                showAlert('fail',"Internal Server Error")
            }
            

        }
    )


}

const applyQuantity = (userid,token,usersalt,cartid,quantity) => {

    axios({
        headers : {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization : `Bearer ${token}`
        },
        method : 'put',
        url : `/gvj-api/cart/${cartid}/${userid}`,
        data : {quantity}
    })
    .then(
        (response) => {
            // console.log(response.data.message)
            // alert to be put check the reset link for reset password
            showAlert('success',response.data.message)
            
            window.setTimeout(()=>{
                location.assign(`/gvj-api/cart/${userid}/${usersalt}`)
            },2000)
        }
    )
    .catch(
        (error) => {

            if (error.response.data.error){
                // console.log(error.response.data.error)
                showAlert('fail',error.response.data.error)

                
            }
            else{
                showAlert('fail',"Internal Server Error")
            }
            

        }
    )
    

}




module.exports = {
    addItemToCart : addItemToCart,
    getCartPage : getCartPage,
    removeFromCart : removeFromCart,
    applyQuantity : applyQuantity
}