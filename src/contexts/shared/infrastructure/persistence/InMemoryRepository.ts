import EntityNotExist from "../../domain/EntityNotExist";
import { IEntity } from "../../domain/IEntity";
import { Primitives, ValueObject } from "../../domain/value-object/ValueObject";

/**
 * Abstract generic adapter for system memory.
 * Requires specification of concrete entity and identification classes.
 *
 * @abstract
 * @template E type of entity to be managed
 * @template ID unique identifier type for the entity
 */
export abstract class InMemoryRepository<
  E extends IEntity<ID>,
  ID extends ValueObject<Primitives>,
> {
  protected abstract get entityName(): string;
  private store: E[] = [];

  async save(entity: E): Promise<void> {
    await this.delete(entity.id);
    this.store.push(entity);
  }

  async find(id: ID): Promise<E> {
    const genially = this.store.find((entity) => entity.id.equals(id));

    if (genially) return genially;

    throw new EntityNotExist(this.entityName, id.value.toString());
  }

  async delete(id: ID): Promise<void> {
    this.store = this.store
      .filter((genially) => !genially.id.equals(id));
  }
}
