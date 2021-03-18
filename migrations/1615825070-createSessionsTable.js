exports.up = async (sql) => {
  await sql`
    CREATE TABLE sessions (
      id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
      token VARCHAR(40) UNIQUE,
      expiry TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '24 hours',
      user_id integer references "user"(id)
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE sessions
  `;
};
