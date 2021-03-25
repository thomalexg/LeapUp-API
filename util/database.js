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

export async function getLeaps(token) {
  // console.log(await isSessionTokenNotExpired(token));
  if (!(await isSessionTokenNotExpired(token))) return [];
  // console.log('Are you still running?');
  const leaps = await sql`
  SELECT * FROM leaps
  `;
  // console.log('leaps in database', leaps);
  return camelcaseRecords(leaps);
}

export async function changePasswordByUserId(user_id, passwordHash, token) {
  // console.log(await isSessionTokenNotExpired(token));
  if (!(await isSessionTokenNotExpired(token))) return [];
  // console.log('Are you still running?');
  const user = await sql`
  UPDATE "user" SET password_hash = ${passwordHash} WHERE "user".id = ${user_id}
  `;
  // console.log('leaps in database', leaps);
  return camelcaseRecords(user);
}

export async function changeEmailByUserId(user_id, email, token) {
  // console.log(await isSessionTokenNotExpired(token));
  if (!(await isSessionTokenNotExpired(token))) return [];
  // console.log('Are you still running?');
  const user = await sql`
  UPDATE "user" SET email = ${email} WHERE "user".id = ${user_id}
  `;
  // console.log('leaps in database', leaps);
  return camelcaseRecords(user);
}

export async function getLeapsById(token, user_id) {
  // console.log(await isSessionTokenNotExpired(token));
  if (!(await isSessionTokenNotExpired(token))) return [];
  // console.log('Are you still running?');
  const leaps = await sql`
  SELECT * FROM leaps WHERE user_id = ${user_id}
  `;
  // console.log('leaps in database', leaps);
  return camelcaseRecords(leaps);
}

export async function getFilteredLeaps(token, category_id, location_id) {
  // console.log(await isSessionTokenNotExpired(token));
  if (!(await isSessionTokenNotExpired(token))) return [];
  // console.log('Are you still running?');
  if (!category_id && !location_id) {
    const leaps = await sql`
  SELECT * FROM leaps
  `;
    // console.log('leaps in database', leaps);
    return camelcaseRecords(leaps);
  }
  if (!category_id) {
    const leaps = await sql`
  SELECT * FROM leaps WHERE location_id = ${location_id}
  `;
    return camelcaseRecords(leaps);
  }
  if (!location_id) {
    const leaps = await sql`
  SELECT * FROM leaps WHERE category_id = ${category_id}
  `;
    return camelcaseRecords(leaps);
  }
  const leaps = await sql`
  SELECT * FROM leaps WHERE category_id = ${category_id} AND location_id = ${location_id}
  `;
  return camelcaseRecords(leaps);
}

export async function getLeapsByUsername(token, username) {
  // console.log(await isSessionTokenNotExpired(token));
  if (!(await isSessionTokenNotExpired(token))) return [];
  // console.log('Are you still running?');
  const leaps = await sql`
  SELECT * FROM leaps WHERE username = ${username}
  `;
  // console.log('leaps in database', leaps);
  return camelcaseRecords(leaps);
}

export async function addLeap(
  title,
  location,
  description,
  category_id,
  user_id,
  username,
) {
  const addLeap = await sql`
    INSERT INTO leaps
      (title, description, user_id, category_id, location_id, username)
    VALUES
      (${title}, ${description}, ${user_id}, ${category_id}, ${location}, ${username})
    RETURNING *
    `;

  return camelcaseRecords(addLeap);
}

export async function deleteLeap(leap_id, token) {
  // console.log(await isSessionTokenNotExpired(token));
  if (!(await isSessionTokenNotExpired(token))) return [];
  // console.log('Are you still running?');
  const leaps = await sql`
  DELETE FROM leaps WHERE id = ${leap_id}
  `;
  // console.log('leaps in database', leaps);
  return camelcaseRecords(leaps);
}

export async function deleteFavoriteLeapByLeapId(leap_id, token) {
  // console.log(await isSessionTokenNotExpired(token));
  if (!(await isSessionTokenNotExpired(token))) return [];
  // console.log('Are you still running?');
  const leaps = await sql`
  DELETE FROM safed_leaps WHERE leap_id = ${leap_id}
  `;
  // console.log('leaps in database', leaps);
  return camelcaseRecords(leaps);
}

export async function deleteFavoriteLeap(leap_id, user_id, token) {
  // console.log(await isSessionTokenNotExpired(token));
  if (!(await isSessionTokenNotExpired(token))) return [];
  // console.log('Are you still running?');
  const leaps = await sql`
  DELETE FROM safed_leaps WHERE leap_id = ${leap_id} AND user_id = ${user_id}
  `;
  // console.log('leaps in database', leaps);
  return camelcaseRecords(leaps);
}

export async function getCategories() {
  const categories = await sql`
  SELECT * FROM categories
  `;
  return camelcaseRecords(categories);
}

export async function safeLeap(user_id, leap_id) {
  const safeLeap = await sql`
  INSERT INTO safed_leaps (leap_id, user_id)
  VALUES (${leap_id}, ${user_id}) RETURNING *
  `;
  return camelcaseRecords(safeLeap);
}

export async function getFavoriteLeaps(user_id) {
  const favoriteLeaps = await sql`
   SELECT l.id, l.title, l.description, l.category_id,l.username  FROM leaps as l, safed_leaps as sf WHERE sf.user_id = ${user_id} AND sf.leap_id = l.id
  `;
  return camelcaseRecords(favoriteLeaps);
}

export async function getUserWithHash(username) {
  const user = await sql`
  SELECT * FROM "user" WHERE username = "user".user_name
  `;
  return camelcaseRecords(user);
}

// sessions
export async function getSessionByToken(sessionToken) {
  if (!sessionToken) {
    return undefined;
  }

  const sessions = await sql`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${sessionToken} AND
      expiry > NOW()
  `;
  return camelcaseRecords(sessions)[0];
}

export async function isSessionTokenNotExpired(sessionToken) {
  const sessions = await sql`
    SELECT
      *
    FROM
      sessions
    WHERE
      token = ${sessionToken} AND
      expiry > NOW()
  `;
  return sessions.length > 0;
}

export async function createTokenWhenRegister(user_id) {
  const token = generateToken();

  const sessions = await sql`
    INSERT INTO sessions
      (token, expiry, user_id)
    VALUES
      (${token}, NOW() + INTERVAL '43200 minutes', ${user_id})
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

// user creation and so on
export async function createUser(username, email, passwordHash) {
  const users = await sql`
    INSERT INTO "user"
      (username, email, password_hash)
    VALUES
      (${username}, ${email}, ${passwordHash})
    RETURNING id, username, email
  `;
  return camelcaseRecords(users)[0];
}

export async function getUserWithHashedPasswordByUsername(username) {
  const users = await sql`
    SELECT
      *
    FROM
      "user"
    WHERE
      username = ${username}
  `;
  return camelcaseRecords(users)[0];
}

export async function getUserByUsername(username) {
  const users = await sql`
    SELECT
      username
    FROM
      users
    WHERE
      username = ${username}
  `;
  return camelcaseRecords(users)[0];
}

// Location
export async function getLocations() {
  const location = await sql`
  SELECT * FROM "location"
  `;

  return camelcaseRecords(location);
}
