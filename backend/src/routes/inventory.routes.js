import express from "express";
import { getInventory, createInventoryItem ,updateInventory,deleteInventory} from "../controllers/inventory.controller.js";

const router = express.Router();

router.get("/", getInventory);
router.post("/", createInventoryItem);
router.put("/:id", updateInventory);
router.delete("/:id", deleteInventory);


export default router;
