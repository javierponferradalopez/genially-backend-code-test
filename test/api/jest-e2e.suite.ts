/**
 * This function takes care of deleting the database for each test suite. Ensuring that there is
 * never a data conflict between tests
 */
beforeAll(async () => {
  await global.SERVER_TEST.dropDB();
});
