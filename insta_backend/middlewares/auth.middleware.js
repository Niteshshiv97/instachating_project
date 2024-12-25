import { userModel } from "../models/user.model.js";
import jwt from 'jsonwebtoken';


export const varifyJWT = async(req, res, next) =>{
    try {
        let token = req.cookies?.accessToken || req.header('Authorization').replace("Bearer ", "");
        if(!token){
            return res.status(401)
            .json({message:"Unauthorized request"})
        }

        const decodeToken = jwt.verify(token,
            "XLU5jTe3cVOCcQuP0mEhjqIFt4MzWg51HaPm4UXNl0U"
        )

        const user = await userModel.findById(decodeToken._id).select("-password -refreshToken")

        req.user = user;
        next()

    } catch (error) {
        return res.status(500)
        .json({message:"Server Error"})
    }
}