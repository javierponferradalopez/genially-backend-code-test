import { AgregateRoot } from "../../../../../../src/contexts/shared/domain/AgregateRoot";
export default class AgregateRootDummy extends AgregateRoot {
  readonly id: string;

  constructor(id: string) {
    super();
    this.id = id;
  }

  toPrimitives(): Record<string, unknown> {
    return { id: this.id };
  }
}
