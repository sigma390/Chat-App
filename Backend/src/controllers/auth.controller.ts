import express, { Request, Response, Router } from "express";

export const login = (req: Request, res: Response): void => {
    res.send('Login endpoint');
};

export const signup = (req: Request, res: Response): void => {
    res.send('Signup endpoint');
};

export const logout = (req:Request, res:Response)=>{
    res.send("logout Endpoint");
}