import convict from "convict";

export enum Env {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
  TEST = "test",
}

/**
 * Declaring the configuration variables required for the application
 */
const config = convict({
  env: {
    doc: "The application environment.",
    format: [Env.PRODUCTION, Env.DEVELOPMENT, Env.TEST],
    default: Env.DEVELOPMENT,
    env: "NODE_ENV",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: "3000",
    env: "PORT",
    arg: "port",
  },
  persistence: {
    mongo: {
      url: {
        doc: "The Mongo connection URL",
        format: String,
        env: "MONGO_URL",
        default: "mongodb://localhost:27017/backend-dev",
      },
    },
  },
});

config.validate({ allowed: "strict" });

export default config;
