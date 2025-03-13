import test, {
  after,
  describe,
  type TestContext,
} from "node:test";

import {
  EXPORT_EPUB_JOB_PROCESSING_TIME,
  EXPORT_PDF_JOB_PROCESSING_TIME,
  IMPORT_JOB_PROCESSING_TIME,
} from "../../../utils/queue";

import build from "../../../index";
import { initTestDatabase } from "../../../utils/database";
import JobsService from "../../../services/job-service";
import { setTimeout } from "node:timers/promises";

// eslint-disable-next-line @typescript-eslint/no-floating-promises,max-lines-per-function
describe("mock queue integration tests", async () => {
  const app = await build();
  await app.listen();

  await initTestDatabase();

  after(async () => {
    await app.close();
  });

  await test("POST /exports export epub job is processed after expected time", async (t: TestContext) => {
    t.plan(3);

    const response = await app.inject({
      body: {
        bookId: "2",
        type  : "epub",
      },
      method: "POST",
      url   : "/exports",
    });

    t.assert.strictEqual(response.json().state, "pending");

    await setTimeout(EXPORT_EPUB_JOB_PROCESSING_TIME / 2);

    let job = await JobsService.find(response.json().id);

    t.assert.strictEqual(job.state, "pending");

    await setTimeout(EXPORT_EPUB_JOB_PROCESSING_TIME / 2);

    job = await JobsService.find(response.json().id);

    t.assert.strictEqual(job.state, "finished");
  });

  await test("POST /exports export pdf job is processed after expected time", async (t: TestContext) => {
    t.plan(3);

    const response = await app.inject({
      body: {
        bookId: "3",
        type  : "pdf",
      },
      method: "POST",
      url   : "/exports",
    });

    t.assert.strictEqual(response.json().state, "pending");

    await setTimeout(EXPORT_PDF_JOB_PROCESSING_TIME / 2);

    let job = await JobsService.find(response.json().id);

    t.assert.strictEqual(job.state, "pending");

    await setTimeout(EXPORT_PDF_JOB_PROCESSING_TIME / 2);

    job = await JobsService.find(response.json().id);

    t.assert.strictEqual(job.state, "finished");
  });

  await test("POST /exports export job updatedAt field is updated after processing", async (t: TestContext) => {
    t.plan(1);

    const response = await app.inject({
      body: {
        bookId: "1",
        type  : "epub",
      },
      method: "POST",
      url   : "/exports",
    });

    const originalUpdatedAt = response.json().updatedAt;

    await setTimeout(EXPORT_EPUB_JOB_PROCESSING_TIME);
    await setTimeout(1000);

    const job = await JobsService.find(response.json().id);

    t.assert.strictEqual(new Date(job.updatedAt) > new Date(originalUpdatedAt), true);
  });

  await test("POST /exports two concurrent jobs are processed after expected time", async (t: TestContext) => {
    t.plan(6);

    const response1 = await app.inject({
      body: {
        bookId: "1",
        type  : "pdf",
      },
      method: "POST",
      url   : "/exports",
    });

    await setTimeout(EXPORT_PDF_JOB_PROCESSING_TIME / 2);

    const response2 = await app.inject({
      body: {
        bookId: "1",
        type  : "pdf",
      },
      method: "POST",
      url   : "/exports",
    });

    let job1 = await JobsService.find(response1.json().id);
    let job2 = await JobsService.find(response2.json().id);

    t.assert.strictEqual(job1.state, "pending");
    t.assert.strictEqual(job2.state, "pending");

    await setTimeout(EXPORT_PDF_JOB_PROCESSING_TIME / 2);

    job1 = await JobsService.find(response1.json().id);
    job2 = await JobsService.find(response2.json().id);

    t.assert.strictEqual(job1.state, "finished");
    t.assert.strictEqual(job2.state, "pending");

    await setTimeout(EXPORT_PDF_JOB_PROCESSING_TIME / 2);

    job1 = await JobsService.find(response1.json().id);
    job2 = await JobsService.find(response2.json().id);

    t.assert.strictEqual(job1.state, "finished");
    t.assert.strictEqual(job2.state, "finished");
  });

  await test("POST /imports pdf import job is processed after expected time", async (t: TestContext) => {
    t.plan(3);

    const response = await app.inject({
      body: {
        bookId: "123",
        type  : "pdf",
        url   : "https://testing.com",
      },
      method: "POST",
      url   : "/imports",
    });

    t.assert.strictEqual(response.json().state, "pending");

    await setTimeout(IMPORT_JOB_PROCESSING_TIME / 2);

    let job = await JobsService.find(response.json().id);

    t.assert.strictEqual(job.state, "pending");

    await setTimeout(IMPORT_JOB_PROCESSING_TIME / 2);

    job = await JobsService.find(response.json().id);

    t.assert.strictEqual(job.state, "finished");
  });

  await test("POST /imports import word job is processed after expected time", async (t: TestContext) => {
    t.plan(3);

    const response = await app.inject({
      body: {
        bookId: "123",
        type  : "word",
        url   : "https://testing.com",
      },
      method: "POST",
      url   : "/imports",
    });

    t.assert.strictEqual(response.json().state, "pending");

    await setTimeout(IMPORT_JOB_PROCESSING_TIME / 2);

    let job = await JobsService.find(response.json().id);

    t.assert.strictEqual(job.state, "pending");

    await setTimeout(IMPORT_JOB_PROCESSING_TIME / 2);

    job = await JobsService.find(response.json().id);

    t.assert.strictEqual(job.state, "finished");
  });

  await test("POST /import two concurrent jobs are processed after expected time", async (t: TestContext) => {
    t.plan(6);

    const response1 = await app.inject({
      body: {
        bookId: "123",
        type  : "pdf",
        url   : "https://testing.com",
      },
      method: "POST",
      url   : "/imports",
    });

    await setTimeout(IMPORT_JOB_PROCESSING_TIME / 2);

    const response2 = await app.inject({
      body: {
        bookId: "123",
        type  : "pdf",
        url   : "https://testing.com",
      },
      method: "POST",
      url   : "/imports",
    });

    let job1 = await JobsService.find(response1.json().id);
    let job2 = await JobsService.find(response2.json().id);

    t.assert.strictEqual(job1.state, "pending");
    t.assert.strictEqual(job2.state, "pending");

    await setTimeout(IMPORT_JOB_PROCESSING_TIME / 2);

    job1 = await JobsService.find(response1.json().id);
    job2 = await JobsService.find(response2.json().id);

    t.assert.strictEqual(job1.state, "finished");
    t.assert.strictEqual(job2.state, "pending");

    await setTimeout(IMPORT_JOB_PROCESSING_TIME / 2);

    job1 = await JobsService.find(response1.json().id);
    job2 = await JobsService.find(response2.json().id);

    t.assert.strictEqual(job1.state, "finished");
    t.assert.strictEqual(job2.state, "finished");
  });

  await test("POST /imports import job updatedAt field is updated after processing", async (t: TestContext) => {
    t.plan(1);

    const response = await app.inject({
      body: {
        bookId: "123",
        type  : "pdf",
        url   : "https://testing.com",
      },
      method: "POST",
      url   : "/imports",
    });

    const originalUpdatedAt = response.json().updatedAt;

    await setTimeout(IMPORT_JOB_PROCESSING_TIME);
    await setTimeout(1000);

    const job = await JobsService.find(response.json().id);

    t.assert.strictEqual(new Date(job.updatedAt) > new Date(originalUpdatedAt), true);
  });
});
