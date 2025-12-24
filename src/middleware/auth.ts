import  jwt, { JwtPayload }  from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express"
import config from '../config';


const auth =(...role:string[])=>{
    return async(req:Request,res:Response,next:NextFunction)=>{
      try{
        const tokenHeader = req.headers.authorization;
        const token =tokenHeader?.split(' ')[1];
       if(!token){
        return res.status(500).json({
            message:'user not Authenticated'
        })
       }
       const decoded =jwt.verify(token,config.jwt_secret as string)as JwtPayload
       req.user = decoded ;
       if(role.length && !role.includes(decoded.role)){
        return res.status(500).json({
            error:"you are Unauthorize"
        })
       }
          next()
      }catch(err : any){
        res.status(500).json({
            success:false,
            message:err.message
        })
      }
    }
}

export default auth