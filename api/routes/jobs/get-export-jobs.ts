import JobService from "../../services/job-service";

import type { FastifyInstance } from "fastify";
import type { Job } from "../../db/schema/jobs";

/** Get export jobs route types. */
export interface GetExportJobsType {

  /** Response type. */
  Reply: {

    /** Jobs for the current group's state. */
    jobs: Job[];

    /** Current group's state. */
    state: string;

  }[];

}

/**
 * GET /exports route definition.
 * Retrieve all export jobs.
 *
 * @param fastify Fastify Instance.
 */
export default function getExportJobs(fastify: FastifyInstance): void {
  fastify.get<GetExportJobsType>(
    "/exports",
    async (request, reply) => {
      const jobs = await JobService.getGrouped("export");

      reply.send(jobs);
    },
  );
}
