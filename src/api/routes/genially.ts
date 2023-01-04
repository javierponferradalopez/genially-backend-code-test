import express from "express";

// Controllers (route handlers)
import * as geniallyController from "../controllers/genially";

const router = express.Router();

router.post("/", geniallyController.createGenially);
router.delete("/:id", geniallyController.deleteGenially);
router.patch("/:id", geniallyController.renameGenially);

export default router;
