const Product = require('../models/product.model')


const formidable = require('formidable')

const getProductById = (req,res,next,productid) => {

    Product.findById(productid)
    .populate('category')  // fill all details of the categoryID present 
    .exec(
        (err,productObj) => {
            if (err || !productObj) {
                return res.status(400).json({ status : "fail",
                    error : "Cannot get the Product by this id"
                })
            }

            req.product = productObj  // populating whole product obj in the req as usual
     
            next()
        }
    )

}

const createProduct = (req,res) => {

    const newProd = Product(req.body)

    newProd.save(
        (err,prod) => {
            if (err || !prod) {
                return res.status(400).json({
                    status : "fail",
                    error : "Failed to create Product"
                })
            }
            return res.status(200).json({
                status : "success",
                message : prod
            })
        }
    )

}



const getProduct = (req,res) => {

    return res.status(200).json(req.product)
}




const updateProduct = (req,res) => {

    const {name , description , price , sold , stock ,discount} = req.body

            let product = req.product
            // updation wrote manually
            product.name = name || product.name
            // if name is there it would be replaced else remains same
            product.description = description || product.description
            product.price = price || product.price
            product.stock = stock || product.stock
            product.sold = sold || product.sold
            product.discount = discount || product.discount // added new point of discount in the product

            // saving to DB

            product.save(
            (err,prod) => {
                if (err || !prod) {
                    return res.status(400).json({
                        status : "fail",
                        error : 'Product not Updated'
                    })
                }

                return res.status(200).json({
                    status : "success",
                    message : prod })
            }
            )
}



const deleteProduct = (req,res) => {

    var product = req.product // holding the object 

    product.remove(

        (err,delproduct) => {

            if (err) {
                return res.status(400).json({status : "fail",
                    error : "Cannot delete Product"
                })
            }
            return res.status(200).json({ status : "success",
                message : `${delproduct.name} is deleted successfully`
            }) 
        }
    )


}




// listing Products

const getAllProducts = (req,res,next) => {  // public home page products

var mylimit = req.query.mylimit ? parseInt(req.query.mylimit) : 30 // default products would be 8
// limit should be a Number and in Query PArameter its a string
// so parseInt is used 


var sortParameter = req.query.sortParameter ? req.query.sortParameter : 'createdAt'

var sortOrder = req.query.sortOrder ? req.query.sortOrder : 'desc'

//console.log(mylimit)
// provided default things if user doesn't specify anything


// a basic get all function is written here 
    Product.find({})

    // 1st needs to remove the photo here so select('-photo') -- that would send everything except photo
    .populate("category",'name') // populates the details there of that category
    .limit(mylimit)
    .sort([[sortParameter , sortOrder]])
    .exec ( (err,allProd) => {

            if (err || !allProd){
                return res.status(400).json({
                    error : "Products Not Found"
                })
            }
            // 
            // will be some restrictions here

           //console.log(allProd)
           // return res.status(200).json({status : "success",message : allProd})
             res.locals.product = allProd
             next()
        })
        
    
}


const getAllProductsAdmin = (req,res) => {

    var mylimit = req.query.mylimit ? parseInt(req.query.mylimit) : 10 // default products would be 8
    // limit should be a Number and in Query PArameter its a string
    // so parseInt is used 
    
    
    var sortParameter = req.query.sortParameter ? req.query.sortParameter : 'createdAt'
    
    var sortOrder = req.query.sortOrder ? req.query.sortOrder : 'desc'
    
    //console.log(mylimit)
    // provided default things if user doesn't specify anything
    
    
    // a basic get all function is written here 
        Product.find()
    
        // 1st needs to remove the photo here so select('-photo') -- that would send everything except photo
        .populate('category') // populates the details there of that category
        .limit(mylimit)
        .sort([[sortParameter , sortOrder]])
        .exec ( (err,allProd) => {
    
                if (err || !allProd){
                    return res.status(400).json({
                        error : "Products Not Found"
                    })
                }
                //console.log(allProd)
                //return res.status(200).json({status : "success",message : allProd})
                res.status(200).render('getProducts',{product : allProd})
            })
            
        
    }
    
    



// stock and sold needs to be updated for every order
// this would be a middleware 

// for each order there could be many products so
// need to loop through

const updateInventory = (req,res,next) => {

    // for (eachProduct of req.body.order.products) {

    // }
    // lets use arrow function

    // using the same req.cartcheckout from populating products in cart here
    var products = req.cartcheckout
    products.forEach( eachProduct => {

        Product.findByIdAndUpdate(eachProduct.productid,
            {$inc : {sold : +eachProduct.count, stock : -eachProduct.count}},{new : true , useFindAndModify : false}
        ,
            (err,updatedproduct) => {   // p as we don't use that updated result
                if (err){
                    return res.status(400).json({status : "fail",
                        error : "Inventory Update Failed"
                    })
                }
                //console.log(updatedproduct)
                 
            }
        );
    }
    )
    next()

}



// new method to learn

// getting all distinct categories or distinct things

// this is already there in Category Controller 

// just a new method


// // Using this for EJS
// const getAllUniqueCategories = (req,res,next) => {

//     // MOdel.distinct ( "propertyname",ConfigOptions) fromwhich it selects all distinct things/values
//     Product.distinct("category",{},
//     (err,allcategories) => {

//         if (err){

//             return res.status(400).json({ status : "fail",
//                 error : "CAnnot get Distinct Categories"
//             })

//         }

//         // return res.status(200).json({status : "success", message : allcategories})
//         res.locals.category = allcategories
//         console.log(allcategories)
//         next()


//     })


// }



// uploading Product Photos same as users

// first creating product and having default photos

// then uploading new ones

const productUpload = (req,res) => {

    var product = req.product

    var form = new formidable.IncomingForm({multiples : false});
    form.keepExtensions = true
    form.uploadDir  = `${require('../config_paths')}/public/img/products`
    // form.multiples = true
    form.on('fileBegin',function(name,file){
        file.name = `${product._id}-${Date.now()}.${file.name.split('.')[1]}`
        file.path = form.uploadDir+'/'+ file.name
        
    })
    .on('file',function(name,file){

        if (file.size  < 5){
            return res.status(400).json({
                error : "No file selected"
            })
        }
        if (!(file.type.split('/')[0] == 'image') || !(file.size <= 4*1024*1024)){
            return res.status(400).json({
                error : `Problem with the uploaded file ${ 'Not a Valid File'}`
            })
        }

    
    

    
    product.photo = `/img/products/${file.name}`
    
    product.save(
        (err,Saved_prod) => {
            if (err || !Saved_prod){
                return res.status(400).json({
                    error : "Cannot Save the image Server Error"
                })
            }
            return res.status(200).json({
                status : "success",
                message : Saved_prod
            })
        })
        

    })
    form.parse(req)
        
        
}













module.exports = {

    getProductById : getProductById,

    createProduct : createProduct,

    getProduct : getProduct,

    updateProduct : updateProduct,

    deleteProduct : deleteProduct,

    getAllProducts : getAllProducts,

    updateInventory : updateInventory,

    // getAllUniqueCategories : getAllUniqueCategories,

    productUpload : productUpload,

    getAllProductsAdmin : getAllProductsAdmin

}