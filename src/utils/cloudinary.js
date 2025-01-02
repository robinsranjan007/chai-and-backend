import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

 
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.COUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECERET
    });



    const uploadOnCloudinary = async (localfilepath)=>{
        try{
            if(!localfilepath) return null
            
        //upload the file on the cloudinary

    const response=  await  cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"

        })
            //file has been uploaded successfully 
            console.log("file is uploaded on cloudinary",response.url)
            fs.unlinkSync(localfilepath)
            return response;

        }catch(error){

            fs.unlinkSync(localfilepath) //remove locally saved temporary file as the upload operation failed
            return null;

        }
    }


    export {uploadOnCloudinary}