import EntityNotExist from "../../domain/EntityNotExist";
import { AgregateRoot } from "../../domain/AgregateRoot";

/**
 * Abstract generic adapter for system memory.
 * Requires specification of concrete entity classes.
 *
 * @abstract
 * @template E type of entity to be managed
 */
export abstract class InMemoryRepository<E extends AgregateRoot> {
  protected abstract get entityName(): string;
  private store: E[] = [];

  async persist(id: string, entity: E): Promise<void> {
    await this.delete(id);
    this.store.push(entity);
  }

  async findById(id: string): Promise<E> {
    const genially = this.store.find((entity) => {
      entity.toPrimitives().id === id;
    });

    if (genially) return genially;

    throw new EntityNotExist(this.entityName, id);
  }

  async delete(id: string): Promise<void> {
    this.store = this.store
      .filter((genially) => genially.toPrimitives().id !== id);
  }
}
