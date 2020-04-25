import axios from 'axios';

import FormData from 'form-data';


const getAllProducts = (userid,token) => {

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

                location.assign(`/gvj-api/allproducts/${userid}`) // get me just all the categories
            }

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



const getCreateProduct = (userid,token) => {

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

                location.assign(`/gvj-api/getcreateproduct`) // get me just all the categories
            }

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






const doCreateProduct = (userid,token,name,description,stock,sold,price,discount,category) => {

    axios({
        headers : {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization : `Bearer ${token}`
        },
        method : 'post',
        url : `/gvj-api/product/create/${userid}`,
        data : {name,description,stock,sold,price,discount,category}
    })
    .then(
        (response) => {

            console.log(response.data.message)
            window.setTimeout(()=> {
                location.assign(`/gvj-api/allproducts/${userid}`)
            },2000)

        }
    )
    .catch(
        (error) => {
            console.log(error.response)
            if (error.response.data.error){
                console.log(error.response.data.error)
                
            }
            else{
                console.log("Internal Server Error")
            }

        }
    )

}


const uploadProductPhoto = (userid,token,id,photo) => {

    var form = new FormData();
    form.append('photo',photo)
    console.log(photo)
    axios({
        headers : {
            'Content-Type': form.getHeaders,
            Authorization : `Bearer ${token}`
        },
        method : 'post',
        url : `/gvj-api/product/${userid}/upload/${id}`,
        data : form
    })
    .then(
        (response) => {

            console.log(response.data.message)
            window.setTimeout(()=> {
                location.assign(`/gvj-api/allproducts/${userid}`)
            },2000)

        }
    )
    .catch(
        (error) => {
            console.log(error.response)
            if (error.response.data.error){
                console.log(error.response.data.error)
                
            }
            else{
                console.log("Internal Server Error")
            }

        }
    )



}

const deleteProduct = (userid,token,id) => {


    axios({
        headers : {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization : `Bearer ${token}`
        },
        method : 'delete',
        url : `/gvj-api/product/${id}/${userid}`
    })
    .then(
        (response) => {

            console.log(response.data.message)
            window.setTimeout(()=> {
                location.assign(`/gvj-api/allproducts/${userid}`)
            },2000)

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




const getProductUpdate = (userid,token,id) => 
{

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

                location.assign(`/gvj-api/getupdateproduct/${id}`) // get me just all the categories
            }

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

const doProductUpdate = (userid,token,id,name,description,stock,sold,price,discount) => {

    axios({
        headers : {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization : `Bearer ${token}`
        },
        method : 'put',
        url : `/gvj-api/product/${id}/${userid}`,
        data : {name,description,stock,sold,price,discount}
    })
    .then(
        (response) => {

            console.log(response.data.message)
            window.setTimeout(()=> {
                location.assign(`/gvj-api/allproducts/${userid}`)
            },2000)

        }
    )
    .catch(
        (error) => {
            console.log(error.response)
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
    getAllProducts : getAllProducts,
    getCreateProduct : getCreateProduct,
    doCreateProduct  : doCreateProduct,
    uploadProductPhoto : uploadProductPhoto,
    deleteProduct : deleteProduct,
    getProductUpdate : getProductUpdate,
    doProductUpdate : doProductUpdate
}