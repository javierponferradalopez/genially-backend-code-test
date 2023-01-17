import { ContainerBuilder } from "node-dependency-injection";
import MongoGeniallyRepository from "../../../contexts/core/genially/infrastructure/persistence/MongoGeniallyRepository";
import CreateGeniallyService from "../../../contexts/core/genially/application/CreateGeniallyService";
import DeleteGeniallyService from "../../../contexts/core/genially/application/DeleteGeniallyService";
import RenameGeniallyService from "../../../contexts/core/genially/application/RenameGeniallyService";

export const registerCoreGenially = (container: ContainerBuilder) => {
  container.register(
    "core.genially.domain.geniallyRepository",
    MongoGeniallyRepository,
  ).addArgument(container.get("shared.infrastructure.persistence.MongoClient"));

  container.register(
    "core.genially.application.createGeniallyService",
    CreateGeniallyService,
  ).addArgument(container.get("core.genially.domain.geniallyRepository"))
    .addArgument(container.get("shared.infrastructure.eventBus"));

  container.register(
    "core.genially.application.deleteGeniallyService",
    DeleteGeniallyService,
  ).addArgument(container.get("core.genially.domain.geniallyRepository"));

  container.register(
    "core.genially.application.renameGeniallyService",
    RenameGeniallyService,
  ).addArgument(container.get("core.genially.domain.geniallyRepository"));
};
