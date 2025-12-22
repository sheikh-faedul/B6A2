import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') });

const config ={
    connection_sting:process.env.DB_STRING,
    port: process.env.PORT
}

export default config;