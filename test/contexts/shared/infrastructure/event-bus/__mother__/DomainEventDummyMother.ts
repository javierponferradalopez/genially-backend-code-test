import { DomainEventDummy } from "../__mocks__/DomainEventDummy";
import { faker } from "@faker-js/faker";

export class DomainEventDummyMother {
  static random() {
    return new DomainEventDummy({
      agregateId: faker.datatype.uuid(),
      eventId: faker.datatype.uuid(),
      occurredOn: new Date(),
    });
  }
}
