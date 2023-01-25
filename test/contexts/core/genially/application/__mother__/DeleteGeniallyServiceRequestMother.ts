import { DeleteGeniallyServiceRequest } from "../../../../../../src/contexts/core/genially/application/DeleteGeniallyService";
import Genially from "../../../../../../src/contexts/core/genially/domain/Genially";
import { GeniallyIdMother } from "../../domain/__mother__/GeniallyIdMother";

export class DeleteGeniallyServiceRequestMother {
  static random(): DeleteGeniallyServiceRequest {
    return {
      id: GeniallyIdMother.random().value,
    };
  }

  static from(genially: Genially): DeleteGeniallyServiceRequest {
    return {
      id: genially.id.value,
    };
  }
}
