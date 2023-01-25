import { GeniallyId } from "../../../../../src/contexts/core/genially/domain/GeniallyId";
import GeniallysCounter from "../../../../../src/contexts/core/geniallys-counter/domain/GeniallysCounter";
import { GeniallysCounterIdMother } from "./GeniallysCounterIdMother";
import { GeniallysCounterTotalMother } from "./GeniallysCounterTotalMother";
export class GeniallysCounterMother {
  static random() {
    return new GeniallysCounter(
      GeniallysCounterIdMother.random(),
      GeniallysCounterTotalMother.initialize(),
    );
  }

  static withOne(geniallyId: GeniallyId) {
    return new GeniallysCounter(
      GeniallysCounterIdMother.random(),
      GeniallysCounterTotalMother.initialize(),
      [geniallyId],
    );
  }
}
