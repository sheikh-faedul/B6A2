import { Request, Response } from "express";
 import { authService,  } from "./auth.service";
import { pool } from "../../config/db";

const singupUser = async (req: Request, res: Response) => {

    try {
        const result = await authService.singupUser(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

 const SinginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query(`
        SELECT  *
       FROM users 
       WHERE email = $1, password = $2 RETURNING *`, [email, password])
        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        res.status(200).json({
            success: true,
            message: "User login successfully",
            data: result.rows[0]
        })
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }

 }

export const authControler = {
    singupUser,
    SinginUser
}