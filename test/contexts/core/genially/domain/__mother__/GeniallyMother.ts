import { CreateGeniallyServiceRequest } from "../../../../../../src/contexts/core/genially/application/CreateGeniallyService";
import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";
import { GeniallyDescription } from "../../../../../../src/contexts/core/genially/domain/GeniallyDescription";
import { GeniallyId } from "../../../../../../src/contexts/core/genially/domain/GeniallyId";
import { GeniallyName } from "../../../../../../src/contexts/core/genially/domain/GeniallyName";
import { GeniallyDescriptionMother } from "./GeniallyDescriptionMother";
import { GeniallyIdMother } from "./GeniallyIdMother";
import { GeniallyNameMother } from "./GeniallyNameMother";

export class GeniallyMother {
  static create(
    id: GeniallyId,
    name: GeniallyName,
    description: GeniallyDescription,
  ) {
    return new Genially(
      id,
      name,
      description,
    );
  }

  static random() {
    return this.create(
      GeniallyIdMother.random(),
      GeniallyNameMother.random(),
      GeniallyDescriptionMother.random(),
    );
  }

  static deleted() {
    const genially = this.create(
      GeniallyIdMother.random(),
      GeniallyNameMother.random(),
      GeniallyDescriptionMother.random(),
    );
    genially.deletedAt = new Date();

    return genially;
  }

  static from({ id, name, description }: CreateGeniallyServiceRequest) {
    return this.create(
      new GeniallyId(id),
      new GeniallyName(name),
      new GeniallyDescription(description),
    );
  }
}
