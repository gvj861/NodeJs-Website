
// this file is totally for grabbing buttons and call the function that renders response


import '@babel/polyfill';


//AUTH
import {LoginListener,LogoutListener,
  SignupListener,ForgotPasswordListener,
  ResetPasswordListener,GetForgotPasswordListener,GetLoginListener,GetSignupListener} from './auth/authListeners'

// ADMIN PAnel

import {getAdminPanelListener} from './admin/getAdminPanelListener'

// ADMIN _CATEGORIES
import {getAllCategoriesListener,getCategoryUpdateListener,doCategoryUpdateListener,createCategoryListener,deleteCategoryListener} from './admin/categories/categoryListener'


//ADMIN_Products

import { getAllProductsListener , getCreateProductListener , doCreateProductListener , uploadProductPhotoListener,deleteProductListener,getProductUpdateListener , doProductUpdateListener} from "./admin/products/productListener";



// ADMIN_ORDERS

import {getAllOrdersListener,changeStatusListener} from './admin/AdminOrders/adminOrderListener';



// USER_SETTINGS

import { getAccountPageListener , changePasswordListener,uploadUserPhotoListener} from './user/Settings/SettingsListener';

// USER_CART
import {addItemToCartListener , getCartPageListener , removeFromCartListener ,applyQuantityListener} from './user/Cart/CartListener';


// USer_Orders

import {getMyOrdersListener,getMyPurchasesListener} from './user/Orders/OrderListener'


//Payment_Things

import {doCheckoutListener} from './Payment/paymentlistener'


//Filtering home//

// Using simple get request by assiging without axios
// adding both listener and grabbing here


var filterasrequired = document.getElementById('filterasrequired')

if(filterasrequired){
  
  filterasrequired.addEventListener('click',(e)=>{

  e.preventDefault();
  var sortParameter = document.getElementById('sortby').value
  var sortOrder = document.getElementById('type').value
  //filterHome(sortParameter,sortOrder)
  location.assign(`/gvj-api?sortParameter=${sortParameter}&sortOrder=${sortOrder}`)


})
}



//Filtering Home Ends

// About US

// added in href

// AboutUs ends

// Getting Profile Page  -- Patch up work
import {getMyProfileListener} from './user/Settings/SettingsListener';
var getmyprofile = document.getElementById('getmyprofile')
if (getmyprofile){
  getmyprofile.addEventListener('click',getMyProfileListener)
}




// Profile_page Ends


// AUTH__SECTION
var signup = document.getElementById('signup')
var login = document.getElementById('login')
var logout = document.getElementById('logout')
var forgotpassword = document.getElementById('forgotpassword')
var resetpassword = document.getElementById('resetpassword')
var getforgotpassword = document.getElementById('getforgotpassword')
var getlogin = document.getElementById('getlogin')
var getsignup = document.getElementById('getsignup')
//AUTH__SECTION-----ENDS


// ADMIN_SECTION

//categories
var getallcategories = document.getElementById('getallcategories')

var getcategoryupdate = document.querySelectorAll('#getcategoryupdate')// has an array now

var deletecategory = document.querySelectorAll('#deletecategory')


var docategoryupdate = document.getElementById('docategoryupdate') 

var createcategory = document.getElementById('createcategory')
//categories__ends

//products

var getallproducts = document.getElementById('getallproducts')

var getcreateproduct = document.getElementById('getcreateproduct')

var docreateproduct = document.getElementById('docreateproduct')

var uploadproductphoto = document.querySelectorAll('#uploadproductphoto')

var deleteproduct = document.querySelectorAll('#deleteproduct')

var getproductupdate = document.querySelectorAll('#getproductupdate')

var doproductupdate = document.getElementById('doproductupdate')

//product_ends

// Getting Admin Panel 

var getpanel = document.getElementById('getpanel')

// Ending Admin Panel

// Admin Order__sec

var getallorders = document.getElementById('getallorders')

var changestatus = document.querySelectorAll('#changestatus')


// Admin Order_sec Ends

//ADMIN__SECTION ENDS



// USER_SECTION

// Settings

// not used this button due to SPA
var usersettings = document.getElementById('usersettings')

var changepassword = document.getElementById('savepassword')

var uploaduserphoto = document.getElementById('uploaduserphoto')

// Settings_end

// Cart Adding


var additemtocart = document.querySelectorAll('#additemtocart')
var getmycart = document.getElementById('getmycart')
var removefromcart = document.querySelectorAll('.fa-trash-o')
var applyquantity = document.querySelectorAll('#apply')

// Cart_ENDS

// Order_of User

var getmyorders = document.getElementById('getmyorders')
var getmypurchases = document.getElementById('getmypurchases')

// var filterorders = document.getElementById('filterorders')

// if(filterorders){
//   filterorders.addEventListener('click',getMyOrdersListener)
// }

// Order_ends

// USER_SECTION ENDS

// Payment Section


var checkout = document.getElementById('checkout')



// Payment Ends



//-1
if (signup)
{
    signup.addEventListener('click',SignupListener);
}

if (login)
{
  login.addEventListener('click',LoginListener);
}

if (logout)
{
  logout.addEventListener('click',LogoutListener);
}

if (forgotpassword)
{
  forgotpassword.addEventListener('click',ForgotPasswordListener);
}

if (resetpassword)
{
  resetpassword.addEventListener('click',ResetPasswordListener);
}

if (getforgotpassword)
{
  getforgotpassword.addEventListener('click',GetForgotPasswordListener);
}

if (getlogin)
{
  getlogin.addEventListener('click',GetLoginListener);
}

if (getsignup)
{
  getsignup.addEventListener('click',GetSignupListener);
}
// -11


//-2


if (getallcategories){
  getallcategories.addEventListener('click',getAllCategoriesListener)
}

if (getcategoryupdate){ // so imp because there would be many update buttons i.e now
  // choosing the one which we clicked
  getcategoryupdate.forEach(cat => {
    cat.addEventListener('click',getCategoryUpdateListener)
  })
}

if (docategoryupdate){
  docategoryupdate.addEventListener('click',doCategoryUpdateListener)
}

if (createcategory)
{
  createcategory.addEventListener('click',createCategoryListener)
}


if (deletecategory){
  deletecategory.forEach(cat => {
    cat.addEventListener('click',deleteCategoryListener)
  })
}

// -22


// -3



if (getallproducts){
  getallproducts.addEventListener('click',getAllProductsListener)
}


if (getcreateproduct){
  getcreateproduct.addEventListener('click',getCreateProductListener)
}

if (docreateproduct){
  docreateproduct.addEventListener('click',doCreateProductListener)
}

if (uploadproductphoto){
  uploadproductphoto.forEach(upload => {
  upload.addEventListener('click',uploadProductPhotoListener)
  }
  )
}

if (deleteproduct){
  deleteproduct.forEach(delprod => {
    delprod.addEventListener('click',deleteProductListener)
  })
}

if (getproductupdate){
  getproductupdate.forEach(prod => {
    prod.addEventListener('click',getProductUpdateListener)
  })
}

if (doproductupdate){
  doproductupdate.addEventListener('click',doProductUpdateListener)
}

// TODO CHANGE ORDER STATUS

// Orders here

if(getallorders){
  getallorders.addEventListener('click',getAllOrdersListener)
}

if (changestatus){
  changestatus.forEach(status => {
    status.addEventListener('click',changeStatusListener)
  }
  )
}

// Getting Admin PAnel with security

if(getpanel){
  getpanel.addEventListener('click',getAdminPanelListener)
}

// -33





// 4


if (usersettings){
  usersettings.addEventListener('click',getAccountPageListener)
}

if (changepassword){
  changepassword.addEventListener('click',changePasswordListener)
}

if (uploaduserphoto){
  uploaduserphoto.addEventListener('click',uploadUserPhotoListener)
}


// -44


// 5


if (additemtocart){
  additemtocart.forEach(item => {
    item.addEventListener('click',addItemToCartListener)
  })
}

if (getmycart){
  getmycart.addEventListener('click',getCartPageListener)
}

if (removefromcart){
  removefromcart.forEach(item => {
    item.addEventListener('click',removeFromCartListener)
  })
}



if (applyquantity) {
  applyquantity.forEach( quantity => {
    quantity.addEventListener('click',applyQuantityListener)
  })
}


//--55


// -6


if (checkout){
  checkout.addEventListener('click',doCheckoutListener)
}


// -66

// -7


if (getmyorders){
  getmyorders.addEventListener('click',getMyOrdersListener)
}

if (getmypurchases){
  getmypurchases.addEventListener('click',getMyPurchasesListener)
}



// --77