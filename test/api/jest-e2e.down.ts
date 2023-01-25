// This function is in charge of stopping the web server when all e2e tests are finished.
export default async function () {
  await global.SERVER_TEST.stop();
}
