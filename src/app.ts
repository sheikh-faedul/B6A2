import express, { request, Request, Response } from 'express'
 import config from './config';
import initDB, { pool } from './config/db';
import { authRouter  } from './modules/auth/auth.routes';
import { customerRouter } from './modules/customer/customer.routes';
import { vehiclesRouter } from './modules/vehicles/vehicles.routes';
import { bookingsRouter } from './modules/bookings/bookings.routes';



const app = express();

app.use(express.json());

// DB initialiging
initDB();
// singup user register
app.use("/api/v1/auth",authRouter)

// customer/user get,put,delete 
app.use('/api/v1/users',customerRouter)

// vheichel post,get,put,delete
app.use('/api/v1/vehicles',vehiclesRouter)


//  booking post,get,put
app.use('/api/v1/bookings',bookingsRouter)


app.use((req,res)=>{
    res.status(404).json({
        success:false,
        message:"Route not found",
        data:req.path
    })
})

 

export default app