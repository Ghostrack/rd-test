import JobService from "../../services/job-service";

import type { FastifyInstance } from "fastify";
import type { Job } from "../../db/schema/jobs";

/** Get import jobs route types. */
export interface GetImportJobsType {

  /** Response type. */
  Reply: {

    /** Jobs for the current group's state. */
    jobs: Job[];

    /** Current group's state. */
    state: string;

  }[];

}

/**
 * GET /imports route definition.
 * Retrieve all import jobs.
 *
 * @param fastify Fastify Instance.
 */
export default function getImportJobs(fastify: FastifyInstance): void {
  fastify.get<GetImportJobsType>(
    "/imports",
    async (request, reply) => {
      const jobs = await JobService.getGrouped("import");

      reply.send(jobs);
    },
  );
}
