import test, {
  after,
  describe,
  type TestContext,
} from "node:test";

import build from "../../../index";
import { EXPORT_PDF_JOB_PROCESSING_TIME } from "../../../utils/queue";
import { initTestDatabase } from "../../../utils/database";
import JobsService from "../../../services/job-service";
import { setTimeout } from "node:timers/promises";

// eslint-disable-next-line @typescript-eslint/no-floating-promises,max-lines-per-function
describe("POST /exports route integration tests", async () => {
  const app = await build();
  await app.listen();

  await initTestDatabase();

  after(async () => {
    await app.close();
  });

  await test("POST /exports route returns created export job item", async (t: TestContext) => {
    t.plan(5);

    const response = await app.inject({
      body: {
        bookId: "1",
        type  : "pdf",
      },
      method: "POST",
      url   : "/exports",
    });

    await setTimeout(EXPORT_PDF_JOB_PROCESSING_TIME + 5000);

    const jobs = await JobsService.get("export");

    t.assert.strictEqual(response.statusCode, 200);
    t.assert.strictEqual(jobs.length, 1);
    t.assert.strictEqual(jobs[0].id, response.json().id);
    t.assert.strictEqual(jobs[0].name, "export");
    t.assert.strictEqual(jobs[0].body.bookId, "1");
  });
});
