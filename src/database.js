import pg from "pg";
import { config } from "dotenv";
config();

const pool = new pg.Pool({
  //user: db.user,
  //password: db.password,
  //host: db.host,
  //port: db.port,
  //database: db.database
  connectionString: process.env.DATABASE_URL,
  //ssl: true,
});

export default pool;
