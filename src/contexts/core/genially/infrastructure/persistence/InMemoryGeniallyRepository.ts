import { InMemoryRepository } from "../../../../shared/infrastructure/persistence/InMemoryRepository";
import Genially from "../../domain/Genially";
import { GeniallyId } from "../../domain/GeniallyId";
import GeniallyRepository from "../../domain/GeniallyRepository";

export default class InMemoryGeniallyRepository
  extends InMemoryRepository<Genially>
  implements GeniallyRepository {
  protected get entityName(): string {
    return Genially.name;
  }

  save(genially: Genially): Promise<void> {
    return this.persist(genially.id.value, genially);
  }

  find(id: GeniallyId) {
    return this.findById(id.value);
  }
}
