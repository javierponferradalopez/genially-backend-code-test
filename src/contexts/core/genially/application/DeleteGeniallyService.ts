import EntityNotExist from "../../../shared/domain/EntityNotExist";
import Genially from "../domain/Genially";
import { GeniallyId } from "../domain/GeniallyId";
import GeniallyRepository from "../domain/GeniallyRepository";

type DeleteGeniallyServiceRequest = {
  id: string;
};

export default class DeleteGeniallyService {
  constructor(private _repository: GeniallyRepository) {}

  public async execute(req: DeleteGeniallyServiceRequest): Promise<void> {
    const id = new GeniallyId(req.id);

    const genially = await this._repository.find(id);

    // throw exception when genially already deleted
    if (genially.isDeleted()) {
      throw new EntityNotExist(Genially.name, id.value);
    }

    genially.deletedAt = new Date();

    return this._repository.save(genially);
  }
}
