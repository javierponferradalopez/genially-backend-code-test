import { DomainEvent } from "../../../shared/domain/DomainEvent";

type CreateGeniallyDomainEventAttributes = {
  readonly name: string;
  readonly description?: string;
};

export class GeniallyCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = "genially.created";

  readonly name: string;
  readonly description: string;

  constructor({
    aggregateId,
    name,
    description,
    eventId,
    occurredOn,
  }: {
    aggregateId: string;
    eventId?: string;
    name: string;
    description: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: GeniallyCreatedDomainEvent.EVENT_NAME,
      aggregateId,
      eventId,
      occurredOn,
    });
    this.name = name;
    this.description = description;
  }

  toPrimitives(): CreateGeniallyDomainEventAttributes {
    const { name, description } = this;
    return {
      name,
      description,
    };
  }

  static fromPrimitives({ aggregateId, attributes, occurredOn, eventId }: {
    aggregateId: string;
    attributes: CreateGeniallyDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    return new GeniallyCreatedDomainEvent({
      aggregateId,
      name: attributes.name,
      description: attributes.description,
      eventId,
      occurredOn,
    });
  }
}
