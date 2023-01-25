import { faker } from "@faker-js/faker";
import { Factory } from "fishery";
import { GeniallysRenameRequestBody } from "../../../../src/api/controllers/GeniallysRenameController";
import { GeniallyName } from "../../../../src/contexts/core/genially/domain/GeniallyName";

export const GeniallysRenameRequestFactory = Factory.define<
  GeniallysRenameRequestBody
>(
  () => ({
    name: faker.random.alpha(GeniallyName.MAX_LENGTH),
  }),
);
