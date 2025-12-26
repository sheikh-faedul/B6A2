import { pool } from "../../config/db"


const getUser = async () => {
  
    const result = await pool.query(`
    SELECT * FROM users
    `)
    return result.rows
}

const updateUser = async (name: string, role: string, tokenID: string, id: string) => {
 
    if(role === "admin"){
       const result = await pool.query(`
       UPDATE users SET name=$1 WHERE id=$2 RETURNING *
     `, [name, id])
     return result
    }

    if(role=== "customer" && tokenID === id){
        const update = await pool.query(`
             UPDATE users SET name=$1 WHERE id=$2 RETURNING *
            `,[name,id]);
          return update.rows[0]  
    }
    throw new Error("Unauthorizes");

  



}

const deleteUser = async (id: string) => {
const  bookingStatus  = await pool.query(`
    SELECT status FROM bookings WHERE id=$1
    `,[id]);
    const isActiveBooking=bookingStatus.rows[0].status;
    if(isActiveBooking === 'active'){
        throw new Error("user booking is active")
    }
    const result = await pool.query(`
    DELETE FROM users WHERE id=$1
    `, [id])
    return result.rows[0]
}

export const customerServices = {
    getUser,
    updateUser,
    deleteUser
}