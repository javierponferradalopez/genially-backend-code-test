import { IEntity } from "../../../shared/domain/IEntity";
import { GeniallyDescription } from "./GeniallyDescription";
import { GeniallyId } from "./GeniallyId";
import { GeniallyName } from "./GeniallyName";

export default class Genially implements IEntity<GeniallyId> {
  private _id: GeniallyId;
  private _name: GeniallyName;
  private _description: GeniallyDescription;
  private _createdAt: Date;
  private _modifiedAt: Date;
  private _deletedAt: Date;

  constructor(
    id: GeniallyId,
    name: GeniallyName,
    description?: GeniallyDescription,
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._createdAt = new Date();
  }

  get id(): GeniallyId {
    return this._id;
  }

  get name(): GeniallyName {
    return this._name;
  }

  set name(newVal: GeniallyName) {
    this._name = newVal;
  }

  get description(): GeniallyDescription {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(newVal: Date) {
    this._createdAt = newVal;
  }

  get modifiedAt(): Date {
    return this._modifiedAt;
  }

  set modifiedAt(newVal: Date) {
    this._modifiedAt = newVal;
  }

  get deletedAt(): Date {
    return this._deletedAt;
  }

  set deletedAt(newVal: Date) {
    this._deletedAt = newVal;
  }

  public isDeleted(): boolean {
    return !!this._deletedAt;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      description: this.description?.value,
      createdAt: this.createdAt,
      modifiedAt: this.modifiedAt,
      deletedAt: this.deletedAt,
    };
  }

  static fromPrimitives(
    data: {
      id: string;
      name: string;
      description: string;
      createdAt: Date;
      modifiedAt: Date;
      deletedAt: Date;
    },
  ): Genially {
    const genially = new Genially(
      new GeniallyId(data.id),
      new GeniallyName(data.name),
      data.description && new GeniallyDescription(data.description),
    );
    genially.createdAt = data.createdAt;
    genially.deletedAt = data.deletedAt;
    genially.modifiedAt = data.modifiedAt;

    return genially;
  }
}
