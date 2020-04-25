import {addItemToCart,getCartPage,removeFromCart,applyQuantity} from './CartHelper'


const token = localStorage.getItem('token')
const userid = localStorage.getItem('userid')
const usersalt = localStorage.getItem('chk-data')


const addItemToCartListener = (e) => {

    e.preventDefault();
    if (userid == undefined){
        alert('Please login to add to cart')
    }
    // this id everywhere is the productid
    const id = e.target.name
    addItemToCart(userid,token,id)

}



const getCartPageListener = (e) => {
    
    e.preventDefault();
    getCartPage(userid,token,usersalt)
}


const removeFromCartListener = (e) => {

    e.preventDefault();
    const cartid = e.target.name
    removeFromCart(userid,token,usersalt,cartid)
}



const applyQuantityListener = (e) => {
    e.preventDefault();
    const cartid = e.target.name
    const quantity = document.getElementById(cartid).value
    if (parseInt(quantity)>0){
        applyQuantity(userid,token,usersalt,cartid,parseInt(quantity))
        }
        else{
            alert('Bad choice items cannot be 0 or less than it')
        }
}



module.exports = {

    addItemToCartListener : addItemToCartListener,
    getCartPageListener : getCartPageListener,
    removeFromCartListener : removeFromCartListener,
    applyQuantityListener : applyQuantityListener
}