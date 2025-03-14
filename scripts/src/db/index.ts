import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

const dbUrl = process.env.DATABASE_URL;

const db = drizzle(dbUrl);

export default db;
