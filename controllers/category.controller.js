const Category = require('../models/category.model')

const getCategoryById = (req,res,next,categoryid) => {

    Category.findById(categoryid)
    .exec( (err,categoryObj) => {

        if (err || !categoryObj){
            res.status(400).json({status : "fail",
                error : "Category not Found"
            })
        }

        // populate category field in the req object
        // very simple concept for all the controllers who interact with
        // each other will have that field populated whenever asked with ID for further references

        // like all the information regarding this ID is there in req.category

        req.category = categoryObj

        next()

    } )

}




const createCategory = (req,res) => {

    // req.body could contain 
    const catObj = new Category(req.body)

    catObj.save(
        (err,CategoryObj) => {
            if (err || !CategoryObj) { //returns the saved detail
              return  res.status(400).json({status : "fail",
                    error : "Cannot create Category"
                })
            }
            
            // send JSON response

           return res.status(200).json({status : "success",message : "Created new Category"})
        }
    )

}

const getAllCategories = (req,res) => {
    
    Category.find()
    .exec(
        (err,allcategories) => {
            if (err || !allcategories){
                return res.status(400).json({status : "fail",
                    error : "No Categories Found"
                })
             }

             // can use user all details here [user : req.profile.firstname]
             res.status(200).render('getcategories',{category : allcategories})
            //  return res.status(200).json({status : "success",
            //  message : allcategories})
            // will render all categories now
        }
    )

}

const getOneCategory = (req,res) => {

    
    res.status(200).render('getupdatecategory',{category : req.category})

}


const updateCategory = (req,res) => {

    var category = req.category // req.category is already a object of the model

    category.name = req.body.name  // changed 

    // did in a different manner because it is a very small updation

    category.save(
        (err,updatedcategory) => {
            if (err){
                return res.status(400).json({status : "fail",
                    error : "Cannot Update Category"
                })
            }

            return res.status(200).json({status : "success",message : "Updated Successfully"})
        }
    )

    
}


// delete

const deleteCategory = (req,res) =>{

    var category = req.category

    category.remove(
        (err,delcategory) => {

            if (err){
                return res.status(400).json({status : "fail",
                    error : "Cannot Delete Category"
                })
            }

            return res.status(200).json({ status : "success",
                message : `This ${delcategory.name} is Succesfully Deleted`
            })

        }
    )
}



const getAllUniqueCategories = (req,res,next) => { // will give unique only as while saving there is no duplicate

    Category.find({},
    (err,allcategories) => {
        if (err || !allcategories){
            return res.status(406).json({status : "fail",
                    error : "Cannot get Any Category to create Product"
                })
        }

        res.locals.category = allcategories
        next()
    })
}

module.exports = {
    getCategoryById : getCategoryById,

    createCategory : createCategory,

    getAllCategories : getAllCategories,

    getOneCategory : getOneCategory,

    updateCategory : updateCategory,

    deleteCategory : deleteCategory,

    getAllUniqueCategories : getAllUniqueCategories // for EJS
}