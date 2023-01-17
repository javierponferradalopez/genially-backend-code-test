import { Router } from "express";
import { body, param } from "express-validator";
import { validationRequestSchema } from "../helpers";
import container from "../../dependency-injection";
import { GeniallysRenameController } from "../../controllers/GeniallysRenameController";
import { GeniallyName } from "../../../contexts/core/genially/domain/GeniallyName";

// Controllers (route handlers)

export default function (router: Router) {
  const validationSchema = [
    body("name").exists().isString().isLength({
      min: GeniallyName.MIN_LENGTH,
      max: GeniallyName.MAX_LENGTH,
    }),
    param("id").exists().isUUID(),
  ];

  const geniallysRenameController = container.get<GeniallysRenameController>(
    "api.controllers.geniallysRenameController",
  );

  router.patch(
    "/:id",
    validationSchema,
    validationRequestSchema,
    geniallysRenameController.run.bind(geniallysRenameController),
  );
}
