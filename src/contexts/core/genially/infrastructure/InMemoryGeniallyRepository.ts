import Genially from "../domain/Genially";
import { GeniallyId } from "../domain/GeniallyId";
import GeniallyNotExist from "../domain/GeniallyNotExist";
import GeniallyRepository from "../domain/GeniallyRepository";

export default class InMemoryGeniallyRepository implements GeniallyRepository {
  private static geniallys: Genially[] = [];

  async save(genially: Genially): Promise<void> {
    await this.delete(genially.id);
    InMemoryGeniallyRepository.geniallys.push(genially);

    return Promise.resolve();
  }

  async find(id: GeniallyId): Promise<Genially> {
    const genially = InMemoryGeniallyRepository.geniallys.find((genially) =>
      genially.id.equals(id)
    );

    if (genially) return Promise.resolve(genially);

    throw new GeniallyNotExist(id);
  }

  async delete(id: GeniallyId): Promise<void> {
    InMemoryGeniallyRepository.geniallys = InMemoryGeniallyRepository.geniallys
      .filter((genially) => !genially.id.equals(id));

    return Promise.resolve();
  }
}
