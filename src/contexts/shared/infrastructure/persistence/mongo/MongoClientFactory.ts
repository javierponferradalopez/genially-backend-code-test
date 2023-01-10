import { MongoClient } from "mongodb";
import { MongoConfig } from "./MongoConfig";

/**
 * Factory for single instance mongo client
 */
export class MongoClientFactory {
  static build(config: MongoConfig): MongoClient {
    const client = new MongoClient(config.url, {
      ignoreUndefined: true,
    });

    client.connect();

    return client;
  }
}
