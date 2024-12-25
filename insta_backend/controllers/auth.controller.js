import { userModel } from '../models/user.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'


const generateAccessAndRefreshToken = async(userId) =>{
   try {
    const user = await userModel.findById(userId) 
    const accessToken = jwt.sign(
        {
            _id:user._id,
            username: user.username,
            email: user.email
        },
        "XLU5jTe3cVOCcQuP0mEhjqIFt4MzWg51HaPm4UXNl", {
            expiresIn: '1d'
        }
    )
    const refreshToken = jwt.sign({
        _id: user._id
    },
    "CI6MTcyMDAxNTk0NCwiaWF0IjoxNzIwMDE1O", {
        expiresIn: '7d'
    }
)

    user.refreshToken = refreshToken;
    await user.save({validateBeforeSave: false})


    return {accessToken, refreshToken}
   } catch (error) {
    console.log("Some Problem")
   }
}


export const registerUser = async(req, res) =>{
    try {

        const { username, fullname, email, description, password } = req.body;

        if(
            [username, fullname, email, password].some((fields)=>fields?.trim() === "")
        ){
            return res.status(400)
            .json({status: 400, message:"All fields are required."})
        }

        const existUser = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if(existUser){
            return res.status(409)
            .json({status:409, message:"User with email or username already exist"})
        }
        

        const profilePicPath = req.files?.profilepic[0].path;

        if(!profilePicPath){
            return res.status(400)
            .json({status:400, message:"Profile Pic is required."})
        }
        
        const profilepic = await uploadOnCloudinary(profilePicPath);

        const user = await userModel.create({
            username: username.toLowerCase(),
            fullname,
            email,
            description,
            password,
            profilepic: profilepic?.url
        })
       

        const createdUser  = await userModel.findById(user._id).select(
            "-password -refreshToken"
        )

        if(!createdUser){
            return res.status(500)
            .json({status:500, message:"Something went wrong whilte registering the user."})
        }

        return res.status(201).json(
            {
                status:201,
                message:"User Register successfully",
                result: createdUser
            }
        )
        
    } catch (error) {
        
    }
}


export const login = async(req, res) =>{
    try {
        
        let { email, username, password } = req.body;

        if(!(email || username)){
            return res.status(400)
            .json({message:"username or email is required."})
        }

        const user = await userModel.findOne({
            $or: [{username}, {email}]
        })

        if(!user){
            return res.status(404)
            .json({message:"User doe's not exist."})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(401)
            .json({message:"Invalid Password."})
        }
         
        let {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

        const loggedInUser = await userModel.findById(user._id).select("-password -refreshToken")

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json({status:200, result: loggedInUser, accessToken, refreshToken,
            message:"User logged In Successfully"
         })

    } catch (error) {
        return res.status(500)
        .json({message:"Server Error."})
    }
}

export const logout = async(req, res) =>{
    try {
        await userModel.findByIdAndUpdate(
            req.user._id,
            {
                $set: {
                    refreshToken: ""
                }
            },
            {
                new: true
            }
        )

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({message:"User Logged out."})

    } catch (error) {
        res.status(500)
        .json({message:"Server Error"})
    }
}