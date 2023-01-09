export type Primitives = string | number | boolean | Date;

/**
 * Abstract class that acts as wrapper of the indicated primitive value.
 *
 * @abstract
 * @template T primitive type handled by the class
 */
export abstract class ValueObject<T extends Primitives> {
  readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  equals(other: ValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name &&
      other.value === this.value;
  }

  toString(): string {
    return this.value.toString();
  }
}
