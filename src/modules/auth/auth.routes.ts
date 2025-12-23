import { Request, Response, Router } from "express";
import { pool } from "../../config/db";
import { authControler } from "./auth.controler";
 
const router =Router();
router.post("/signup",authControler.singupUser);
 router.post("/signin",authControler.SinginUser )
export const authRouter = router;