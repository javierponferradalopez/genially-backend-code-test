import { RenameGeniallyServiceRequest } from "../../../../../../src/contexts/core/genially/application/RenameGeniallyService";
import { GeniallyId } from "../../../../../../src/contexts/core/genially/domain/GeniallyId";
import { GeniallyName } from "../../../../../../src/contexts/core/genially/domain/GeniallyName";
import { GeniallyIdMother } from "../../domain/__mother__/GeniallyIdMother";
import { GeniallyNameMother } from "../../domain/__mother__/GeniallyNameMother";

export class RenameGeniallyServiceRequestMother {
  static random(): RenameGeniallyServiceRequest {
    return {
      id: GeniallyIdMother.random().value,
      name: GeniallyNameMother.random().value,
    };
  }

  static from(
    id: GeniallyId,
    newName: GeniallyName,
  ): RenameGeniallyServiceRequest {
    return {
      id: id.value,
      name: newName.value,
    };
  }
}
