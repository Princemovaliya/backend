import {asyncHandler} from "../utils/asynchandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../model/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { Apiresponse } from "../utils/Apiresponse.js"

const registerUser = asyncHandler(async (req,res)=>{
    //get user detail from fronted
    //validation- not empty
    //check if user already exit:username or email
    //check for image, check for avatar
    //uplode them to cloudinary,avatar
    //create user object-create entry in DB
    //remove password  and refresh token  field from response
    //check for user creation
    //return response

    const {fullname,email,username,password }=req.body
    console.log("Email:", email);

    if ([fullname,email,username,password].some((field) => field?.trim()==="")
     ) {
        throw new ApiError(400,"ALL FIELD ARE REQUIRE")
    }   

    const exitedUser = User.findOne({
        $or: [{email},{username}]
    })
    if(exitedUser)
        {
            throw new ApiError(409,"USER ALREADY EXIST")
        }
    const avatarLocalPath=req.files?.avatar[0]?.path;
    const coverImageLocalPath=req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400,"Avatar files is require")
        
    }

     const avatar=await uploadOnCloudinary(avatarLocalPath)
     const coverImage=await uploadOnCloudinary(coverImageLocalPath)

     if(!avatar)
        {
            throw new ApiError(400,"Avatar files is require")
        }
   const user= await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url ||"",
        email,
        password,
        username:username.toLowerCase()
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