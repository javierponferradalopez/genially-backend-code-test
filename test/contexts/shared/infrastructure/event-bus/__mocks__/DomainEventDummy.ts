import { DomainEvent } from "../../../../../../src/contexts/shared/domain/DomainEvent";

export class DomainEventDummy extends DomainEvent {
  static readonly EVENT_NAME = "dummy";

  constructor({
    agregateId,
    eventId,
    occurredOn,
  }: {
    agregateId: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: DomainEventDummy.EVENT_NAME,
      agregateId,
      eventId,
      occurredOn,
    });
  }

  toPrimitives() {
    return {};
  }

  static fromPrimitives({ agregateId, occurredOn, eventId }: {
    agregateId: string;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    return new DomainEventDummy({
      agregateId,
      eventId,
      occurredOn,
    });
  }
}
