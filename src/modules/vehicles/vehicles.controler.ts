import { Request, Response } from "express";
import { vehiclesService } from "./vehicles.service";

const createVehicles =async(req:Request,res:Response)=>{
   const {vehicle_name,type,registration_number,daily_rent_price,availability_status}=req.body;
   try{
     const result = await vehiclesService.createVehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status);
        res.status(201).json({
            success:true,
            message:'Vehicle created successfully',
            data:result 
        })
   }catch(err:any){
    res.status(500).json({
        success:false,
        message:err.message
    })
   }
}

const getAllVehicles =async(req:Request,res:Response)=>{
    try{
        const result = await vehiclesService.getAllVehicles();
         if(result.rows.length === 0){
         res.status(404).json({
        success:true,
         message: "No vehicles found",
         data:result.rows 
    }) }
    else{
          res.status(200).json({
        success:true,
        message:"Vehicles retrieved successfully",
        data:result.rows
    }) }
           
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
 }

 const getSingleVehicles = async(req:Request,res:Response)=>{
    
         try{
              const result = await vehiclesService.getSingleVehicles(req.params.id as string)
                res.status(200).json({
         success:true,
         message:"Vehicles retrieved successfully",
         data:result.rows[0]
     })
         }catch(err:any){
              res.status(500).json({
             success: false,
             message: err.message
         })
         }
  }

  const updatesVehicles =async(req:Request,res:Response)=>{
     const {availability_status}=req.body;
    try{
           const result = await vehiclesService.updatesVehicles(availability_status,req.params.id as string)
  
      if(result.rows.length === 0){
           res.status(404).json({
          success:false,
           message: 'vehicles not found',
      })
      }
      else{
          res.status(200).json({
              success:true,
              message:'vehicles updates successfully',
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

  const deleteVehicles =async(req:Request,res:Response)=>{  
 try{
     const result = await vehiclesService.deleteVehicles(req.params.id as string );
    if(result.rowCount === 0){
         res.status(404).json({
        success:false,
         message: 'Vehicles not found',
    })
    }
    else{
        res.status(200).json({
            success:true,
            message:'Vehicles deleted successfully',
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

export const vehiclesControler={
    createVehicles,
    getAllVehicles,
    getSingleVehicles,
    updatesVehicles,
    deleteVehicles
}