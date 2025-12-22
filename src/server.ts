import express, { request, Request, Response } from 'express'
 import config from './config';
import initDB, { pool } from './config/db';
import { authRouter  } from './modules/auth/auth.routes';
import { customerRouter } from './modules/customer/customer.routes';
import { vehiclesRouter } from './modules/vehicles/vehicles.routes';
import { bookingsRouter } from './modules/bookings/bookings.routes';



const app = express();
const port = config.port;

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




app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'this is root route',
        path: req.path
    })
})

app.listen(5000, () => {
    console.log(`server is running ${port}`)
})