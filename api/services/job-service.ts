import {
  type CreateJobData,
  type Job,
  jobs,
} from "../db/schema/jobs";

import { eq, sql } from "drizzle-orm";

import { getClient } from "../db";

/**
 * Returns all jobs with the requested name.
 *
 * @param name Requested job name.
 *
 * @returns List of requested jobs.
 */
export const get = async (name: string): Promise<Job[]> => {
  const query = getClient()
    .select()
    .from(jobs)
    .where(eq(jobs.name, name));

  return query;
};

/**
 * Returns all jobs with the requested name,
 * grouped by their current state.
 *
 * @param name Requested job name.
 *
 * @returns List of requested jobs.
 */
export const getGrouped = async (name: string): Promise<{
  jobs : Job[];
  state: string;
}[]> => {
  const query = getClient()
    .selectDistinct({
      jobs : sql<Job[]>`jsonb_agg(jobs)`,
      state: jobs.state,
    })
    .from(jobs)
    .where(eq(jobs.name, name))
    .groupBy(jobs.state);

  return query;
};

/**
 * Returns the job with the passed id, if found.
 *
 * @param id Requested job id.
 *
 * @returns Job with the requested id.
 */
export const find = async (id: number): Promise<Job> => {
  const [job] = await getClient()
    .select()
    .from(jobs)
    .where(eq(jobs.id, id));

  return job;
};

/**
 * Create a new job.
 *
 * @param name Job name.
 * @param data Job body.
 *
 * @returns Created job.
 */
export const store = async (name: string, data: CreateJobData["body"]): Promise<Job> => {
  const [job] = await getClient()
    .insert(jobs)
    .values({
      body: data,
      name,
    })
    .returning();

  return job;
};

/**
 * Update an existing job.
 *
 * @param id   ID of the job to be updated.
 * @param data Data to be updated.
 *
 * @returns Updated job item.
 */
export const update = async (id: number, data: Partial<Job>): Promise<Job> => {
  const [job] = await getClient()
    .update(jobs)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(jobs.id, id))
    .returning();

  return job;
};

export default {
  find,
  get,
  getGrouped,
  store,
  update,
};
