import express from "express";

// Controllers (route handlers)
import { HealthController } from "../controllers/HealthController";

const router = express.Router();

const healthController = new HealthController();
router.get("/", healthController.run);

export default router;
