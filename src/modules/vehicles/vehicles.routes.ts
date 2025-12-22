import { Router } from "express";
import { vehiclesControler } from "./vehicles.controler";

const router = Router();

router.post("/",vehiclesControler.createVehicles);

router.get("/",vehiclesControler.getAllVehicles);
router.get("/:id",vehiclesControler.getSingleVehicles);
router.put("/:id",vehiclesControler.updatesVehicles);
router.delete("/:id",vehiclesControler.deleteVehicles);

export const vehiclesRouter = router;