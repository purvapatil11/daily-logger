import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// This prevents multiple connections during hot reloading in development
const globalForDb = global as unknown as { conn: postgres.Sql | undefined };

const conn = globalForDb.conn ?? postgres(process.env.DATABASE_URL!);
if (process.env.NODE_ENV !== 'production') globalForDb.conn = conn;

export const db = drizzle(conn);