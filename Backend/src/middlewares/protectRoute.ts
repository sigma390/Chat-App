import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user.model";
export const secret = process.env.JWT_SECRET as string ;

export const protectRoute = async (req: any, res: Response, next:any)=>{
    try {
        //get token from Cookies
        const token = req.cookies.JWT;
        if(!token){
            return res.status(401).json({ message: "Not Authenticated !!!"})
        }
        //if theres Token verify using JWT and Find the User in db 
        const decoded = jwt.verify(token,secret) as JwtPayload;
        if (!decoded) {
           return res.status(401).json({ message: "No token found!!!"});
        }
       
        const user = await User.findById(decoded.userId).select("-password");
        //if user not there
        if (!user) {
            return res.status(400).json({ message: "user not found"});
        }

        req.user = user; //authenticated user
        //call next function
        next();


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Not Authenticated !!!"})
    }
}