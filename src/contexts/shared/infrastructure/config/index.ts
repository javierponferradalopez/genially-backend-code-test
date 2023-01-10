import convict from "convict";

/**
 * Declaring the configuration variables required for the application
 */
const config = convict({
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

export default config;
