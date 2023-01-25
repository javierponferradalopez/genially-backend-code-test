import request from "supertest";
import waitForExpect from "wait-for-expect";
import httpStatus from "http-status";
import { faker } from "@faker-js/faker";
import { GeniallysCreateRequestFactory } from "../factories/requests/geniallys-create.request.factory";
import { GeniallyName } from "../../../src/contexts/core/genially/domain/GeniallyName";
import { GeniallyDescription } from "../../../src/contexts/core/genially/domain/GeniallyDescription";
import container from "../../../src/api/dependency-injection";
import GeniallyRepository from "../../../src/contexts/core/genially/domain/GeniallyRepository";
import GeniallysCounterRepository from "../../../src/contexts/core/geniallys-counter/domain/GeniallysCounterRepository";
import { GeniallyId } from "../../../src/contexts/core/genially/domain/GeniallyId";
import { GeniallyFactory } from "../factories/agregates/genially.agregate.factory";

describe("GeniallysCreateController (e2e)", function () {
  let app: unknown;

  const geniallyRepository = container.get<GeniallyRepository>(
    "core.genially.domain.geniallyRepository",
  );
  const geniallysCounterRepository = container.get<
    GeniallysCounterRepository
  >(
    "core.geniallysCounter.domain.geniallysCounterRepository",
  );

  beforeAll(() => {
    app = global.SERVER_TEST.app;
  });

  describe("/api/genially (POST)", function () {
    const describedAction = () => request(app).post("/api/genially");

    it("should returns CREATED when body is correctly", async () => {
      const body = GeniallysCreateRequestFactory.build();
      const response = await describedAction().send(body);

      expect(response.status).toEqual(httpStatus.CREATED);

      const idCreated = new GeniallyId(body.id);

      // resource created
      const geniallyCreated = await geniallyRepository.find(idCreated);
      expect(geniallyCreated).toBeTruthy();

      // counter updated after creation
      await waitForExpect(async () => {
        const counterUpdated = await geniallysCounterRepository.first();
        expect(counterUpdated.hasIncremented(idCreated)).toBeTruthy();
      });
    });

    it("should replace the resource when it has previously existed but is now deleted", async () => {
      // create genially delted
      const geniallyDeleted = await GeniallyFactory.create();
      geniallyDeleted.deletedAt = new Date();
      geniallyRepository.save(geniallyDeleted);

      const body = GeniallysCreateRequestFactory.build({
        id: geniallyDeleted.id.value,
      });
      const response = await describedAction().send(body);

      expect(response.status).toEqual(httpStatus.CREATED);

      const idCreated = new GeniallyId(body.id);

      // resource created refreshing old data
      const geniallyCreated = await geniallyRepository.find(idCreated);
      expect(geniallyCreated.id).toEqual(geniallyDeleted.id);
      expect(geniallyCreated.deletedAt).toBeFalsy();
    });

    it("should returns UNPROCESSABLE error when body is invalid", async () => {
      const expectError = async (fieldWithError: string, value: unknown) => {
        const body = { [fieldWithError]: value };
        const response = await describedAction().send(body);
        expect(response.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
        expect(Object.keys(response.body.errors)).toMatchObject(
          expect.arrayContaining([fieldWithError]),
        );
      };

      // id
      const idField = "id";
      await expectError(idField, "");
      await expectError(idField, "invalid");

      // name
      const nameField = "name";
      await expectError(nameField, "");
      await expectError(nameField, 1234);
      await expectError(
        nameField,
        faker.random.alphaNumeric(GeniallyName.MIN_LENGTH - 1),
      );
      await expectError(
        nameField,
        faker.random.alphaNumeric(GeniallyName.MAX_LENGTH + 1),
      );

      // description
      const descriptionField = "description";
      await expectError(descriptionField, 1234);
      await expectError(
        descriptionField,
        faker.random.alphaNumeric(GeniallyDescription.MAX_LENGTH + 1),
      );
    });
  });
});
