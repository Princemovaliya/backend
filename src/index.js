//require('dotenv').config({path:`./env`})
import {app} from './app.js'
import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path: './env'
})


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
