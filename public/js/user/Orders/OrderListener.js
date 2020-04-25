import {getMyOrder,getMyPurchases} from './OrderHelper'


const token = localStorage.getItem('token')
const userid = localStorage.getItem('userid')
const usersalt = localStorage.getItem('chk-data')

const getMyOrdersListener = (e) => {

    e.preventDefault();
    getMyOrder(userid,token,usersalt)

}


const getMyPurchasesListener = (e) =>{

    e.preventDefault()
    getMyPurchases(userid,token,usersalt)
}









module.exports = 
{
    getMyOrdersListener : getMyOrdersListener,
    getMyPurchasesListener : getMyPurchasesListener
}