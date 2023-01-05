import express from "express";
import container from "../dependency-injection";

// Controllers (route handlers)
import { GeniallysCreateController } from "../controllers/GeniallysCreateController";
import { GeniallysDeleteController } from "../controllers/GeniallysDeleteController";
import { GeniallysRenameController } from "../controllers/GeniallysRenameController";

const router = express.Router();

const geniallysCreateController = container.get<GeniallysCreateController>(
  "api.controllers.geniallysCreateController",
);

const geniallysDeleteController = container.get<GeniallysDeleteController>(
  "api.controllers.geniallysDeleteController",
);

const geniallysRenameController = container.get<GeniallysRenameController>(
  "api.controllers.geniallysRenameController",
);

router.post("/", geniallysCreateController.run.bind(geniallysCreateController));
router.delete(
  "/:id",
  geniallysDeleteController.run.bind(geniallysDeleteController),
);
router.patch(
  "/:id",
  geniallysRenameController.run.bind(geniallysRenameController),
);

export default router;
