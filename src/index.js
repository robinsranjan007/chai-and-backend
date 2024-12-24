// require ('dotenv').config()
import dotenv from "dotenv"
 
import connectDB from "./db/index.js";

 


dotenv.config({
    path:'./.env'
})

connectDB()




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