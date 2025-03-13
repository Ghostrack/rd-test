import { initTestDatabase } from "../utils/database";
import seed from "../db/seed";

/** Global test setup function. */
const setup = async () => {
  await initTestDatabase();
  await seed();
};

export {
  setup,
};
