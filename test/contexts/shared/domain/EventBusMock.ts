import { DomainEvent } from "../../../../src/contexts/shared/domain/DomainEvent";
import { DomainEventSubscriber } from "../../../../src/contexts/shared/domain/DomainEventSubscriber";
import { EventBus } from "../../../../src/contexts/shared/domain/EventBus";

export class EventBusMock implements EventBus {
  private publishSpy = jest.fn();
  private addSubscribersSpy = jest.fn();

  async publish(events: DomainEvent[]): Promise<void> {
    this.publishSpy(events);
  }

  addSubscribers(subscribers: DomainEventSubscriber<DomainEvent>[]): void {
    this.addSubscribersSpy(subscribers);
  }

  assertLastPublish(event: DomainEvent) {
    const calls = this.publishSpy.mock.calls;

    const lastCallEvent = calls[calls.length - 1][0][0] as DomainEvent;
    expect(this.getAttributesEvent(lastCallEvent)).toMatchObject(
      this.getAttributesEvent(event),
    );
  }

  private getAttributesEvent(event: DomainEvent) {
    const { eventId, occurredOn, ...attributes } = event;

    return attributes;
  }
}
