import test, {
  after,
  describe,
  type TestContext,
} from "node:test";

import build from "../../../index";
import { initTestDatabase } from "../../../utils/database";

// eslint-disable-next-line @typescript-eslint/no-floating-promises, max-lines-per-function
describe("POST /exports route unit tests", async () => {
  const app = await build();

  await app.listen();
  await initTestDatabase();

  after(async () => {
    await app.close();
  });

  await test("POST /export route returns 200 if request is valid", async (t: TestContext) => {
    t.plan(1);

    const response = await app.inject({
      body: {
        bookId: "123",
        type  : "pdf",
      },
      method: "POST",
      url   : "/exports",
    });

    t.assert.strictEqual(response.statusCode, 200, "returns a status code of 200");
  });

  await test("POST /exports route returns 400 if no body is passed", async (t: TestContext) => {
    t.plan(1);

    const response = await app.inject({
      method: "POST",
      url   : "/exports",
    });

    t.assert.strictEqual(response.statusCode, 400, "returns a status code of 400");
  });

  await test("POST /export route returns 400 if body is empty", async (t: TestContext) => {
    t.plan(1);

    const response = await app.inject({
      body  : {},
      method: "POST",
      url   : "/exports",
    });

    t.assert.strictEqual(response.statusCode, 400, "returns a status code of 400");
  });

  await test("POST /exports route returns 400 if bookId is empty", async (t: TestContext) => {
    t.plan(1);

    const response = await app.inject({
      body: {
        type: "pdf",
      },
      method: "POST",
      url   : "/exports",
    });

    t.assert.strictEqual(response.statusCode, 400, "returns a status code of 400");
  });

  await test("POST /exports route returns 400 if type is empty", async (t: TestContext) => {
    t.plan(1);

    const response = await app.inject({
      body: {
        bookId: "123",
      },
      method: "POST",
      url   : "/exports",
    });

    t.assert.strictEqual(response.statusCode, 400, "returns a status code of 400");
  });

  await test("POST /exports route returns 400 if type is not one of the expected values", async (t: TestContext) => {
    t.plan(1);

    const response = await app.inject({
      body: {
        bookId: "123",
        type  : "txt",
        url   : "https://testing.com",
      },
      method: "POST",
      url   : "/exports",
    });

    t.assert.strictEqual(response.statusCode, 400, "returns a status code of 400");
  });
});
