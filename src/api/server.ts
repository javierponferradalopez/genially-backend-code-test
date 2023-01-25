import { json as jsonParse, urlencoded } from "body-parser";
import errorHandler from "errorhandler";
import compression from "compression";
import express from "express";
import lusca from "lusca";
import homeRoutes from "./routes/home";
import * as http from "http";
import geniallyRoutes from "./routes/genially";
import { Env } from "../contexts/shared/infrastructure/config";

export class Server {
  private _express: express.Express;
  private _httpServer?: http.Server;

  constructor({ port, env }: { port: string; env: Env }) {
    this._express = express();
    this._express.set("port", port);
    this._express.set("env", env);

    this._express.use(compression());
    this._express.use(jsonParse());
    this._express.use(urlencoded({ extended: true }));
    this._express.use(lusca.xframe("SAMEORIGIN"));
    this._express.use(lusca.xssProtection(true));

    if (env !== Env.PRODUCTION) this._express.use(errorHandler());

    this.registerRoutes();
  }

  async listen(): Promise<void> {
    return new Promise((resolve) => {
      this._httpServer = this._express.listen(this._express.get("port"), () => {
        console.log(
          "  App is running at http://localhost:%d in %s mode",
          this._express.get("port"),
          this._express.get("env"),
        );
        console.log("  Press CTRL-C to stop\n");
        resolve();
      });
    });
  }

  get app() {
    return this._express;
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this._httpServer) {
        this._httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          console.log("App stopped!!");
          return resolve();
        });
      }

      return resolve();
    });
  }

  private registerRoutes() {
    this._express.use("/", homeRoutes);
    this._express.use("/api/genially", geniallyRoutes);
  }
}
