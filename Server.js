import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import mongoose from 'mongoose';
import user_router from './router/user_router.js'
import product_router from './router/product_router.js'
import cart_router from './router/cart_router.js'
import shipping_router from './router/shipping_router.js'
import contact_router from './router/contact_router.js'
import cors from 'cors'
import instamoja_router from './router/Instamojo_router.js'
import Admin_router from './router/Admin_router.js'
import Payment_router from './router/Payment_router.js'
const app =express()

app.use(cors({
    origin:true,
    methods:["GET", "POST", "DELETE","PUT"],
    credentials:true
}))

dotenv.config()
const monogodb_URL=process.env.monogodb_URL


// mongoose.connect('mongodb://localhost:27017/gadget').then(()=>{
mongoose.connect(monogodb_URL,{dbName:"gadget"}).then(()=>{
    console.log(colors.bgGreen("mongodb connected successfully"))
    
}).catch((err)=>{
    console.log(colors.bgBlue("mongodn connectivity error",err))
})





 app.use('/api/payment/',instamoja_router)
app.use(express.json())
app.use('/api/contact',contact_router)
app.use('/api/shipping',shipping_router)
app.use('/api/user',user_router)
app.use('/api/admin',Admin_router)
app.use('/api/product',product_router)
app.use('/api/cart',cart_router)
app.use('/api/Payment',Payment_router)


const PORT=4000;

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`.red.underline)
})
