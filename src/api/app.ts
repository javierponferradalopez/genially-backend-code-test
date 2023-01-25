import { MongoClient } from "mongodb";
import { IncrementGeniallysCounterOnGeniallyCreated } from "../contexts/core/geniallys-counter/application/IncrementGeniallysCounterOnGeniallyCreated";
import { EventBus } from "../contexts/shared/domain/EventBus";
import config from "../contexts/shared/infrastructure/config";
import container from "./dependency-injection";
import { Server } from "./server";

export class App {
  private _server?: Server;
  private _dataSource?: MongoClient;

  async start() {
    const port = config.get("port");
    const env = config.get("env");

    this._server = new Server({ port, env });

    await this.configureDataSource();
    this.configureEventBus();

    return this._server.listen();
  }

  async stop() {
    await this._server?.stop();
    await this._dataSource?.close();
  }

  get dataSource() {
    return this._dataSource;
  }

  get app() {
    return this._server?.app;
  }

  private async configureDataSource() {
    this._dataSource = container.get<MongoClient>(
      "shared.infrastructure.persistence.MongoClient",
    );
    await this._dataSource.connect();
  }

  private configureEventBus() {
    // configure event bus
    const eventBus = container.get<EventBus>("shared.infrastructure.eventBus");

    eventBus.addSubscribers([
      // this can be improved by accessing all the subscribers of the dependency container via the tags
      container.get<IncrementGeniallysCounterOnGeniallyCreated>(
        "core.geniallysCounter.application.incrementGeniallysCounterOnGeniallyCreated",
      ),
    ]);
  }
}
