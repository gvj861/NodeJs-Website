import {getAllCategories,getCategoryUpdate,doCategoryUpdate,createCategory,deleteCategory} from './categoryHelper'

const token = localStorage.getItem('token')
const userid = localStorage.getItem('userid')

const getAllCategoriesListener = (e) => {
    e.preventDefault();
    
    getAllCategories(token,userid)
}



const getCategoryUpdateListener = (e) => {
    e.preventDefault();
    //console.log(e.target.name)
    getCategoryUpdate(e.target.name,token,userid)
    
      // need details of the product
    // so will call get Category by id here
}


const doCategoryUpdateListener = (e) => {
    e.preventDefault()

    const id = document.getElementById('docategoryupdate').name
    const name = document.getElementById('categoryname').value
    doCategoryUpdate(id,token,userid,name)
}

const createCategoryListener = (e) => {
    e.preventDefault()
    const name  = document.getElementById('createcategoryname').value
    createCategory(userid,name,token)
}



const deleteCategoryListener = (e) => {

    e.preventDefault();
    deleteCategory(e.target.name,token,userid)
    
}



module.exports = {
    getAllCategoriesListener : getAllCategoriesListener,
    getCategoryUpdateListener : getCategoryUpdateListener,
    doCategoryUpdateListener : doCategoryUpdateListener,
    createCategoryListener : createCategoryListener,
    deleteCategoryListener : deleteCategoryListener
}