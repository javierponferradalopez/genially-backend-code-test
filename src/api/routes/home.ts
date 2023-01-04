import express from "express";

// Controllers (route handlers)
import * as healthController from "../controllers/health";

const router = express.Router();

router.get("/", healthController.check);

export default router;
