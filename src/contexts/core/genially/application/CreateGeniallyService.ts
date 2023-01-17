import { EventBus } from "../../../shared/domain/EventBus";
import Genially from "../domain/Genially";
import { GeniallyDescription } from "../domain/GeniallyDescription";
import { GeniallyId } from "../domain/GeniallyId";
import { GeniallyName } from "../domain/GeniallyName";
import GeniallyRepository from "../domain/GeniallyRepository";

type CreateGeniallyServiceRequest = {
  id: string;
  name: string;
  description: string;
};

export default class CreateGeniallyService {
  constructor(
    private _repository: GeniallyRepository,
    private _eventBus: EventBus,
  ) {}

  public async execute(req: CreateGeniallyServiceRequest): Promise<Genially> {
    const { id, name, description } = req;

    const genially = Genially.create(
      new GeniallyId(id),
      new GeniallyName(name),
      new GeniallyDescription(description),
    );

    await this._repository.save(genially);

    // publish events by genially
    await this._eventBus.publish(genially.pullDomainEvents());

    return genially;
  }
}
