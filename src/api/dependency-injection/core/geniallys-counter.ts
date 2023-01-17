import { ContainerBuilder } from "node-dependency-injection";
import { IncrementGeniallysCounterOnGeniallyCreated } from "../../../contexts/core/geniallys-counter/application/IncrementGeniallysCounterOnGeniallyCreated";
import { GeniallysCounterIncrementer } from "../../../contexts/core/geniallys-counter/application/GeniallysCounterIncrementer";
import MongoGeniallysCounterRepository from "../../../contexts/core/geniallys-counter/infrastructure/persistence/MongoGeniallysCounterRepository";

export const registerCoreGeniallysCounter = (container: ContainerBuilder) => {
  container.register(
    "core.geniallysCounter.domain.geniallysCounterRepository",
    MongoGeniallysCounterRepository,
  ).addArgument(container.get("shared.infrastructure.persistence.MongoClient"));

  container.register(
    "core.geniallysCounter.application.geniallysCounterIncrementer",
    GeniallysCounterIncrementer,
  ).addArgument(
    container.get("core.geniallysCounter.domain.geniallysCounterRepository"),
  );

  container.register(
    "core.geniallysCounter.application.incrementGeniallysCounterOnGeniallyCreated",
    IncrementGeniallysCounterOnGeniallyCreated,
  ).addTag("domainEventSubscriber").addArgument(
    container.get(
      "core.geniallysCounter.application.geniallysCounterIncrementer",
    ),
  );
};
