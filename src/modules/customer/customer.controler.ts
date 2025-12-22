import { Request, Response } from "express";
import { customerServices } from "./customer.service"

const getUser =async(req:Request,res:Response)=>{
try{
  const result = await customerServices.getUser();
    res.status(200).json({
        success:true,
        message:'data retrived successfully',
        data:result.rows
    })
}catch (err:any) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

const updateUser =async(req:Request,res:Response)=>{
    const{name,email,password,phone}=req.body
    try{
         const result = await customerServices.updateUser(name,email,password,phone,req.params.id as string)

    if(result.rows.length === 0){
         res.status(404).json({
        success:false,
         message: 'User not found',
    })
    }
    else{
        res.status(200).json({
            success:true,
            message:'User updates successfully',
            data:result.rows[0]
        })
    }
    }catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
            
        })
    }
 
}

const deleteUser =async(req:Request,res:Response)=>{
     try{
         const result = await customerServices.deleteUser(req.params.id as string)
    if(result.rowCount === 0){
         res.status(404).json({
        success:false,
         message: 'User not found',
    })
    }
    else{
        res.status(200).json({
            success:true,
            message:'User deleted successfully',
            data:result.rows
        })
    }
    }catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
            
        })
    }
 
}

export const customerColtroler={
    getUser,
    updateUser,
    deleteUser
}