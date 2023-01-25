import { App } from "../../../src/api/app";
import config, {
  Env,
} from "../../../src/contexts/shared/infrastructure/config";

config.set("env", Env.TEST);
config.set("port", "3001");
config.set("persistence.mongo.url", "mongodb://localhost:27017/backend-test");

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
