import { Collection, MongoClient } from "mongodb";
import EntityNotExist from "../../../domain/EntityNotExist";
import { AgregateRoot } from "../../../domain/AgregateRoot";

/**
 * Abstract generic adapter for mongo database connection.
 * Requires specification of concrete entity classes.
 *
 * @abstract
 * @template E type of entity to be managed
 */
export abstract class MongoRepository<
  E extends AgregateRoot,
> {
  constructor(private readonly _client: Promise<MongoClient>) {}

  protected abstract get agregateRootName(): string;

  protected abstract get collectionName(): string;

  protected async collection(): Promise<Collection> {
    return (await this._client).db().collection(this.collectionName);
  }

  async persist(id: string, entity: E): Promise<void> {
    const collection = await this.collection();

    const document: Record<string, unknown> = {
      ...entity.toPrimitives(),
      _id: id,
      // discard entity identifier to use the mongo identifier
      id: undefined,
    };

    await collection.replaceOne({ _id: id }, document, {
      upsert: true,
    });
  }

  async findDocument<D>(id: string) {
    const collection = await this.collection();

    try {
      return collection.findOne<D>({ _id: id });
    } catch (e) {
      throw new EntityNotExist(this.agregateRootName, id);
    }
  }
}
