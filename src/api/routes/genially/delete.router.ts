import { Router } from "express";
import container from "../../dependency-injection";

// Controllers (route handlers)
import { GeniallysDeleteController } from "../../controllers/GeniallysDeleteController";
import { param } from "express-validator";
import { validationRequestSchema } from "../helpers";

export default function (router: Router) {
  const validationSchema = [
    param("id").exists().isUUID(),
  ];

  const geniallysDeleteController = container.get<GeniallysDeleteController>(
    "api.controllers.geniallysDeleteController",
  );

  router.delete(
    "/:id",
    validationSchema,
    validationRequestSchema,
    geniallysDeleteController.run.bind(geniallysDeleteController),
  );
}
