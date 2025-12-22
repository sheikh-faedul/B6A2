import { pool } from "../../config/db"


const getUser = async()=>{
const result = await pool.query(`
    SELECT * FROM users
    `)
    return result
}

const updateUser =async( name:string,email:string,password:string,phone:string,id:string )=>{
     
 const result =  await pool.query(`
    UPDATE users SET name=$1,email=$2,password=$3,phone=$4 WHERE id=$5 RETURNING *
    `,[name,email,password,phone,id])
    return result;
}

const deleteUser =async(id:string)=>{
      const result = await pool.query(`
    DELETE FROM users WHERE id=$1
    `,[id])
    return result
}

export const customerServices ={
    getUser,
    updateUser,
    deleteUser
}