import { Request, Response } from "express";
import { bookingService } from "./bookings.service";

const createBookings = async(req:Request,res:Response)=>{
//     const{ customer_id,
//   vehicle_id,
//   rent_start_date,
//   rent_end_date}=req.body;
  try{
    const result= await bookingService.createBookings( req.body);
  res.status(201).json({
    success:true,
    message:'Booking created successfully',
    data:result.rows[0]
  })
  }catch(err:any){
    res.status(500).json({
        success:false,
        message:err.message,
    })
  }
}

const getBookings =  async(req:Request,res:Response)=>{
    try{
        const result = await bookingService.getBookings(req.params.id as string);
         res.status(200).json({
            success:true,
            message:'booking retrived successfully',
            data:result.rows[0]
         })   
    }catch(err:any){
        res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

const updateBookings =async(req:Request,res:Response)=>{
    const {status}=req.body;
    try{
        const result = await bookingService.updateBookings(status,req.params.id as string);
             
        if(result.rowCount === 0){
         res.status(404).json({
        success:false,
         message: 'bookings not found',
    })
    }
    else{
        res.status(200).json({
            success:true,
            message:'bookings updates successfully',
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
export const bookingsControler ={
    createBookings,
    getBookings,
    updateBookings
}