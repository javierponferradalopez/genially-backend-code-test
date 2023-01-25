import { GeniallyRepositoryMock } from "../__mocks__/GeniallyRepositoryMock";
import RenameGeniallyService from "../../../../../src/contexts/core/genially/application/RenameGeniallyService";
import { GeniallyMother } from "../domain/__mother__/GeniallyMother";
import EntityNotExist from "../../../../../src/contexts/shared/domain/EntityNotExist";
import Genially from "../../../../../src/contexts/core/genially/domain/Genially";
import { RenameGeniallyServiceRequestMother } from "./__mother__/RenameGeniallyServiceRequestMother";
import { GeniallyName } from "../../../../../src/contexts/core/genially/domain/GeniallyName";

describe("RenameGeniallyService", () => {
  let repository: GeniallyRepositoryMock;
  let service: RenameGeniallyService;

  beforeEach(() => {
    repository = new GeniallyRepositoryMock();
    service = new RenameGeniallyService(repository);
  });

  it("should rename genially", async () => {
    const genially = GeniallyMother.random();
    const newName = new GeniallyName("newName");
    const request = RenameGeniallyServiceRequestMother
      .from(genially.id, newName);

    repository.replaceGenially(genially);

    await service.execute(request);

    repository.assertFind(genially.id);
    repository.assertModified(genially.id, newName);
  });

  it("should throw an exception when genially was already deleted", async () => {
    const genially = GeniallyMother.deleted();
    const newName = new GeniallyName("newName");
    const request = RenameGeniallyServiceRequestMother
      .from(genially.id, newName);

    repository.replaceGenially(genially);

    await expect(service.execute(request)).rejects.toThrow(
      new EntityNotExist(Genially.name, genially.id.value),
    );

    repository.assertFind(genially.id);
  });
});
