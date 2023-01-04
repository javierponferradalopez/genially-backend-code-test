import { GeniallyId } from "../domain/GeniallyId";
import GeniallyNotExist from "../domain/GeniallyNotExist";
import GeniallyRepository from "../domain/GeniallyRepository";

type DeleteGeniallyServiceRequest = {
  id: string;
};

export default class DeleteGeniallyService {
  constructor(private repository: GeniallyRepository) {}

  public async execute(req: DeleteGeniallyServiceRequest): Promise<void> {
    const id = new GeniallyId(req.id);

    const genially = await this.repository.find(id);

    // throw exception when genially already deleted
    if (genially.isDeleted()) throw new GeniallyNotExist(id);

    genially.updateDeletedAt(new Date());

    return this.repository.save(genially);
  }
}
