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
    agregateId,
    name,
    description,
    eventId,
    occurredOn,
  }: {
    agregateId: string;
    eventId?: string;
    name: string;
    description: string;
    occurredOn?: Date;
  }) {
    super({
      eventName: GeniallyCreatedDomainEvent.EVENT_NAME,
      agregateId,
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

  static fromPrimitives({ agregateId, attributes, occurredOn, eventId }: {
    agregateId: string;
    attributes: CreateGeniallyDomainEventAttributes;
    eventId: string;
    occurredOn: Date;
  }): DomainEvent {
    return new GeniallyCreatedDomainEvent({
      agregateId,
      name: attributes.name,
      description: attributes.description,
      eventId,
      occurredOn,
    });
  }
}
