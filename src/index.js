// require ('dotenv').config()
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";

 


dotenv.config({
    path:'./.env'
})

connectDB().then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is runnig at port ${process.env.PORT}`)
    })
}).catch((err)=>{
    console.log("mongo db failed"+err)
})




//------------FIRST APPROACH------------------------------------------------------



// import express from "express"
// const app=express()
// ;(async()=>{
//     try {
//        await moongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error",(err)=>{
//         console.log('application not able to talk to database')
//         throw err
//        })

//        app.listen(process.env.PORT,()=>{
//         console.log(`App is listening on port ${process.env.PORT}`)
//        })
//     } catch (error) {
//         console.log(error)
//     }
// })()