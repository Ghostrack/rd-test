import { type Static, Type } from "@sinclair/typebox";

import JobService from "../../services/job-service";
import MockQueue from "../../utils/queue";

import type { FastifyInstance } from "fastify";
import type { Job } from "../../db/schema/jobs";

/** Store Export Job request schema. */
export const storeExportJobRequest = Type.Object({
  bookId: Type.String(),
  type  : Type.Union([
    Type.Literal("epub"),
    Type.Literal("pdf"),
  ]),
});

/** Store Export Job route types. */
export interface QueueExportJobType {

  /** Request body type. */
  Body: Static<typeof storeExportJobRequest>;

  /** Response type. */
  Reply: Job;

}

/**
 * POST /exports route definition.
 * Adds an export job to tbe jobs list.
 *
 * @param fastify Fastify Instance.
 */
export default function queueExportJob(fastify: FastifyInstance): void {
  fastify.post<QueueExportJobType>(
    "/exports",
    {
      schema: {
        body: storeExportJobRequest,
      },
    },
    async (request, reply) => {
      const job = await JobService.store("export", request.body);

      reply.send(job);

      const queue = new MockQueue();

      return queue.add(job);
    },
  );
}
