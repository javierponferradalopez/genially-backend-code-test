import { Collection, MongoClient } from "mongodb";
import EntityNotExist from "../../../domain/EntityNotExist";
import { IEntity } from "../../../domain/IEntity";
import {
  Primitives,
  ValueObject,
} from "../../../domain/value-object/ValueObject";

/**
 * Abstract generic adapter for mongo database connection.
 * Requires specification of concrete entity and identification classes.
 *
 * @abstract
 * @template E type of entity to be managed
 * @template ID unique identifier type for the entity
 */
export abstract class MongoRepository<
  E extends IEntity<ID>,
  ID extends ValueObject<Primitives>,
> {
  constructor(private readonly _client: Promise<MongoClient>) {}

  protected abstract get entityName(): string;

  protected abstract get collectionName(): string;

  protected async collection(): Promise<Collection> {
    return (await this._client).db().collection(this.collectionName);
  }

  async save(entity: E): Promise<void> {
    const collection = await this.collection();

    const document: Record<string, unknown> = {
      ...entity.toPrimitives(),
      _id: entity.id.value,
      // discard entity identifier to use the mongo identifier
      id: undefined,
    };

    await collection.replaceOne({ _id: entity.id.value }, document, {
      upsert: true,
    });
  }

  async findDocument<D>(id: ID) {
    const collection = await this.collection();

    try {
      return collection.findOne<D>({ _id: id.value });
    } catch (e) {
      throw new EntityNotExist(this.entityName, id.value.toString());
    }
  }

  async delete(id: ID): Promise<void> {
    const collection = await this.collection();
    await collection.deleteOne({ _id: id.value });
  }
}
