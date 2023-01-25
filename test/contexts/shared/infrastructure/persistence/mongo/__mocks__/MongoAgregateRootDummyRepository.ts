import AgregateRootDummy from "../../__mocks__/AgregateRootDummy";
import { MongoRepository } from "../../../../../../../src/contexts/shared/infrastructure/persistence/mongo/MongoRepository";

export interface AgregateRootDocument {
  _id: string;
}

export class MongoAgregateRootDummyRepository
  extends MongoRepository<AgregateRootDummy> {
  protected get agregateRootName(): string {
    return AgregateRootDummy.name;
  }

  protected get collectionName(): string {
    return "agregateRoot";
  }

  async assertContainsAgregate(entity: AgregateRootDummy) {
    const collection = await this.collection();
    const record = await collection.findOne<AgregateRootDocument>({
      _id: entity.id,
    });

    expect(record).toEqual({
      ...entity.toPrimitives(),
      _id: entity.id,
      id: undefined,
    });
  }

  async assertCount(size: number) {
    const collection = await this.collection();
    expect(await collection.countDocuments()).toEqual(size);
  }

  async assertNotContainsAgregate(entity: AgregateRootDummy) {
    const collection = await this.collection();
    const record = await collection.findOne<AgregateRootDocument>({
      _id: entity.id,
    });

    expect(record).not.toEqual({
      ...entity.toPrimitives(),
      _id: entity.id,
      id: undefined,
    });
  }

  async fillWith(newVal: AgregateRootDummy) {
    const collection = await this.collection();
    const document = {
      ...newVal.toPrimitives(),
      _id: newVal.id,
      id: undefined,
    };

    await collection.replaceOne({ _id: newVal.id }, document, {
      upsert: true,
    });
  }

  async clear() {
    const collection = await this.collection();
    collection.deleteMany({});
  }
}
