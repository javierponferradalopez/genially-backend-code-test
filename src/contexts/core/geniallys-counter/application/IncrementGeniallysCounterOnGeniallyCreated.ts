import { DomainEventClass } from "../../../shared/domain/DomainEvent";
import { DomainEventSubscriber } from "../../../shared/domain/DomainEventSubscriber";
import { GeniallyCreatedDomainEvent } from "../../genially/domain/GeniallyCreatedDomainEvent";
import { GeniallyId } from "../../genially/domain/GeniallyId";
import { GeniallysCounterIncrementer } from "./GeniallysCounterIncrementer";

export class IncrementGeniallysCounterOnGeniallyCreated
  implements DomainEventSubscriber<GeniallyCreatedDomainEvent> {
  constructor(
    private _incrementer: GeniallysCounterIncrementer,
  ) {}

  subscribedTo(): DomainEventClass[] {
    return [GeniallyCreatedDomainEvent];
  }

  async on(domainEvent: GeniallyCreatedDomainEvent) {
    await this._incrementer.run(new GeniallyId(domainEvent.aggregateId));
  }
}
