import {doCheckout} from './stripe';


const token = localStorage.getItem('token')
const userid = localStorage.getItem('userid')

const doCheckoutListener = (e) => 
{

    e.preventDefault();
    doCheckout(userid,token)

}

















module.exports = {
    doCheckoutListener : doCheckoutListener
}