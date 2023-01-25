import { faker } from "@faker-js/faker";
import EntityNotExist from "../../../../../src/contexts/shared/domain/EntityNotExist";
import AgregateRootDummy from "./__mocks__/AgregateRootDummy";
import { InMemoryAgregateRootDummyRepository } from "./__mocks__/InMemoryAgregateRootDummyRepository";
import { AgregateRootDummyMother } from "./__mother__/AgregateRootDummyMother";

describe("InMemoryRepository", () => {
  let repository: InMemoryAgregateRootDummyRepository;

  beforeAll(() => {
    repository = new InMemoryAgregateRootDummyRepository();
  });

  afterEach(() => {
    repository.clear();
  });

  describe(".persist", () => {
    it("should store the new agregate", async () => {
      const newAgregate = AgregateRootDummyMother.random();

      await repository.persist(newAgregate.id, newAgregate);
      repository.assertContainsAgregate(newAgregate);
    });

    it("should replace agregate when this already exist", async () => {
      const newAgregate = AgregateRootDummyMother.random();

      repository.fillWith([newAgregate]);

      await repository.persist(newAgregate.id, newAgregate);
      repository.assertContainsAgregate(newAgregate);
      repository.assertCount(1);
    });
  });

  describe(".findById", () => {
    it("should search for the entity by id", async () => {
      const agregate = AgregateRootDummyMother.random();
      repository.fillWith([agregate]);

      expect(await repository.findById(agregate.id)).toEqual(agregate);
    });

    it("should returns exception when entity not found", async () => {
      const id = faker.datatype.uuid();
      await expect(repository.findById(id)).rejects.toThrow(
        new EntityNotExist(AgregateRootDummy.name, id),
      );
    });
  });

  describe(".delete", () => {
    it("should delete agregate by id", async () => {
      const agregate = AgregateRootDummyMother.random();
      repository.fillWith([agregate]);

      await repository.delete(agregate.id);

      repository.assertNotContainsAgregate(agregate);
    });
  });
});
