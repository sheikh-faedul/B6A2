import { pool } from "../../config/db"

type CreateBookingPayload = {
  customer_id: number;
  vehicle_id:number;
  rent_start_date: string;
  rent_end_date: string;
};

const createBookings = async (payload: CreateBookingPayload ) => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date ,
    rent_end_date,
  } = payload;

  const vehicleResult = await pool.query(
    `
    SELECT availability_status, daily_rent_price
    FROM vehicles
    WHERE id = $1
    `,
    [vehicle_id]
  );
  if (vehicleResult.rowCount === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleResult.rows[0];

  if (vehicle.availability_status !== "available") {
    throw new Error("Vehicle is already booked");
  }

  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  if (end <= start) {
    throw new Error("Invalid rental dates");
  }

  const duration =
    Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const totalPrice = duration * Number(vehicle.daily_rent_price);
  const bookingResult = await pool.query(
    `
    INSERT INTO bookings (
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice,
    ]
  );

  await pool.query(
    `
    UPDATE vehicles
    SET availability_status = 'booked'
    WHERE id = $1
    `,
    [vehicle_id]
  );

  return bookingResult.rows[0];
};

const getBookings = async (role:string,tokenId:number) => {
      
    if(role ==="admin"){
     const result = await pool.query(`
            SELECT * FROM bookings 
            `)
    return result.rows;  
     
    }
 
     if(role ==="customer" ){
       const customerBooking = await pool.query(`
        SELECT * FROM bookings WHERE customer_id =$1
        `,[tokenId])
    
        return customerBooking.rows;
     }
    throw new Error('Unauthorise')
     
}
const updateBookings = async (role:string,tokenId:number,status: string, id:string) => {
  
  const getBookings = await pool.query(`
    SELECT * FROM bookings WHERE id=$1
    `,[id]);
    
    const booking = getBookings.rows[0];

  if(role==="admin"){
    if(status !=="returned"){
      throw new Error('Admin can only mark as return')
    }
    const result = await pool.query(`
      UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *
      `,[status,id]);

       await pool.query(`
    UPDATE vehicles SET status='available' WHERE id=$1
    `,[booking.vehicle_id])
    return result.rows[0]
  }

  if(role === "customer"){

      if (booking.customer_id !== tokenId) {
      throw new Error("Forbidden: cannot cancel another user's booking");
    }

    if(status !== 'cancelled'){
      throw new Error('customer can only booking cancel')
    }
     const now = new Date();
     const startDay =new Date( booking.rent_start_date);
     if(now>=startDay){
      throw new Error('cannot cancel after booking start')
     }
     const result = await pool.query(`
      UPDATE  bookings SET status=$1 WHERE id=$2 RETURNING *
      `,[status,id])
      return result.rows[0];

  }
  throw new Error('Unauthorize')

 
}
export const bookingService = {
    createBookings,
    getBookings,
    updateBookings
}