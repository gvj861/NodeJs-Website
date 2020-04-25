const {ProductCart} = require('../models/order.model')
const Product = require('../models/product.model')






const getCartById = (req,res,next,cartid) => {

    ProductCart.findById(cartid)
    .exec( (err,cartObj) => {

        if (err || !cartObj){
            res.status(400).json({status : "fail",
                error : "item not Found"
            })
        }
        req.cart = cartObj
        next()
    })
}

const addItemToCart = (req,res) => {

    //console.log('Upto here adding item')
    const product = req.body.id
    const productid = req.body.id


    Product.findById(product)
    .exec(
        (err,prod) => {
            if (err || !prod){
                return res.status(500).json({
                    status : 'fail',
                    error : 'Cannot add this Product right now!'
                })
            }
            const price = prod.price
            const userid = (req.profile._id).toString()
            //console.log(userid,price,product)
            var cartobj = new ProductCart({product,productid,userid,price})
            cartobj.save(
                (err,savedcart) => {
                    if (err ||!savedcart){
                        return res.status(500).json({
                            status : 'fail',
                            error : 'Cannot add the product right now'
                        })

                    }
                    return res.status(200).json({
                        status : 'success',
                        message : 'Added to Cart successfully'
                    })
                }
            )
        }
    )
    
    
}


const populateProducts = (req,res,next) => {

    const userid = req.profile._id
    ProductCart.find({userid : userid})
    .populate('product')
    .exec(
        (err,cartproducts) => {
            if (err || !cartproducts){
                return res.status(408).json({
                    status : 'fail',
                    error : 'Unable to get items in the cart ! Try again if the problem persists'
                })
            }
            //console.log(typeof(cartproducts))
            res.locals.cart = cartproducts
            req.cartcheckout = cartproducts // Using this for checkout Payments
            next()
    }
    )
}


const getCart = (req,res) => {

    res.status(200).render('getcartpage')
    //console.log(res.locals.cart)
}



const removeItem = (req,res) => {
    
    var item = req.cart
    item.remove(
        (err,delitem) => {

            if (err){
                return res.status(400).json({status : "fail",
                    error : "Cannot remove from the cart!!"
                })
            }

            return res.status(200).json({ status : "success",
                message : `Removed from the cart`
            })

        }
    )
}

// using two models at the same time
const updateCount = (req,res) => {

    var cart = req.cart
    const {quantity} = req.body
    var productid = cart.productid
    //console.log(cart,quantity,productid)
    Product.findById(productid)
    .exec(
        (err,prodobj) => {

            if (err || !prodobj){
                return res.status(400).json({status : "fail",
                    error : "Currently not able to process the request for this product"
                })

            }
            const stock = prodobj.stock
            if (quantity+10 > stock ){
                return res.status(400).json({status : "fail",
                    error : "Quantity entered exceeds our Stock.Try again"
                })
            }
            cart.count = quantity
            cart.save(
                (err,cartobj) => {
                    if (err || !prodobj){
                        return res.status(400).json({status : "fail",
                            error : "Not able to change the Quantity! Sorry!!"
                        })
        
                    }
                    return res.status(200).json({
                        status : 'success',
                        message : 'Count updated'
                    })
                }
            )
        }
    )
    

}


const checkDuplicates = (req,res,next) => {

    const productid = req.body.id
    const userid = (req.profile._id).toString()
    ProductCart.find({userid,productid})
    .exec(
        (err,cartobj) => {
            //console.log(cartobj.length)
            if (err || cartobj.length != 0) {    // if cartobj is there means its a duplicate so No
                    return res.status(400).json({
                        status : 'fail',
                        error : 'Duplicate items cannot be added'
                    })
                }
            next()
            }
    )
}



const emptyAll = (req,res,next) => {

    const userid = (req.profile._id).toString()
    ProductCart.deleteMany({userid : userid},{useFindAndModify : false,new : true})
    .exec(
        (err,delprods) => {

            if (err || !delprods) {
                return res.status(500).json({
                    status : 'fail',
                    error : 'Problem making Cart Empty'
                })
            }
            next()
        }
    )
    

}


module.exports = {
    addItemToCart : addItemToCart,
    populateProducts : populateProducts,
    getCart : getCart,
    getCartById : getCartById,
    removeItem : removeItem,
    updateCount : updateCount,
    checkDuplicates : checkDuplicates,
    emptyAll : emptyAll
}
