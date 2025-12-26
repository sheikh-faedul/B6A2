import { Request, Response } from "express";
 import { authService,  } from "./auth.service";
 
const singupUser = async (req: Request, res: Response) => {

    try {
        const result = await authService.singupUser(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result 
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
        const result = await authService.singinUser(email,password) 
        res.status(200).json({
            success:true,
            message: "User login successfully",
            data: result
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