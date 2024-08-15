
import express, { Request, Response, Router } from "express";
import User from "../models/user.model";


const sendMessage = async  (req:Request, res:Response) => {
    res.status(200).json("Message sent");
}
export default sendMessage;