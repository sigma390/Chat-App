import express, { Request, Response, Router } from "express";

export const login = async (req: Request, res: Response) => {
    res.send('Login endpoint');
};

export const signup = async  (req: Request, res: Response)=> {
    try{
        const{fullname, username, password, confirmPass, gender} = req.body;

    }
    catch(error)
    {

    }


    

   
};

export const logout = (req:Request, res:Response)=>{
    res.send("logout Endpoint");
}