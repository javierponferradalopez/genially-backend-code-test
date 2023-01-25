import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";
import { GeniallyCreatedDomainEvent } from "../../../../../../src/contexts/core/genially/domain/GeniallyCreatedDomainEvent";

export class GeniallyCreatedDomainEventMother {
  static fromGenially(genially: Genially) {
    return new GeniallyCreatedDomainEvent({
      agregateId: genially.id.value,
      name: genially.name.value,
      description: genially.description.value,
    });
  }
}
