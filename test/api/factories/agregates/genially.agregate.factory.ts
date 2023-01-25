import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import container from "../../../../src/api/dependency-injection";
import Genially from "../../../../src/contexts/core/genially/domain/Genially";
import { GeniallyDescription } from "../../../../src/contexts/core/genially/domain/GeniallyDescription";
import { GeniallyId } from "../../../../src/contexts/core/genially/domain/GeniallyId";
import { GeniallyName } from "../../../../src/contexts/core/genially/domain/GeniallyName";
import GeniallyRepository from "../../../../src/contexts/core/genially/domain/GeniallyRepository";

export const GeniallyFactory = Factory.define<Genially>(({ onCreate }) => {
  onCreate(async (genially) => {
    const geniallyRepository = container.get<
      GeniallyRepository
    >("core.genially.domain.geniallyRepository");

    await geniallyRepository.save(genially);

    return genially;
  });
  return Genially.create(
    new GeniallyId(faker.datatype.uuid()),
    new GeniallyName(faker.random.alpha(GeniallyName.MAX_LENGTH)),
    new GeniallyDescription(
      faker.random.alpha(GeniallyDescription.MAX_LENGTH),
    ),
  );
});
