import { MongoClient } from "mongodb";
import { MongoClientFactory } from "../../../../../../src/contexts/shared/infrastructure/persistence/mongo/MongoClientFactory";

describe("MongoClientFactory", () => {
  it("should creates new instance for mongo client", async () => {
    const newClient = MongoClientFactory.build({
      url: "mongodb://localhost:27017/mooc-backend-test1",
    });

    expect(newClient).toBeInstanceOf(MongoClient);
  });
});
