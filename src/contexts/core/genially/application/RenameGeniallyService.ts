import EntityNotExist from "../../../shared/domain/EntityNotExist";
import Genially from "../domain/Genially";
import { GeniallyId } from "../domain/GeniallyId";
import { GeniallyName } from "../domain/GeniallyName";
import GeniallyRepository from "../domain/GeniallyRepository";

export type RenameGeniallyServiceRequest = {
  id: string;
  name: string;
};

export default class RenameGeniallyService {
  constructor(private _repository: GeniallyRepository) {}

  public async execute(req: RenameGeniallyServiceRequest): Promise<void> {
    const id = new GeniallyId(req.id);
    const newName = new GeniallyName(req.name);

    const genially = await this._repository.find(id);

    // throw exception when genially already deleted
    if (genially.isDeleted()) throw new EntityNotExist(Genially.name, id.value);

    genially.name = newName;
    genially.modifiedAt = new Date();

    return this._repository.save(genially);
  }
}
