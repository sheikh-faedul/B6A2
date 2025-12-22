import { Router } from "express";
import { bookingsControler } from "./bookings.controler";

const router =Router();
router.post("/",bookingsControler.createBookings);
router.get("/:id",bookingsControler.getBookings);
router.put("/:id",bookingsControler.updateBookings)
export const bookingsRouter=router;