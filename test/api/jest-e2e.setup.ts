import { serverTest } from "./utils/server-test";

/**
 * This function is in charge of starting the web server and assigns this instance in the global
 * variable
 */
export default async function () {
  global.SERVER_TEST = serverTest;

  await global.SERVER_TEST.start();
}
