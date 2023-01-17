import { InvalidArgumentError } from "../../../shared/domain/value-object/InvalidArgumentError";
import { NumberValueObject } from "../../../shared/domain/value-object/NumberValueObject";

export class GeniallysCounterTotal extends NumberValueObject {
  constructor(value: number) {
    super(value);
    this.ensureIsValid(value);
  }

  static initialize() {
    return new GeniallysCounterTotal(0);
  }

  increment() {
    return new GeniallysCounterTotal(this.value + 1);
  }

  private ensureIsValid(value: number) {
    if (value < 0) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow a negative value`,
      );
    }
  }
}
