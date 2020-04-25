import {getAllOrders,changeStatus} from './adminOrderHelper';



const userid = localStorage.getItem('userid')
const token = localStorage.getItem('token')


const getAllOrdersListener = (e) => {
    e.preventDefault();
    getAllOrders(userid,token)
}


const changeStatusListener = (e) => {
    e.preventDefault()
    var orderid = e.target.name
    var status = document.getElementById(orderid).value
    changeStatus(userid,token,orderid,status)
}






module.exports = {
    getAllOrdersListener : getAllOrdersListener,
    changeStatusListener : changeStatusListener
}