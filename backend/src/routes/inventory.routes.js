import { Router } from "express";
import { getInventory } from "../controllers/inventory.controller.js";

const router = Router();

router.get("/", getInventory);

export default router;
