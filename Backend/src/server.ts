import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import connectmongo from './db/connect';
import Authroutes from "./routes/Auth.routes";
import { default as Messageroutes } from "./routes/Message.routes";
import Userroutes from "./routes/User.routes";
// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());


//root route 


app.use("/api/auth" , Authroutes);
app.use("/api/messages" , Messageroutes);
app.use("/api/userss" , Userroutes);



// Start the server
app.listen(port, () => {
    connectmongo();
    console.log(`Server started on port ${port}`);
});

