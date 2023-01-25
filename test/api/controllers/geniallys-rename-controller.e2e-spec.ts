import request from "supertest";
import httpStatus from "http-status";
import { GeniallysRenameRequestFactory } from "../factories/requests/geniallys-rename.request.factory";
import { GeniallyFactory } from "../factories/agregates/genially.agregate.factory";
import { faker } from "@faker-js/faker";
import { GeniallyName } from "../../../src/contexts/core/genially/domain/GeniallyName";
import { UuidValueObject } from "../../../src/contexts/shared/domain/value-object/UuidValueObject";
import container from "../../../src/api/dependency-injection";
import GeniallyRepository from "../../../src/contexts/core/genially/domain/GeniallyRepository";

describe("GeniallysRenameController (e2e)", function () {
  let app: unknown;

  const geniallyRepository = container.get<GeniallyRepository>(
    "core.genially.domain.geniallyRepository",
  );

  beforeAll(() => {
    app = global.SERVER_TEST.app;
  });

  describe("/api/genially/:id (PATCH)", function () {
    const describedAction = (id: string) =>
      request(app).patch(`/api/genially/${id}`);

    it("should returns OK when body is correctly", async () => {
      const actualGenially = await GeniallyFactory.create();
      const body = GeniallysRenameRequestFactory.build();
      const response = await describedAction(actualGenially.id.value).send(
        body,
      );

      expect(response.status).toEqual(httpStatus.NO_CONTENT);

      // resource is updated
      const geniallyUpdated = await geniallyRepository.find(actualGenially.id);
      expect(geniallyUpdated.name.value).toEqual(body.name);
    });

    it("should returns UNPROCESSABLE error when body is invalid", async () => {
      const actualGenially = await GeniallyFactory.create();

      const expectError = async (fieldWithError: string, value: unknown) => {
        const body = { [fieldWithError]: value };
        const response = await describedAction(actualGenially.id.value).send(
          body,
        );
        expect(response.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
        expect(Object.keys(response.body.errors)).toMatchObject(
          expect.arrayContaining([fieldWithError]),
        );
      };

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
    });

    it("should returns NOT_FOUND when id not exist", async () => {
      const body = GeniallysRenameRequestFactory.build();
      const response = await describedAction(UuidValueObject.random().value)
        .send(
          body,
        );

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it("should returns NOT_FOUND when genially has been previously deleted", async () => {
      const actualGenially = await GeniallyFactory.create();
      actualGenially.deletedAt = new Date();
      geniallyRepository.save(actualGenially);

      const body = GeniallysRenameRequestFactory.build();
      const response = await describedAction(actualGenially.id.value)
        .send(
          body,
        );

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });
  });
});
