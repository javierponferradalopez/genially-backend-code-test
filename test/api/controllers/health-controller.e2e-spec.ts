import request from "supertest";
import httpStatus from "http-status";

describe("HealthController (e2e)", function () {
  let app: unknown;

  beforeAll(() => {
    app = global.SERVER_TEST.app;
  });

  describe("/ (GET)", function () {
    const describedAction = () => request(app).get("/");

    it("should returns ok", async () => {
      const response = await describedAction();

      expect(response.status).toEqual(httpStatus.OK);
    });
  });
});
