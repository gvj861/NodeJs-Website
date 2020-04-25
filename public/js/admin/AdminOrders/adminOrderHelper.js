import axios from 'axios';


const getAllOrders = (userid,token) => {


    axios({
        headers : {
            Authorization : `Bearer ${token}`
        },
        method : 'get',
        url : `/gvj-api/checkAdmin/${userid}`,
        

    })
    .then(
        (response) => {
            console.log(response)
            if (response.data.status == 'success'){

                location.assign(`/gvj-api/getallorders*123`) // get me just all the categories
            }

        }

    )
    .catch(
        (error) => {
            if (error.response.data.error){
                console.log(error.response.data.error)
                location.assign('/gvj-api')
            }
            else{
                console.log("Internal Server Error")
            }
            
        }
    ) 

}






const changeStatus = (userid,token,orderid,status) => {

    axios({
        headers : {
            Authorization : `Bearer ${token}`
        },
        method : 'put',
        url : `/gvj-api/order/changestatus/${userid}/${orderid}`,
        data : {status}
        

    })
    .then(
        (response) => {
            console.log(response)
            if (response.data.status == 'success'){

                location.assign(`/gvj-api/getallorders*123`) // get me just all the categories
            }

        }

    )
    .catch(
        (error) => {
            if (error.response.data.error){
                console.log(error.response.data.error)
                location.assign('/gvj-api')
            }
            else{
                console.log("Internal Server Error")
            }
            
        }
    ) 






}


module.exports = {

    getAllOrders : getAllOrders,
    changeStatus : changeStatus
}