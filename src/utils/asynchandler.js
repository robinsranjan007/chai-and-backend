const asynchandler= (requesthandler) =>{
    Promise.resolve(requesthandler(req,res,next)).
    catch((err)=>next(err))
}


export {asynchandler}


//try catch method 

// const asynchandler=(fn)=>async (req,res,next)=>{

// try {
//     await fn(req,res,next)
// } catch (error) {
//     res.status(error.code||500).json({
//         success:false,
//         message:error.message
//     })
// }
// }