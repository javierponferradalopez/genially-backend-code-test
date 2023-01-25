import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { GeniallysCreateRequestBody } from "../../../../src/api/controllers/GeniallysCreateController";
import { GeniallyDescription } from "../../../../src/contexts/core/genially/domain/GeniallyDescription";
import { GeniallyName } from "../../../../src/contexts/core/genially/domain/GeniallyName";

export const GeniallysCreateRequestFactory = Factory.define<
  GeniallysCreateRequestBody
>(
  () => ({
    id: faker.datatype.uuid(),
    name: faker.random.alpha(GeniallyName.MAX_LENGTH),
    description: faker.random.alpha(GeniallyDescription.MAX_LENGTH),
  }),
);
