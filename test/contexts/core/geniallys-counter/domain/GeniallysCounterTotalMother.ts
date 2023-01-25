import { GeniallysCounterTotal } from "../../../../../src/contexts/core/geniallys-counter/domain/GeniallysCounterTotal";
export class GeniallysCounterTotalMother {
  static initialize() {
    return new GeniallysCounterTotal(0);
  }
}
