import { AgregateRoot } from "../../../shared/domain/AgregateRoot";
import { GeniallyId } from "../../genially/domain/GeniallyId";
import { GeniallysCounterId } from "./GeniallysCounterId";
import { GeniallysCounterTotal } from "./GeniallysCounterTotal";

export default class GeniallysContainer extends AgregateRoot {
  readonly id: GeniallysCounterId;
  private _total: GeniallysCounterTotal;
  readonly existingGeniallys: Array<GeniallyId>;

  constructor(
    id: GeniallysCounterId,
    total: GeniallysCounterTotal,
    existingGeniallys: Array<GeniallyId> = [],
  ) {
    super();

    this.id = id;
    this._total = total;
    this.existingGeniallys = existingGeniallys;
  }

  get total(): GeniallysCounterTotal {
    return this._total;
  }

  increment(geniallyId: GeniallyId) {
    this._total = this._total.increment();
    this.existingGeniallys.push(geniallyId);
  }

  hasIncremented(geniallyId: GeniallyId) {
    return !!this.existingGeniallys.find((id) => geniallyId.equals(id));
  }

  toPrimitives() {
    return {
      id: this.id.value,
      total: this.total.value,
      existingGeniallys: this.existingGeniallys.map((id) => id.value),
    };
  }

  static initialize(id: GeniallysCounterId) {
    return new GeniallysContainer(id, GeniallysCounterTotal.initialize());
  }

  static fromPrimitives(
    { id, total, existingGeniallys }: {
      id: string;
      total: number;
      existingGeniallys: string[];
    },
  ): GeniallysContainer {
    const geniallyContainer = new GeniallysContainer(
      new GeniallysCounterId(id),
      new GeniallysCounterTotal(total),
      existingGeniallys.map((id) => new GeniallyId(id)),
    );

    return geniallyContainer;
  }
}
