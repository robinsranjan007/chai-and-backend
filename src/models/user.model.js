import mongoose , {Schema} from "mongoose";
import  JWT from "jsonwebtoken";
import bcrypt from "bcrypt"


const userSchema = new Schema(
{
username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim : true,
    index:true
},
email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim : true,
     
},
fullname:{
    type:String,
    required:true,
    trim : true,
    index:true
},
avatar:{
    type:String, //cloud url
    required:true,
    unique:true,
    lowercase:true,
    trim : true,
},
coverImage:{
    type:String,
    unique:true,
    lowercase:true,
    trim : true,
   
},
watchHistory:[
    {
    type:mongoose.Schema.ObjectId,
    ref:Video
    }
],
password:{
    type:String,
    required:[true,"password is required"]
},
refreshToken:{
    type:String,

}
},{
    timestamps:true
}
)


userSchema.methods.isPasswordCorrect= async function(password)
{
 return  await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken=async function(){

  return  jwt.sign(
    {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECERET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )


}
userSchema.methods.generateRefreshToken=async function(){
    return  jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET_TOKEN_SECERET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
        )
}


userSchema.pre("save",async function(next){

    if(this.isModified("password"))
    {
        this.password =bcrypt.hash(this.password,10)
        next()
    }

})



export const User = mongoose.model("User" ,userSchema)