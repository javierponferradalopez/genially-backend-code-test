import { Router } from "express";
import { body } from "express-validator";
import container from "../../dependency-injection";
import { GeniallyDescription } from "../../../contexts/core/genially/domain/GeniallyDescription";
import { GeniallyName } from "../../../contexts/core/genially/domain/GeniallyName";
import { validationRequestSchema } from "../helpers";

// Controllers (route handlers)
import { GeniallysCreateController } from "../../controllers/GeniallysCreateController";

export default function (router: Router) {
  const validationSchema = [
    body("id").exists().isUUID(),
    body("name").exists().isString().isLength({
      min: GeniallyName.MIN_LENGTH,
      max: GeniallyName.MAX_LENGTH,
    }),
    body("description").optional().isString().isLength({
      max: GeniallyDescription.MAX_LENGTH,
    }),
  ];

  const geniallysCreateController = container.get<GeniallysCreateController>(
    "api.controllers.geniallysCreateController",
  );

  router.post(
    "/",
    validationSchema,
    validationRequestSchema,
    geniallysCreateController.run.bind(geniallysCreateController),
  );
}
