import { ContainerBuilder, Definition } from "node-dependency-injection";
import { MongoConfigFactory } from "../../contexts/shared/infrastructure/persistence/mongo/MongoConfigFactory";
import { MongoClientFactory } from "../../contexts/shared/infrastructure/persistence/mongo/MongoClientFactory";

export const registerShared = (container: ContainerBuilder) => {
  const mongoConfigDefinition = new Definition();
  mongoConfigDefinition.setFactory(MongoConfigFactory, "build");
  container.setDefinition(
    "shared.infrastructure.persistence.MongoConfig",
    mongoConfigDefinition,
  );

  const mongoClientDefinition = new Definition();
  mongoClientDefinition.setFactory(MongoClientFactory, "build");
  container.setDefinition(
    "shared.infrastructure.persistence.MongoClient",
    mongoClientDefinition,
  ).addArgument(container.get("shared.infrastructure.persistence.MongoConfig"));
};
