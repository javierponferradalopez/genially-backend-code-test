import { Nullable } from "../../../../shared/domain/Nullable";
import { MongoRepository } from "../../../../shared/infrastructure/persistence/mongo/MongoRepository";
import GeniallysCounter from "../../domain/GeniallysCounter";
import GeniallysContainer from "../../domain/GeniallysCounter";
import GeniallysCounterRepository from "../../domain/GeniallysCounterRepository";

interface GeniallysCounterDocument {
  _id: string;
  total: number;
  existingGeniallys: string[];
}

export default class MongoGeniallysCounterRepository
  extends MongoRepository<GeniallysContainer>
  implements GeniallysCounterRepository {
  protected get agregateRootName(): string {
    return GeniallysCounter.name;
  }

  protected get collectionName(): string {
    return "geniallysCounter";
  }

  save(geniallysCounter: GeniallysCounter) {
    return this.persist(geniallysCounter.id.value, geniallysCounter);
  }

  async first(): Promise<Nullable<GeniallysContainer>> {
    const collection = await this.collection();

    const document = await collection.findOne<GeniallysCounterDocument>();
    if (!!document) {
      return GeniallysCounter.fromPrimitives({
        id: document._id,
        total: document.total,
        existingGeniallys: document.existingGeniallys,
      });
    }
    return null;
  }
}
