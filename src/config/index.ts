import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config ={
    connection_sting:process.env.DB_STRING,
    port: process.env.PORT,
    jwt_secret:process.env.JWT_SECRET
}

export default config;