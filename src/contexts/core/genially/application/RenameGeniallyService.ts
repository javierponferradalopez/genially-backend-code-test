import { GeniallyId } from "../domain/GeniallyId";
import { GeniallyName } from "../domain/GeniallyName";
import GeniallyNotExist from "../domain/GeniallyNotExist";
import GeniallyRepository from "../domain/GeniallyRepository";

type RenameGeniallyServiceRequest = {
  id: string;
  name: string;
};

export default class RenameGeniallyService {
  constructor(private repository: GeniallyRepository) {}

  public async execute(req: RenameGeniallyServiceRequest): Promise<void> {
    const id = new GeniallyId(req.id);
    const newName = new GeniallyName(req.name);

    const genially = await this.repository.find(id);

    // throw exception when genially already deleted
    if (genially.isDeleted()) throw new GeniallyNotExist(id);

    genially.updateName(newName);
    genially.updateModifiedAt(new Date());

    return this.repository.save(genially);
  }
}
