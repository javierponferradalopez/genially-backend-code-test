import {
  AgregateRootDocument,
  MongoAgregateRootDummyRepository,
} from "./__mocks__/MongoAgregateRootDummyRepository";
import { AgregateRootDummyMother } from "../__mother__/AgregateRootDummyMother";
import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker";
import EntityNotExist from "../../../../../../src/contexts/shared/domain/EntityNotExist";
import AgregateRootDummy from "../__mocks__/AgregateRootDummy";

describe("MongoRepository", () => {
  let repository: MongoAgregateRootDummyRepository;
  let mongoClient: MongoClient;

  beforeAll(async () => {
    mongoClient = new MongoClient(
      "mongodb://localhost:27017/mooc-backend-test1",
      {
        ignoreUndefined: true,
      },
    );

    repository = new MongoAgregateRootDummyRepository(
      Promise.resolve(mongoClient),
    );

    await mongoClient.connect();
  });

  afterAll(async () => {
    await mongoClient.close();
  });

  beforeEach(async () => {
    await repository.clear();
  });

  describe(".persist", () => {
    it("should store the new agregate", async () => {
      const newAgregate = AgregateRootDummyMother.random();

      await repository.persist(newAgregate.id, newAgregate);
      await repository.assertContainsAgregate(newAgregate);
    });

    it("should replace agregate when this already exist", async () => {
      const newAgregate = AgregateRootDummyMother.random();

      await repository.fillWith(newAgregate);

      await repository.persist(newAgregate.id, newAgregate);
      await repository.assertContainsAgregate(newAgregate);
      await repository.assertCount(1);
    });
  });

  describe(".findDocument", () => {
    it("should search for the entity by id", async () => {
      const agregate = AgregateRootDummyMother.random();
      await repository.fillWith(agregate);

      const document = await repository.findDocument<AgregateRootDocument>(
        agregate.id,
      );
      expect(document._id).toEqual(agregate.id);
    });

    it("should returns exception when entity not found", async () => {
      const id = faker.datatype.uuid();

      await expect(repository.findDocument<AgregateRootDocument>(id))
        .rejects.toThrow(
          new EntityNotExist(AgregateRootDummy.name, id),
        );
    });
  });
});
