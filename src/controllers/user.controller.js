import {asynchandler} from "../utils/asynchandler.js";
import {ApiError} from "../utils/Apierrors.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from  "../utils/cloudinary.js"
import { Apiresponse } from "../utils/Apiresponse.js";



const registerUser = asynchandler(async(req,res)=>{
    

    let {fullname,email,username,password} = req.body ;

    console.log(email)

if( [fullname,username,email,password].some((field)=>field?.trim() ===""))
{
throw new ApiError(400,"all fields are required")
}

const existedUser=await User.findOne({
    $or:[{username}, {email}]
})

if(existedUser)
{
    throw new ApiError(409,"user already exist")
}


 const avatarLocalPath = req.files?.avatar[0]?.path;
//  const coverImageLocalPath=req.files?.coverimage[0]?.path;
 let coverImageLocalPath

 if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    coverImageLocalPath = req.files.coverImage[0].path
}



 if(!avatarLocalPath)
 {
    throw new ApiError(400,"Avatar file is required")
 }

const avatar= await uploadOnCloudinary(avatarLocalPath)

const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if(!avatar)
{
    throw new ApiError(400,'Avatar file is required')
}


const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || " ",
    email,
    password,
    username:username.toLowerCase()
})


const createdUser= await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser)
{
throw new ApiError(500,"Something went wrong by registering the user")
}


return res.status(201).json( 
    new Apiresponse(200,createdUser,"user registered successfully")
)



})


export {registerUser}