import { Router } from "express";
import { customerColtroler } from "./customer.controler";

const router= Router();

router.get("/",customerColtroler.getUser);

router.put("/:id",customerColtroler.updateUser);

router.delete("/:id",customerColtroler.deleteUser)

export const customerRouter=router