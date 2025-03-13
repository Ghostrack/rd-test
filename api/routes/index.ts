import jobRoutes from "./jobs";

import type { FastifyInstance } from "fastify";

/**
 * Routes index.
 *
 * @param fastify Fastify Instance.
 */
export default function router(fastify: FastifyInstance): void {
  // Home route.
  fastify.get("/", (request, reply) => {
    reply.send("Hello Reedsy!");
  });

  // Job related routes.
  fastify.register(jobRoutes);
}
