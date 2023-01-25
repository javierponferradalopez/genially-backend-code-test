import { UuidValueObject } from "./value-object/UuidValueObject";

type DomainEventAttributes = Record<string, unknown>;

export abstract class DomainEvent {
  static EVENT_NAME: string;

  readonly agregateId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(
    { eventName, agregateId, eventId, occurredOn }: {
      eventName: string;
      agregateId: string;
      eventId?: string;
      occurredOn?: Date;
    },
  ) {
    this.agregateId = agregateId;
    this.eventId = eventId || UuidValueObject.random().value;
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
  }

  abstract toPrimitives(): DomainEventAttributes;

  static fromPrimitives: (params: {
    agregateId: string;
    eventId: string;
    occurredOn: Date;
    attributes: DomainEventAttributes;
  }) => DomainEvent;
}

export type DomainEventClass = {
  EVENT_NAME: string;
  fromPrimitives(params: {
    agregateId: string;
    eventId: string;
    occurredOn: Date;
    attributes: DomainEventAttributes;
  }): DomainEvent;
};
