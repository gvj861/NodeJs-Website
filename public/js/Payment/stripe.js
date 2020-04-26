import axios from 'axios'

const stripe = Stripe('pk_test_GrgDSUWd6Kb1RiYAx6LWg3Qc00KuRLu9s4');
// that is the public key

import { showAlert } from '../user/alerts';

const doCheckout = (userid,token) => {

//1. Getting the Checkout session

        axios({
            headers : {
                'Content-Type': 'application/json;charset=UTF-8',
                
                Authorization : `Bearer ${token}`
            },
            method : 'get',
            url : `/gvj-api/checkout/${userid}`
        })
        .then(
            (response) => {
                // console.log(response.data.data.session.id)

                stripe.redirectToCheckout({
                    sessionId: response.data.data.session.id
                  });
               
            }
        )
        .catch(
            (error) => {
    
                
                    // console.log(error)
                    showAlert('fail','Internal Server Error')
                    //console.log("Internal Server Error")
                
                
    
            }
        )
    

}









module.exports = {
    doCheckout : doCheckout
}