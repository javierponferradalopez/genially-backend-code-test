import { MongoRepository } from "../../../../shared/infrastructure/persistence/mongo/MongoRepository";
import Genially from "../../domain/Genially";
import { GeniallyId } from "../../domain/GeniallyId";
import GeniallyRepository from "../../domain/GeniallyRepository";

interface GeniallyDocument {
  _id: string;
  name: string;
  description?: string;
  createdAt: Date;
  modifiedAt?: Date;
  deletedAt?: Date;
}

export default class MongoGeniallyRepository
  extends MongoRepository<Genially, GeniallyId>
  implements GeniallyRepository {
  protected get entityName(): string {
    return Genially.name;
  }

  protected get collectionName(): string {
    return "genially";
  }

  async find(id: GeniallyId): Promise<Genially> {
    const document = await this.findDocument<GeniallyDocument>(id);
    return Genially.fromPrimitives({
      id: document._id,
      name: document.name,
      description: document.description,
      createdAt: document.createdAt,
      modifiedAt: document.modifiedAt,
      deletedAt: document.deletedAt,
    });
  }
}