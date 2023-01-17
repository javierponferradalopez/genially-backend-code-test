import { InvalidArgumentError } from "../../../shared/domain/value-object/InvalidArgumentError";
import { StringValueObject } from "../../../shared/domain/value-object/StringValueObject";

export class GeniallyName extends StringValueObject {
  static MAX_LENGTH = 20;
  static MIN_LENGTH = 3;

  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string) {
    if (!value || value === "") {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow empty value`,
      );
    } else if (
      value.length < GeniallyName.MIN_LENGTH ||
      value.length > GeniallyName.MAX_LENGTH
    ) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does allow chain lengths between 3 and 20`,
      );
    }
  }
}
