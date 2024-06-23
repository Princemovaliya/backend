//require('dotenv').config({path:`./env`})
import {app} from './app.js'
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
dotenv.config({
    path: './env'
}) 
 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,   
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
});
connectDB()
.then(()=>{
    app.listen(process.env.PORT ||  8000,() =>{
        console.log(`SERVER IS RUNNING AT PORT ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDb connection fail",err);
})














/*
import express from "express"
const app = express()

(async ()=>{
    try {
         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_name}`)
         app.on("error",(error)=>{
            console.log("ERROR:",error);
            throw error
         })

         app.listen(process.env.PORT,()=>{
            console.log(`App is listen on port ${process.env.PORT}`);
         })
    } catch (erroe) {
        console.log("ERROR:",error)
        throw err
    }
})()
*/
