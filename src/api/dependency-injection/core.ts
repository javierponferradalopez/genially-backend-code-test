import { ContainerBuilder } from "node-dependency-injection";
import CreateGeniallyService from "../../contexts/core/genially/application/CreateGeniallyService";
import DeleteGeniallyService from "../../contexts/core/genially/application/DeleteGeniallyService";
import RenameGeniallyService from "../../contexts/core/genially/application/RenameGeniallyService";
import InMemoryGeniallyRepository from "../../contexts/core/genially/infrastructure/InMemoryGeniallyRepository";

export const registerCore = (container: ContainerBuilder) => {
  container.register(
    "core.genially.domain.GeniallyRepository",
    InMemoryGeniallyRepository,
  );

  container.register(
    "core.genially.application.createGeniallyService",
    CreateGeniallyService,
  ).addArgument(container.get("core.genially.domain.GeniallyRepository"));

  container.register(
    "core.genially.application.deleteGeniallyService",
    DeleteGeniallyService,
  ).addArgument(container.get("core.genially.domain.GeniallyRepository"));

  container.register(
    "core.genially.application.renameGeniallyService",
    RenameGeniallyService,
  ).addArgument(container.get("core.genially.domain.GeniallyRepository"));
};
