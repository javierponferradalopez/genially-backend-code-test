import { GeniallyId } from "../../../../../src/contexts/core/genially/domain/GeniallyId";
import GeniallyRepository from "../../../../../src/contexts/core/genially/domain/GeniallyRepository";
import { Nullable } from "../../../../../src/contexts/shared/domain/Nullable";
import Genially from "../../../../../src/contexts/core/genially/domain/Genially";
import { GeniallyName } from "../../../../../src/contexts/core/genially/domain/GeniallyName";

export class GeniallyRepositoryMock implements GeniallyRepository {
  private saveSpy = jest.fn();
  private findSpy = jest.fn();
  private genially: Nullable<Genially> = null;

  async save(genially: Genially) {
    this.saveSpy(genially);
  }

  async find(id: GeniallyId) {
    this.findSpy(id);

    return this.genially;
  }

  assertFind(id: GeniallyId) {
    expect(this.findSpy).toBeCalledWith(id);
  }

  assertNotSave() {
    expect(this.saveSpy).not.toBeCalled();
  }

  assertSave(genially: Genially) {
    const called = this.saveSpy.mock.calls[0][0] as Genially;
    // skip auto generated properties
    called.createdAt = genially.createdAt;
    called.deletedAt = genially.deletedAt;

    expect(this.saveSpy).toBeCalledWith(expect.objectContaining(genially));
  }

  assertDeleted(id: GeniallyId) {
    const called = this.saveSpy.mock.calls[0][0] as Genially;

    expect(called.deletedAt).toBeTruthy();
    expect(called.id).toEqual(id);
  }

  assertModified(id: GeniallyId, name: GeniallyName) {
    const called = this.saveSpy.mock.calls[0][0] as Genially;

    expect(called.modifiedAt).toBeTruthy();
    expect(called.name).toEqual(name);
    expect(called.id).toEqual(id);
  }

  replaceGenially(newVal: Genially) {
    this.genially = newVal;
  }
}
