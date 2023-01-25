import { faker } from "@faker-js/faker";
import { GeniallysCounterId } from "../../../../../src/contexts/core/geniallys-counter/domain/GeniallysCounterId";
export class GeniallysCounterIdMother {
  static random() {
    return new GeniallysCounterId(faker.datatype.uuid());
  }
}
