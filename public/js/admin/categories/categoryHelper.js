// first crud of category
// then crud of product

// reading means getting list of categories made
// category -- [update] [delete] -- buttons

import axios from 'axios'

const getAllCategories = (token,userid) => {

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

                location.assign(`/gvj-api/categories/${userid}`) // get me just all the categories
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



const getCategoryUpdate = (id,token,userid) => {

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

                location.assign(`/gvj-api/category/${id}`) 
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


const doCategoryUpdate = (id,token,userid,name) => {

    axios({
        headers : {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization : `Bearer ${token}`
        },
        method : 'put',
        url : `/gvj-api/category/${id}/${userid}`,
        data : {name}
    })
    .then(
        (response) => {
    console.log(response.data.message)
            // alert to be put check the reset link for reset password

            window.setTimeout(()=>{
                location.assign(`/gvj-api/categories/${userid}`)
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

const createCategory = (userid,name,token) => {

    axios({
        headers : {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization : `Bearer ${token}`
        },
        method : 'post',
        url : `/gvj-api/category/create/${userid}`,
        data : {name}
    })
    .then(
        (response) => {

            console.log(response.data.message)
            window.setTimeout(()=> {
                location.assign(`/gvj-api/categories/${userid}`)
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

const deleteCategory = (id,token,userid) => 
{

    axios({
        headers : {
            'Content-Type': 'application/json;charset=UTF-8',
            Authorization : `Bearer ${token}`
        },
        method : 'delete',
        url : `/gvj-api/category/${id}/${userid}`
    })
    .then(
        (response) => {

            console.log(response.data.message)
            window.setTimeout(()=> {
                location.assign(`/gvj-api/categories/${userid}`)
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

module.exports = {
    getAllCategories : getAllCategories,
    getCategoryUpdate : getCategoryUpdate,
    doCategoryUpdate : doCategoryUpdate,
    createCategory : createCategory,
    deleteCategory : deleteCategory
}