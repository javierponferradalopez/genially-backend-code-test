import { EventBusMock } from "../../../shared/domain/EventBusMock";
import { GeniallyRepositoryMock } from "../__mocks__/GeniallyRepositoryMock";
import CreateGeniallyService from "../../../../../src/contexts/core/genially/application/CreateGeniallyService";
import { CreateGeniallyServiceRequestMother } from "./__mother__/CreateGeniallyServiceRequestMother";
import { GeniallyMother } from "../domain/__mother__/GeniallyMother";
import { GeniallyCreatedDomainEventMother } from "../domain/__mother__/GeniallyCreatedDomainEventMother";

describe("CreateGeniallyService", () => {
  let repository: GeniallyRepositoryMock;
  let eventBus: EventBusMock;
  let service: CreateGeniallyService;

  beforeEach(() => {
    repository = new GeniallyRepositoryMock();
    eventBus = new EventBusMock();
    service = new CreateGeniallyService(repository, eventBus);
  });

  it("should create genially", async () => {
    const request = CreateGeniallyServiceRequestMother
      .random();

    await service.execute(request);

    const expectGenially = GeniallyMother.from(request);
    repository.assertSave(expectGenially);

    const expectEvent = GeniallyCreatedDomainEventMother.fromGenially(
      expectGenially,
    );
    eventBus.assertLastPublish(expectEvent);
  });
});
