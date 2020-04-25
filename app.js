// this would be an api which always responds in a JSON format
// lodash needs to be there even if its not used due to 
// express-validator using it
// config of variables

require('dotenv').config()

const path = require('path')     

// requiring all essentials 
const mongoose = require('mongoose')
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');

const cors = require('cors')  // for resource sharing


app.use(cors())


//setting secure HTTP headers
const helmet = require('helmet')
app.use(helmet())

const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')



// sanitizing data mWares clean up malware data

app.use(xss());

app.use(mongoSanitize());

// setting VIEW ENGINE AND PATHS

app.set('view engine','ejs')

// using nested folders in EJS
app.set('views', [path.join(__dirname, 'views'),
                      path.join(__dirname, 'views/authviews/'),
                      path.join(__dirname, 'views/adminviews/'),
                      path.join(__dirname, 'views/adminviews/ProductViews/'),
                      path.join(__dirname, 'views/adminviews/CategoryViews/'),
                      path.join(__dirname, 'views/adminviews/OrderViews/'),
                      path.join(__dirname, 'views/userviews/SettingViews/'),
                      path.join(__dirname, 'views/userviews/CartViews/'),
                      path.join(__dirname, 'views/userviews/OrderViews/'),]); 
                      //path.join(__dirname, 'views/series/')

// this is done for more dynamicity of the location of the files respective to views








// requiring routes

const authRoutes = require('./routes/auth.route')
const userRoutes = require('./routes/user.route')
const categoryRoutes = require('./routes/category.route')
const productRoutes = require('./routes/product.route')
const orderRoutes = require('./routes/order.route')
const paymentRoutes = require('./routes/payment.route')
const viewRoutes = require('./routes/view.route')
const cartRoutes = require('./routes/cart.route')

// DB connection
// all sensitive information inside .env file
mongoose.connect(process.env.DATABASEURL,{ useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }).then(()=>{                     // simple arrow function that executes if connected
      console.log("Connected to DB")
  }).catch(()=>{
      console.log(" DB Connection Error")
  })

// middlewares


//app.use(bodyParser.urlencoded({extended: true}))
app.use('/',bodyParser.json())
// basically tells the system that you want json to be used.
// it is same as urlencoded parser returns the middleware

app.use('/',cookieParser())




// SERVING STATIC FILES

app.use(express.static(path.join(__dirname,'/public')));


// css html files kept at the public folder

// path is for relative location






// routes

app.use('/gvj-api',authRoutes)  // as app.use() is a middleware

// it uses authRoutes as of now for everyrequest having '/gvj-api/anything'

app.use('/gvj-api',userRoutes) // for updating and reading user details

// category

app.use('/gvj-api',categoryRoutes) // for CRUD of categories

// products

app.use('/gvj-api',productRoutes)

// for orders

app.use('/gvj-api',orderRoutes)


// for payments 


app.use('/gvj-api',paymentRoutes)


// for rendering pages

app.use('/gvj-api',viewRoutes)


app.use('/gvj-api',cartRoutes)
// handling unhandled routes

app.all('*',(req,res)=>{
    
    data = {
        url : `${req.protocol}://${req.get('host')}/gvj-api`
    }
    res.render('notFound',data)
})


// port 
// deployment purpose
const port = process.env.PORT || 4000  // if env variable present then connect to that port

// starting server
app.listen(port,()=>{
    console.log(`Listening at port ${port}`)
})