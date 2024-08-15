import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import connectmongo from './db/connect';
import Authroutes from "./routes/Auth";
import Messageroutes from "./routes/Message.routes";
// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());


//root route 


app.use("/api/auth" , Authroutes);
app.use("/api/messages" , Messageroutes);
app.use("/", (req:Request, res:Response) => {
    res.json({
        message :"Its Homepage"
    })

})


// Start the server
app.listen(port, () => {
    connectmongo();
    console.log(`Server started on port ${port}`);
});