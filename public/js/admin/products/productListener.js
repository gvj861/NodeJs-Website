import {getAllProducts,getCreateProduct,doCreateProduct,uploadProductPhoto,deleteProduct,getProductUpdate, doProductUpdate} from './productHelper'


const userid = localStorage.getItem('userid')
const token = localStorage.getItem('token')


const getAllProductsListener = (e) => {

    e.preventDefault();
    getAllProducts(userid,token)

}

const getCreateProductListener = (e) => {
    e.preventDefault();
    getCreateProduct(userid,token);
}







const doCreateProductListener = (e) => {

    e.preventDefault()
    const name = document.getElementById('createproductname').value
    const description = document.getElementById('createproductdescription').value
    const stock = document.getElementById('createproductstock').value
    const sold = document.getElementById('createproductsold').value
    const price = document.getElementById('createproductprice').value
    const discount = document.getElementById('createproductdiscount').value
    const category = document.getElementById('categoryname').value

    doCreateProduct(userid,token,name,description,stock,sold,price,discount,category)


}


const uploadProductPhotoListener = (e) => {

    const id = e.target.name // getting the clicked element
    const photo = document.getElementById(id).files[0]  // only _id given as id to photos--

    uploadProductPhoto(userid,token,id,photo)


}


var deleteProductListener =  (e) => {

    const id = e.target.name

    deleteProduct(userid,token,id)

}



const getProductUpdateListener = (e) => {
    e.preventDefault();
    const id = e.target.name
    getProductUpdate(userid,token,id)

}

const doProductUpdateListener = (e)=> {
    e.preventDefault();
    const id = e.target.name
    const name = document.getElementById('updateproductname').value
    const description = document.getElementById('updateproductdescription').value
    const stock = document.getElementById('updateproductstock').value
    const sold = document.getElementById('updateproductsold').value
    const price = document.getElementById('updateproductprice').value
    const discount = document.getElementById('updateproductdiscount').value
    
    doProductUpdate(userid,token,id,name,description,stock,sold,price,discount)

}



module.exports = {
    getAllProductsListener : getAllProductsListener,
    getCreateProductListener : getCreateProductListener,
    doCreateProductListener : doCreateProductListener,
    uploadProductPhotoListener : uploadProductPhotoListener,
    deleteProductListener : deleteProductListener,
    getProductUpdateListener : getProductUpdateListener,
    doProductUpdateListener : doProductUpdateListener
}