import { faker } from "@faker-js/faker";
import { GeniallyId } from "../../../../../../src/contexts/core/genially/domain/GeniallyId";
export class GeniallyIdMother {
  static random() {
    return new GeniallyId(faker.datatype.uuid());
  }
}
