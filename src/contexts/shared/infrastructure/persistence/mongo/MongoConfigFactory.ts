import { MongoConfig } from "./MongoConfig";
import config from "../../config";

/**
 * Factory for single instance mongo configuration
 */
export class MongoConfigFactory {
  static build(): MongoConfig {
    return {
      url: config.get("persistence.mongo.url"),
    };
  }
}
