import 'dotenv/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

const dbUrl = process.env.DATABASE_URL

const db = drizzle({ connection: dbUrl, schema })

export default db
