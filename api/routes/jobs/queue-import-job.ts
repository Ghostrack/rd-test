import { type Static, Type } from "@sinclair/typebox";

import JobService from "../../services/job-service";
import MockQueue from "../../utils/queue";

import type { FastifyInstance } from "fastify";
import type { Job } from "../../db/schema/jobs";

/** Store Import Job request schema. */
export const storeImportJobRequest = Type.Object({
  bookId: Type.String(),
  type  : Type.Union([
    Type.Literal("evernote"),
    Type.Literal("pdf"),
    Type.Literal("wattpad"),
    Type.Literal("word"),
  ]),
  url: Type.String(),
});

/** Store Import Job route types. */
export interface QueueImportJobType {

  /** Request body type. */
  Body: Static<typeof storeImportJobRequest>;

  /** Response type. */
  Reply: Job;

}

/**
 * POST /imports route definition.
 * Adds an import job to tbe jobs list.
 *
 * @param fastify Fastify Instance.
 */
export default function queueImportJob(fastify: FastifyInstance): void {
  fastify.post<QueueImportJobType>(
    "/imports",
    {
      schema: {
        body: storeImportJobRequest,
      },
    },
    async (request, reply) => {
      const job = await JobService.store("import", request.body);

      reply.send(job);

      const queue = new MockQueue();

      await queue.add(job);
    },
  );
}
