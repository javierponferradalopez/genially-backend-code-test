import { DomainEventSubscriberDummy } from "./__mocks__/DomainEventSubscriberDummy";
import { InMemoryAsyncEventBus } from "../../../../../src/contexts/shared/infrastructure/event-bus/InMemoryAsyncEventBus";
import { DomainEventDummyMother } from "./__mother__/DomainEventDummyMother";

describe("InMemoryAsyncEventBus", () => {
  let eventBus: InMemoryAsyncEventBus;

  beforeEach(() => {
    eventBus = new InMemoryAsyncEventBus();
  });

  afterEach(() => {
    eventBus.removeAllListeners();
  });

  it("should consume the event published to EventEmitter", async () => {
    const newEvent = DomainEventDummyMother.random();

    const dummySubscriber = new DomainEventSubscriberDummy();
    eventBus.addSubscribers([dummySubscriber]);
    eventBus.publish([newEvent]);

    await dummySubscriber.assertsToEqual([newEvent]);
  });
});
