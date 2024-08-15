

import express, { Request, Response, Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller";
import sendMessage from "../controllers/message.controller";
import { protectRoute } from "../middlewares/protectRoute";

const router = express.Router();

router.post("/send/:id",protectRoute, sendMessage );



export default router;
