import { GeniallysCounterMother } from "../domain/GeniallysCounterMother";
import { GeniallysCounterRepositoryMock } from "../__mocks__/GeniallysCounterRepositoryMock";
import { GeniallysCounterIncrementer } from "../../../../../src/contexts/core/geniallys-counter/application/GeniallysCounterIncrementer";
import { GeniallyIdMother } from "../../genially/domain/__mother__/GeniallyIdMother";

describe("GeniallysCounterIncrementer", () => {
  let repository: GeniallysCounterRepositoryMock;
  let incrementer: GeniallysCounterIncrementer;

  beforeEach(() => {
    repository = new GeniallysCounterRepositoryMock();
    incrementer = new GeniallysCounterIncrementer(repository);
  });

  it("should increment counter when this exists", async () => {
    const counter = GeniallysCounterMother.random();
    repository.replaceGeniallyCounter(counter);

    const geniallyId = GeniallyIdMother.random();
    await incrementer.run(geniallyId);

    repository.assertFirst();
    repository.assertSave(counter);
    expect(counter.existingGeniallys).toMatchObject(
      expect.arrayContaining([geniallyId]),
    );
  });

  it("should not increment counter when geniallyId already exists", async () => {
    const geniallyId = GeniallyIdMother.random();

    const counter = GeniallysCounterMother.withOne(geniallyId);
    repository.replaceGeniallyCounter(counter);

    await incrementer.run(geniallyId);

    repository.assertFirst();
    repository.assertNotSave();
  });

  it("should initialize and increment counter when this not exists", async () => {
    const geniallyId = GeniallyIdMother.random();
    await incrementer.run(geniallyId);

    repository.assertFirst();
    repository.assertSaveWithInitialize(geniallyId);
  });
});
