
import { Response } from 'express';
import jwt from 'jsonwebtoken';

export const secret = process.env.JWT_SECRET as string ;
const secuirity = process.env.NODE_ENV === 'production' ? true : false
const generatejwt = (userId : any ,res:Response)=>{
    const token : any = jwt.sign({ userId }, secret , { expiresIn: '1h' });
    res.cookie("JWT",token,{
        maxAge: 15*24*60*60*1000,//milisecs
        httpOnly: true, //prevent xss attacks
        sameSite: "strict", //CSRF Attacks
        secure : secuirity 

      
    });
}

export default generatejwt;