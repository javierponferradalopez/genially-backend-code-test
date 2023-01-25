import { faker } from "@faker-js/faker";
import AgregateRootDummy from "../__mocks__/AgregateRootDummy";

export class AgregateRootDummyMother {
  static random() {
    return new AgregateRootDummy(faker.datatype.uuid());
  }
}
