const pguser = 'postgres';
const pghost = 'localhost';
const pgdatabase = 'postgres';
const pgpassword = '12345';
const pgport = '5432';

const { Pool, Client } = require('pg')
const pool = new Pool({
  user: pguser,
  host: pghost,
  database: pgdatabase,
  password: pgpassword,
  port: pgport,
});

//Example creating a table
pool.query(`
  CREATE TABLE IF NOT EXISTS socket_io_attachments (
      id          bigserial UNIQUE,
      created_at  timestamptz DEFAULT NOW(),
      payload     bytea
  );
`);

module.exports = pool;