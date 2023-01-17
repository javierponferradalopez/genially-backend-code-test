import { InvalidArgumentError } from "../../../shared/domain/value-object/InvalidArgumentError";
import { StringValueObject } from "../../../shared/domain/value-object/StringValueObject";

export class GeniallyDescription extends StringValueObject {
  static MAX_LENGTH = 125;

  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string) {
    if (value.length > GeniallyDescription.MAX_LENGTH) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does allow chain lengths less than 125`,
      );
    }
  }
}
