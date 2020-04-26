import {addItemToCart,getCartPage,removeFromCart,applyQuantity} from './CartHelper'


const token = localStorage.getItem('token')
const userid = localStorage.getItem('userid')
const usersalt = localStorage.getItem('chk-data')

import  {showAlert} from '../alerts'; 
const addItemToCartListener = (e) => {

    e.preventDefault();
    // this id everywhere is the productid
    const id = e.target.name
    // console.log(userid)
    if (!userid){
        showAlert('fail','Login to add to cart')

    }
    else{
    addItemToCart(userid,token,id)
    }
}



const getCartPageListener = (e) => {
    
    e.preventDefault();
    getCartPage(userid,token,usersalt)
}


const removeFromCartListener = (e) => {
    e.preventDefault()
    const cartid = e.target.id
    console.log(cartid)
    removeFromCart(userid,token,usersalt,cartid)
}



const applyQuantityListener = (e) => {
    e.preventDefault();
    const cartid = e.target.name
    const quantity = document.getElementsByClassName(cartid)[0].value
    console.log(quantity)
    if (parseInt(quantity)>0){
        applyQuantity(userid,token,usersalt,cartid,parseInt(quantity))
        }
        else{
            showAlert('fail','Choose appropriate quantity')
        }
}



module.exports = {

    addItemToCartListener : addItemToCartListener,
    getCartPageListener : getCartPageListener,
    removeFromCartListener : removeFromCartListener,
    applyQuantityListener : applyQuantityListener
}