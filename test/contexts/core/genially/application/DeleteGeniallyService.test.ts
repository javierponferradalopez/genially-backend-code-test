import { GeniallyRepositoryMock } from "../__mocks__/GeniallyRepositoryMock";
import DeleteGeniallyService from "../../../../../src/contexts/core/genially/application/DeleteGeniallyService";
import { GeniallyMother } from "../domain/__mother__/GeniallyMother";
import { DeleteGeniallyServiceRequestMother } from "./__mother__/DeleteGeniallyServiceRequestMother";
import EntityNotExist from "../../../../../src/contexts/shared/domain/EntityNotExist";
import Genially from "../../../../../src/contexts/core/genially/domain/Genially";

describe("DeleteGeniallyService", () => {
  let repository: GeniallyRepositoryMock;
  let service: DeleteGeniallyService;

  beforeEach(() => {
    repository = new GeniallyRepositoryMock();
    service = new DeleteGeniallyService(repository);
  });

  it("should delete genially", async () => {
    const genially = GeniallyMother.random();
    const request = DeleteGeniallyServiceRequestMother
      .from(genially);

    repository.replaceGenially(genially);

    await service.execute(request);

    repository.assertFind(genially.id);
    repository.assertDeleted(genially.id);
  });

  it("should throw an exception when genially was already deleted", async () => {
    const genially = GeniallyMother.deleted();
    const request = DeleteGeniallyServiceRequestMother
      .from(genially);

    repository.replaceGenially(genially);

    await expect(service.execute(request)).rejects.toThrow(
      new EntityNotExist(Genially.name, genially.id.value),
    );

    repository.assertFind(genially.id);
  });
});
