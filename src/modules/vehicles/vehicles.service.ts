import { pool } from "../../config/db"

const createVehicles = async(vehicle_name:string,type:string,registration_number:string,daily_rent_price:number,availability_status:string)=>{
     const result = await pool.query(`
        INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *
        `,[vehicle_name,type,registration_number,daily_rent_price,availability_status])
        return result;
}
const getAllVehicles=async()=>{
 const result = await pool.query(`
            SELECT * FROM vehicles
            `)
            return result;
}

const getSingleVehicles=async(id :string)=>{
 const result = await pool.query(`
         SELECT * FROM vehicles WHERE id=$1   
         `,[id])
         return result
}

const updatesVehicles =async(daily_rent_price:number,availability_status:string,id:string)=>{
    const result = await pool.query(`
      UPDATE vehicles SET daily_rent_price=$1,availability_status=$2 WHERE id=$3 RETURNING *
      `,[daily_rent_price,availability_status,id])
      return result;
}

const deleteVehicles = async(id:string)=>{
 const result= await pool.query(`
    DELETE FROM vehicles WHERE id=$1
    `,[id])
    return result;
}
export const vehiclesService = {
    createVehicles,
   getAllVehicles,
   getSingleVehicles,
   updatesVehicles,
   deleteVehicles

}