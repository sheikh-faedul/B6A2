import { pool } from "../../config/db"

const createBookings = async (payload: Record<string, unknown>) => {
    const { customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date } = payload;
    const result = await pool.query(`
        INSERT INTO bookings(customer_id,
  vehicle_id,
  rent_start_date,
  rent_end_date) VALUES($1,$2,$3,$4) RETURNING *
        `, [customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date])
    return result;
}
const getBookings = async (id: string) => {
    const result = await pool.query(`
            SELECT * FROM bookings WHERE id= $1
            `, [id])
    return result;
}
const updateBookings = async (status: string, id: string) => {
    const result = await pool.query(`
            UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *
            `, [status, id])
    return result
}
export const bookingService = {
    createBookings,
    getBookings,
    updateBookings
}