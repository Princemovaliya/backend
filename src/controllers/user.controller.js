import {asyncHandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../model/user.models.js"

import { Apiresponse } from "../utils/Apiresponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const registerUser = asyncHandler(async (req,res)=>{

    const {fullname,email,username,password }=req.body
    console.log("Email:", email);

    if (
        [fullname,email,username,password].some((field) => field?.trim()=== "")
     ) {
        throw new ApiError(400,"ALL FIELD ARE REQUIRE")
    }   
//chek for existing user
const existingUser = await User.findOne({email})
    if(existingUser)
        {
            throw new ApiError(409,"USER ALREADY EXIST")
        }
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;
    
    if (!avatarLocalPath) {
        throw new ApiError(400,"Avatar files is require")
        
    }
    
    

     const avatar = await uploadOnCloudinary(avatarLocalPath)
     const coverImage = await uploadOnCloudinary(coverImageLocalPath)
     
  
     if(!avatar)
        {
            throw new ApiError(400,"Avatar files is require")
        }
   const user= await User.create({
        fullname,
        avatar:avatar.url,
        coverimage:coverImage?.url ||"",
        email,
        password,
        username
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if (!createdUser) {
        throw new ApiError(500, "something went wrong  while registering the user");  
    }

    return res.status(201).json(
        new Apiresponse(200,createdUser,"sucess register")
    )
})

export {registerUser}