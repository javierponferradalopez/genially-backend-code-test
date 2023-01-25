import { CreateGeniallyServiceRequest } from "../../../../../../src/contexts/core/genially/application/CreateGeniallyService";
import { GeniallyDescriptionMother } from "../../domain/__mother__/GeniallyDescriptionMother";
import { GeniallyIdMother } from "../../domain/__mother__/GeniallyIdMother";
import { GeniallyNameMother } from "../../domain/__mother__/GeniallyNameMother";

export class CreateGeniallyServiceRequestMother {
  static random(): CreateGeniallyServiceRequest {
    return {
      id: GeniallyIdMother.random().value,
      name: GeniallyNameMother.random().value,
      description: GeniallyDescriptionMother.random().value,
    };
  }
}
