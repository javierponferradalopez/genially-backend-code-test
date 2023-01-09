import { Primitives, ValueObject } from "./value-object/ValueObject";

/**
 * Contract describing the minimum requirements for an entity.
 * Requires specification of concrete identification classes.
 *
 * @interface
 * @template ID unique identifier type for the entity
 */
export interface IEntity<ID extends ValueObject<Primitives>> {
  get id(): ID;

  toPrimitives(): Record<string, unknown>;
}
