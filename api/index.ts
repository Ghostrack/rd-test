import fastify, { type FastifyInstance } from "fastify";

import routes from "./routes";

type Environments = "development" | "test" | "production" | undefined;

/**
 * Initialise the fastify server.
 *
 * @returns Fastify server instance.
 */
export default async function main(): Promise<FastifyInstance> {
  const environment   = process.env.NODE_ENV as Environments ?? "production";
  const loggerOptions = {
    development: {
      transport: {
        options: {
          ignore       : "pid,hostname",
          translateTime: "HH:MM:ss",
        },
        target: "pino-pretty",
      },
    },
    production: true,
    test      : false,
  };

  const server = fastify({ logger: loggerOptions[environment] });

  server.register(routes);
  server.listen({ port: 8080 }, (error) => {
    if (error) {
      server.log.error(error);
      process.exit(1);
    }
  });

  return server;
}
