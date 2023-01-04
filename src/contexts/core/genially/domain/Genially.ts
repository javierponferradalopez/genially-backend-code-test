import { GeniallyDescription } from "./GeniallyDescription";
import { GeniallyId } from "./GeniallyId";
import { GeniallyName } from "./GeniallyName";

export default class Genially {
  private _id: GeniallyId;
  private _name: GeniallyName;
  private _description?: GeniallyDescription;
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

  get description(): GeniallyDescription {
    return this._description;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get modifiedAt(): Date {
    return this._modifiedAt;
  }

  get deletedAt(): Date {
    return this._deletedAt;
  }

  public updateDeletedAt(newVal: Date) {
    this._deletedAt = newVal;
  }

  public updateName(newVal: GeniallyName) {
    this._name = newVal;
  }

  public isDeleted(): boolean {
    return !!this._deletedAt;
  }

  public updateModifiedAt(newVal: Date) {
    this._modifiedAt = newVal;
  }
}
