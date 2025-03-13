import test, { after, describe, type TestContext } from "node:test";

import build from "../../../index";
import { initTestDatabase } from "../../../utils/database";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
describe("GET / route unit tests", async () => {
  const app = await build();

  await app.listen();
  await initTestDatabase();

  after(async () => {
    await app.close();
  });

  await test("GET / route returns 200", async (t: TestContext) => {
    t.plan(1);

    const response = await app.inject({
      method: "GET",
      url   : "/",
    });

    t.assert.strictEqual(response.statusCode, 200);
  });
});
