import {
  DomainEvent,
  DomainEventClass,
} from "../../../../../../src/contexts/shared/domain/DomainEvent";
import { DomainEventDummy } from "./DomainEventDummy";
import { DomainEventSubscriber } from "../../../../../../src/contexts/shared/domain/DomainEventSubscriber";
import waitForExpect from "wait-for-expect";

export class DomainEventSubscriberDummy
  implements DomainEventSubscriber<DomainEventDummy> {
  private events: Array<DomainEvent>;

  constructor() {
    this.events = [];
  }

  subscribedTo(): DomainEventClass[] {
    return [DomainEventDummy];
  }

  async on(domainEvent: DomainEventDummy) {
    this.events.push(domainEvent);
  }

  async assertsToEqual(events: Array<DomainEvent>) {
    await waitForExpect(() => {
      expect(this.events).toEqual(events);
    });
  }
}
