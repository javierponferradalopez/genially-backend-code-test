import { faker } from "@faker-js/faker";
import { GeniallyName } from "../../../../../../src/contexts/core/genially/domain/GeniallyName";
export class GeniallyNameMother {
  static random() {
    return new GeniallyName(faker.random.alpha(GeniallyName.MAX_LENGTH));
  }
}
