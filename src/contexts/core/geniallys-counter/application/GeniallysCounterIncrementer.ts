import { GeniallyId } from "../../genially/domain/GeniallyId";
import GeniallysCounter from "../domain/GeniallysCounter";
import { GeniallysCounterId } from "../domain/GeniallysCounterId";
import GeniallysCounterRepository from "../domain/GeniallysCounterRepository";

export class GeniallysCounterIncrementer {
  constructor(
    private _repository: GeniallysCounterRepository,
  ) {}

  async run(geniallyId: GeniallyId) {
    const geniallyCounter = (await this._repository.first()) ||
      this.initializeCounter();

    if (!geniallyCounter.hasIncremented(geniallyId)) {
      geniallyCounter.increment(geniallyId);

      await this._repository.save(geniallyCounter);
    }
  }

  private initializeCounter(): GeniallysCounter {
    return GeniallysCounter.initialize(GeniallysCounterId.random());
  }
}
