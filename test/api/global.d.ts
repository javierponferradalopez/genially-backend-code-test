import { ServerTest } from "./utils/server-test";

// Type global variables for e2e test environment
declare global {
  var SERVER_TEST: InstanceType<typeof ServerTest>;
}

export {};
