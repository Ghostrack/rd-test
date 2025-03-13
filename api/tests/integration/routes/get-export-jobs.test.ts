import test, {
  after,
  afterEach,
  describe,
  type TestContext,
} from "node:test";

import { type Job, jobs } from "../../../db/schema/jobs";
import { reset, seed } from "drizzle-seed";

import build from "../../../index";
import { eq } from "drizzle-orm";
import { initTestDatabase } from "../../../utils/database";

describe("GET /exports route integration tests", async () => {
  const app = await build();
  await app.listen();

  const database = await initTestDatabase();

  afterEach(async () => {
    await reset(database, { jobs });
  });

  after(async () => {
    await app.close();
  });

  await test("GET /exports route returns an array with 2 groups of jobs", async (t: TestContext) => {
    t.plan(1);

    await seed(database, { jobs }).refine((functions) => ({
      jobs: {
        columns: {
          name : functions.valuesFromArray({ values: ["export"] }),
          state: functions.valuesFromArray({
            values: [
              {
                values: ["finished"],
                weight: 0.5,
              },
              {
                values: ["pending"],
                weight: 0.5,
              },
            ],
          }),
        },
        count: 4,
      },
    }));

    const response = await app.inject({
      method: "GET",
      url   : "/exports",
    });

    t.assert.strictEqual(response.json().length, 2);
  });

  await test("GET /exports route returns all pending jobs in the pending group", async (t: TestContext) => {
    t.plan(1);

    await seed(database, { jobs }).refine((functions) => ({
      jobs: {
        columns: {
          name : functions.valuesFromArray({ values: ["export"] }),
          state: functions.valuesFromArray({
            values: [
              "finished",
              "pending",
            ],
          }),
        },
        count: 10,
      },
    }));

    const pendingJobsCount = await database.$count(jobs, eq(jobs.state, "pending"));
    const response         = await app.inject({
      method: "GET",
      url   : "/exports",
    }) as { json: () => { jobs: Job[]; state: string }[] };

    const pendingJobsGroup = response.json().find((item) => item.state === "pending")?.jobs ?? [];

    t.assert.strictEqual(pendingJobsGroup.length, pendingJobsCount);
  });

  await test("GET /exports route returns all finished jobs in the finished group", async (t: TestContext) => {
    t.plan(1);

    await seed(database, { jobs }).refine((functions) => ({
      jobs: {
        columns: {
          name : functions.valuesFromArray({ values: ["export"] }),
          state: functions.valuesFromArray({
            values: [
              "finished",
              "pending",
            ],
          }),
        },
        count: 10,
      },
    }));

    const finishedJobsCount = await database.$count(jobs, eq(jobs.state, "finished"));
    const response          = await app.inject({
      method: "GET",
      url   : "/exports",
    }) as { json: () => { jobs: Job[]; state: string }[] };

    const finishedJobsGroup = response.json().find((item) => item.state === "finished")?.jobs ?? [];

    t.assert.strictEqual(finishedJobsGroup.length, finishedJobsCount);
  });

  await test("GET /exports route does not return any import job", async (t: TestContext) => {
    t.plan(2);

    await seed(database, { jobs }).refine((functions) => ({
      jobs: {
        columns: {
          name: functions.valuesFromArray({
            values: [
              "export",
              "import",
            ],
          }),
          state: functions.valuesFromArray({
            values: [
              "finished",
              "pending",
            ],
          }),
        },
        count: 10,
      },
    }));

    const exportJobsCount = await database.$count(jobs, eq(jobs.name, "export"));
    const response        = await app.inject({
      method: "GET",
      url   : "/exports",
    }) as { json: () => { jobs: Job[]; state: string }[] };

    const returnedJobs       = response.json().flatMap((item) => item.jobs);
    const returnedExportJobs = returnedJobs.filter((item) => item.name === "export");
    const returnedImportJobs = returnedJobs.filter((item) => item.name === "import");

    t.assert.strictEqual(returnedImportJobs.length, 0);
    t.assert.strictEqual(returnedExportJobs.length, exportJobsCount);
  });
});
