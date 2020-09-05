const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')



const app=express()
app.use(cors())
require('dotenv/config')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());

//MY routes
const authRoutes=require('./routes/auth')
const userRoute=require('./routes/user')
const categoryRoute=require('./routes/category')
const productRoute=require('./routes/product')
const orderRoute=require('./routes/order')
const stripeRoute=require('./routes/stripePayments')



const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true});
const connection=mongoose.connection;
connection.once('open',()=>{console.log('mongoDB connection established')})

//Routes
app.use('/api',authRoutes)
app.use('/api',userRoute)
app.use('/api',categoryRoute)
app.use('/api',productRoute)
app.use('/api',orderRoute)
app.use('/api',stripeRoute)

//Port
const port=process.env.PORT || 3001
app.listen(port,()=>{console.log(`server running on port ${port}`)})