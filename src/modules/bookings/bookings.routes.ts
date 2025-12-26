import { Router } from "express";
import { bookingsControler } from "./bookings.controler";
import auth from "../../middleware/auth";

const router =Router();
router.post("/",auth("admin","customer"),bookingsControler.createBookings);
router.get("/",auth("admin","customer"),bookingsControler.getBookings);
router.put("/:id",auth("admin","customer"),bookingsControler.updateBookings)
export const bookingsRouter=router;