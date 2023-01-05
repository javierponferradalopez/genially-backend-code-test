import Genially from "../domain/Genially";
import { GeniallyId } from "../domain/GeniallyId";
import GeniallyNotExist from "../domain/GeniallyNotExist";
import GeniallyRepository from "../domain/GeniallyRepository";

export default class InMemoryGeniallyRepository implements GeniallyRepository {
  private geniallys: Genially[] = [];

  async save(genially: Genially): Promise<void> {
    await this.delete(genially.id);
    this.geniallys.push(genially);
  }

  async find(id: GeniallyId): Promise<Genially> {
    const genially = this.geniallys.find((genially) => genially.id.equals(id));

    if (genially) return genially;

    throw new GeniallyNotExist(id);
  }

  async delete(id: GeniallyId): Promise<void> {
    this.geniallys = this.geniallys
      .filter((genially) => !genially.id.equals(id));
  }
}
