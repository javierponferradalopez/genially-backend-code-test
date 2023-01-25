import { faker } from "@faker-js/faker";
import { GeniallyDescription } from "../../../../../../src/contexts/core/genially/domain/GeniallyDescription";
export class GeniallyDescriptionMother {
  static random() {
    return new GeniallyDescription(
      faker.random.alpha(GeniallyDescription.MAX_LENGTH),
    );
  }
}
