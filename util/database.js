import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';
import { generateToken } from './session';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

setPostgresDefaultsOnHeroku();
// Read in the values from the .env file
// (which should be ignored in Git!)
require('dotenv-safe').config();

// Connect only once to the database
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370

function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production') {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.__postgresSqlClient) {
      globalThis.__postgresSqlClient = postgres();
    }
    sql = globalThis.__postgresSqlClient;
  }
  return sql;
}

function camelcaseRecords(records) {
  return records.map((record) => camelcaseKeys(record));
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

export async function getLeaps() {
  const leaps = await sql`
  SELECT * FROM leaps
  `;
  return camelcaseRecords(leaps);
}

export async function addLeap(title, description, category_id) {
  const addLeap = await sql`
    INSERT INTO leaps
      (title, description, user_id, category_id)
    VALUES
      (${title}, ${description}, 1, ${category_id})
    RETURNING *
    `;

  return camelcaseRecords(addLeap);
}

export async function getCategories() {
  const categories = await sql`
  SELECT * FROM categories
  `;
  return camelcaseRecords(categories);
}

export async function getSafedLeaps(user_id) {
  const categories = await sql`
  SELECT * FROM categories
  `;
  return camelcaseRecords(categories);
}

export async function getUserWithHash(username) {
  const user = await sql`
  SELECT * FROM "user" WHERE username = "user".user_name
  `;
  return camelcaseRecords(user);
}

// sessions
export async function createSessionWithFiveMinuteExpiry() {
  const token = generateToken();

  const sessions = await sql`
    INSERT INTO sessions
      (token, expiry)
    VALUES
      (${token}, NOW() + INTERVAL '5 minutes')
    RETURNING *
  `;

  return camelcaseRecords(sessions)[0];
}

export async function deleteAllExpiredSessions() {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      expiry < NOW()
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

export async function deleteSessionById(id) {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      id = ${id}
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}

export async function deleteSessionByToken(token) {
  const sessions = await sql`
    DELETE FROM
      sessions
    WHERE
      token = ${token}
    RETURNING *
  `;
  return camelcaseRecords(sessions)[0];
}
