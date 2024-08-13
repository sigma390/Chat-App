

import express, { Request, Response, Router } from "express";
import { login, logout, signup } from "../controllers/auth.controller";

const router = express.Router();


router.get('/login',login)

router.get("/signup",signup )

router.get("/logout", logout) 



export default router;