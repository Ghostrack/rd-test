import test, {
  after,
  describe,
  type TestContext,
} from "node:test";

import build from "../../../index";
import { initTestDatabase } from "../../../utils/database";
import JobsService from "../../../services/job-service";

// eslint-disable-next-line @typescript-eslint/no-floating-promises,max-lines-per-function
describe("POST /imports route integration tests", async () => {
  const app = await build();
  await app.listen();

  await initTestDatabase();

  after(async () => {
    await app.close();
  });

  await test("POST /imports route returns created import job", async (t: TestContext) => {
    t.plan(5);

    const response = await app.inject({
      body: {
        bookId: "123",
        type  : "pdf",
        url   : "https://testing.com",
      },
      method: "POST",
      url   : "/imports",
    });

    const jobs = await JobsService.get("import");

    t.assert.strictEqual(response.statusCode, 200);
    t.assert.strictEqual(jobs.length, 1);
    t.assert.strictEqual(jobs[0].id, response.json().id);
    t.assert.strictEqual(jobs[0].name, "import");
    t.assert.strictEqual(jobs[0].body.bookId, "123");
  });
});
