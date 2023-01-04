import { InvalidArgumentError } from "../../../shared/domain/value-object/InvalidArgumentError";
import { StringValueObject } from "../../../shared/domain/value-object/StringValueObject";

export class GeniallyName extends StringValueObject {
  constructor(value: string) {
    super(value);
    this.ensureIsValid(value);
  }

  private ensureIsValid(value: string) {
    if (!value || value === "") {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does not allow empty value`,
      );
    } else if (value.length < 3 || value.length > 20) {
      throw new InvalidArgumentError(
        `<${this.constructor.name}> does allow chain lengths between 3 and 20`,
      );
    }
  }
}
