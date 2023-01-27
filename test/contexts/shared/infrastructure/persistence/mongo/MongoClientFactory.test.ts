import { MongoClient } from "mongodb";
import config from "../../../../../../src/contexts/shared/infrastructure/config";
import { MongoClientFactory } from "../../../../../../src/contexts/shared/infrastructure/persistence/mongo/MongoClientFactory";

describe("MongoClientFactory", () => {
  it("should creates new instance for mongo client", async () => {
    const newClient = MongoClientFactory.build({
      url: config.get("persistence.mongo.url"),
    });

    expect(newClient).toBeInstanceOf(MongoClient);
  });
});
