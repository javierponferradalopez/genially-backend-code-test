import { InMemoryRepository } from "../../../../shared/infrastructure/persistence/InMemoryRepository";
import Genially from "../../domain/Genially";
import { GeniallyId } from "../../domain/GeniallyId";
import GeniallyRepository from "../../domain/GeniallyRepository";

export default class InMemoryGeniallyRepository
  extends InMemoryRepository<Genially, GeniallyId>
  implements GeniallyRepository {
  protected get entityName(): string {
    return Genially.name;
  }
}
