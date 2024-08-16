

import express, { Request, Response, Router } from "express";
import { getUsersForSidebar } from "../controllers/user.controller";
import { protectRoute } from "../middlewares/protectRoute";
const router = express.Router();



router.get("/", protectRoute, getUsersForSidebar)


export default router;