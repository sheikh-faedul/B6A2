import { Router } from "express";
import { bookingsControler } from "./bookings.controler";
import auth from "../../middleware/auth";

const router =Router();
router.post("/",auth("admin","customer"),bookingsControler.createBookings);
router.get("/:id",bookingsControler.getBookings);
router.put("/:id",bookingsControler.updateBookings)
export const bookingsRouter=router;