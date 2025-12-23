import { Router } from "express";
import { vehiclesControler } from "./vehicles.controler";
import auth from "../../middleware/auth";

const router = Router();

router.post("/",auth("admin"),vehiclesControler.createVehicles);

router.get("/",vehiclesControler.getAllVehicles);
router.get("/:id",vehiclesControler.getSingleVehicles);
router.put("/:id",auth("admin"),vehiclesControler.updatesVehicles);
router.delete("/:id",auth("admin"),vehiclesControler.deleteVehicles);

export const vehiclesRouter = router;