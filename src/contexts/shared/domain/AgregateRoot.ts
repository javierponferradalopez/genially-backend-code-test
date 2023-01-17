import { DomainEvent } from "./DomainEvent";

/**
 * Abstract class used as a minimum requirement for any resource that can be stored.
 *
 * @abstract
 */
export abstract class AgregateRoot {
  private domainEvents: Array<DomainEvent>;

  constructor() {
    this.domainEvents = [];
  }

  abstract toPrimitives(): Record<string, unknown>;

  pullDomainEvents(): Array<DomainEvent> {
    const domainEvents = this.domainEvents.slice();
    this.domainEvents = [];

    return domainEvents;
  }

  pushDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }
}
