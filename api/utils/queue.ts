import { setTimeout } from "node:timers/promises";
import { update } from "../services/job-service";

import type { Job } from "../db/schema/jobs";

export const IMPORT_JOB_PROCESSING_TIME      = process.env.NODE_ENV === "test" ? 100 : 60_000;
export const EXPORT_EPUB_JOB_PROCESSING_TIME = process.env.NODE_ENV === "test" ? 100 : 10_000;
export const EXPORT_PDF_JOB_PROCESSING_TIME  = process.env.NODE_ENV === "test" ? 100 : 25_000;

/**
 * Mock queue class.
 * Has a method to add a job to the queue and will process it immediately.
 */
export default class MockQueue {

  /** List of jobs still to be processed in the queue. */
  private readonly jobs: Job[] = [];

  /**
   * Returns the processing time for the specified job.
   *
   * @param job Job to be processed.
   *
   * @returns Job processing time, in milliseconds.
   */
  private static getJobProcessingTime(job: Job): number {
    let processingTime = 0;

    if (job.name === "import") {
      processingTime = IMPORT_JOB_PROCESSING_TIME;
    } else if (job.name === "export") {
      processingTime = job.body.type === "epub"
        ? EXPORT_EPUB_JOB_PROCESSING_TIME
        : EXPORT_PDF_JOB_PROCESSING_TIME;
    }

    return processingTime;
  }

  /**
   * Add a job to the queue.
   *
   * @param job Job to be added to the queue.
   */
  public async add(job: Job): Promise<void> {
    this.jobs.push(job);

    return this.process();
  }

  /** Process all jobs currently in the queue. */
  public async process(): Promise<void> {
    const promises = [];

    for (const job of this.jobs) {
      const processingTime = MockQueue.getJobProcessingTime(job);
      const worker         = async (): Promise<void> => {
        await setTimeout(processingTime);
        await update(job.id, { state: "finished" });
      };

      promises.push(worker());
    }

    await Promise.all(promises);
  }

}
