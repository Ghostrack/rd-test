import getExportJobs from "./get-export-jobs";
import getImportJobs from "./get-import-jobs";
import queueExportJob from "./queue-export-job";
import queueImportJob from "./queue-import-job";

import type { FastifyInstance } from "fastify";

/**
 * Job routes.
 *
 * @param fastify Fastify Instance.
 */
export default function jobsRouter(fastify: FastifyInstance): void {
  // GET /exports - Get all export jobs.
  fastify.register(getExportJobs);

  // GET /imports - Get all import jobs.
  fastify.register(getImportJobs);

  // POST /imports - Queue a new import job.
  fastify.register(queueImportJob);

  // POST /exports - Queue a new export job.
  fastify.register(queueExportJob);
}
