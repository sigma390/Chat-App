

import express, { Request, Response, Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller";
import sendMessage, { getMessages } from "../controllers/message.controller";
import { protectRoute } from "../middlewares/protectRoute";

const router = express.Router();

router.post("/send/:id",protectRoute, sendMessage );
router.get("/:id",protectRoute, getMessages );


export default router;
