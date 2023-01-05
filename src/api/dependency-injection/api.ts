import { ContainerBuilder } from "node-dependency-injection";
import { GeniallysCreateController } from "../../api/controllers/GeniallysCreateController";
import { GeniallysDeleteController } from "../../api/controllers/GeniallysDeleteController";
import { GeniallysRenameController } from "../../api/controllers/GeniallysRenameController";

export const registerApi = (container: ContainerBuilder) => {
  container.register(
    "api.controllers.geniallysCreateController",
    GeniallysCreateController,
  ).addArgument(
    container.get("core.genially.application.createGeniallyService"),
  );

  container.register(
    "api.controllers.geniallysDeleteController",
    GeniallysDeleteController,
  ).addArgument(
    container.get("core.genially.application.deleteGeniallyService"),
  );

  container.register(
    "api.controllers.geniallysRenameController",
    GeniallysRenameController,
  ).addArgument(
    container.get("core.genially.application.renameGeniallyService"),
  );
};
