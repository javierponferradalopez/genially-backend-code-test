import { GeniallyId } from "../../../../../src/contexts/core/genially/domain/GeniallyId";
import GeniallysCounter from "../../../../../src/contexts/core/geniallys-counter/domain/GeniallysCounter";
import GeniallysCounterRepository from "../../../../../src/contexts/core/geniallys-counter/domain/GeniallysCounterRepository";
import { Nullable } from "../../../../../src/contexts/shared/domain/Nullable";

export class GeniallysCounterRepositoryMock
  implements GeniallysCounterRepository {
  private saveSpy = jest.fn();
  private firstSpy = jest.fn();
  private geniallysCounter: Nullable<GeniallysCounter> = null;

  async save(geniallysCounter: GeniallysCounter) {
    this.saveSpy(geniallysCounter);
  }

  async first() {
    this.firstSpy();

    return this.geniallysCounter;
  }

  assertFirst() {
    expect(this.firstSpy).toBeCalled();
  }

  assertNotSave() {
    expect(this.saveSpy).not.toBeCalled();
  }

  assertSave(geniallysCounter: GeniallysCounter) {
    expect(this.saveSpy).toBeCalledWith(geniallysCounter);
  }

  assertSaveWithInitialize(geniallyId: GeniallyId) {
    const mock = this.saveSpy.mock;
    const newCounter = mock.calls[0][0] as GeniallysCounter;
    expect(newCounter).toBeInstanceOf(GeniallysCounter);
    expect(newCounter.existingGeniallys[0]).toEqual(geniallyId);
  }

  replaceGeniallyCounter(newVal: GeniallysCounter) {
    this.geniallysCounter = newVal;
  }
}
