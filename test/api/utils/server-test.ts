import { App } from "../../../src/api/app";

export class ServerTest {
  private appServer?: App;

  get app() {
    return this.appServer?.app;
  }

  async dropDB() {
    await this.appServer?.dataSource.db().dropDatabase();
  }

  start(): Promise<void> {
    this.appServer = new App();
    return this.appServer.start();
  }

  stop(): Promise<void> {
    return this.appServer?.stop();
  }
}

export const serverTest = new ServerTest();
