import { Router } from "express";
import { customerColtroler } from "./customer.controler";
import auth from "../../middleware/auth";

const router= Router();

router.get("/",auth("admin"),customerColtroler.getUser);

router.put("/:id",auth("admin","customer"),customerColtroler.updateUser);

router.delete("/:id",auth("admin"),customerColtroler.deleteUser)

export const customerRouter=router