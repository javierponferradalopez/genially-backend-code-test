import { InMemoryRepository } from "../../../../../../src/contexts/shared/infrastructure/persistence/InMemoryRepository";
import AgregateRootDummy from "./AgregateRootDummy";

export class InMemoryAgregateRootDummyRepository
  extends InMemoryRepository<AgregateRootDummy> {
  protected get entityName(): string {
    return AgregateRootDummy.name;
  }

  assertContainsAgregate(entity: AgregateRootDummy) {
    expect(this.store).toMatchObject(expect.arrayContaining([entity]));
  }

  assertCount(size: number) {
    expect(this.store.length).toEqual(size);
  }

  assertNotContainsAgregate(entity: AgregateRootDummy) {
    expect(this.store).not.toMatchObject(expect.arrayContaining([entity]));
  }

  fillWith(newVal: AgregateRootDummy[]) {
    this.store = newVal;
  }

  clear() {
    this.store = [];
  }
}
