import test, {
  after,
  describe,
  type TestContext,
} from "node:test";

import build from "../../../index";
import { initTestDatabase } from "../../../utils/database";

// eslint-disable-next-line @typescript-eslint/no-floating-promises,max-lines-per-function
describe("GET /imports route unit tests", async () => {
  const app = await build();

  await app.listen();
  await initTestDatabase();

  after(async () => {
    await app.close();
  });

  await test("GET /imports route returns 200 if request is valid", async (t: TestContext) => {
    t.plan(1);

    const response = await app.inject({
      method: "GET",
      url   : "/imports",
    });

    t.assert.strictEqual(response.statusCode, 200, "returns a status code of 200");
  });

  await test("GET /imports route returns an array", async (t: TestContext) => {
    t.plan(1);

    const response = await app.inject({
      method: "GET",
      url   : "/imports",
    });

    t.assert.strictEqual(Array.isArray(response.json()), true);
  });
});
