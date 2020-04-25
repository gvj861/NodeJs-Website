
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)


const getCheckoutSession = (req,res) => {


    // Array of objects needs to be created for the Line_items Page
    // we have the req.cartcheckout having all details
    // and req.profile for user details

    var items = []
    for (i of req.cartcheckout){

        var obj = {
            name : i.product.name,
            description : i.product.description,
            images : [i.product.photo],
            amount : i.product.price * 100 ,
            currency : 'INR',
            quantity : i.count


        }
        items.push(obj)
    }

// if the purchase is sucesss -- 
// Create Order
// update user purchase cart with the order
// delete the items in the cart for that particular user
// update Inventory

// Last step could be updating the orderstatus -- done by Admin

// for a bit security the success_url is modified with a query String that has all the details to make up an order

// i am making a successurl as consumable for middleware and then redirect to home with a booking successful message
try {
    stripe.checkout.sessions.create({

        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/gvj-api/order/create/${req.cartcheckout[0].userid}`,
        cancel_url: `${req.protocol}://${req.get('host')}/gvj-api/cart/${req.profile._id}/${req.profile.salt}`,
        customer_email: req.profile.email,
        client_reference_id: req.cartcheckout[0].userid,

        line_items: items


    })
    .then(
        (session) => {
            return res.status(200).json({
                status : "success",
                data: {
                    session
                } 
            })
        }

    )
    .catch( (err) => {
        return res.status(500).json({
            status : "fail",
            error : err
        })

    })
    
    

}

catch (err) {

    return res.status(500).json({
        status : "fail",
        error : err
    })
}

}












module.exports = {
    getCheckoutSession : getCheckoutSession
}