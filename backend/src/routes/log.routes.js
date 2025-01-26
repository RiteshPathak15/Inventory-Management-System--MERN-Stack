import express from "express";
import { getLogs } from "../controllers/log.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", verifyJWT, getLogs);

export default router;