exports.up = async (sql) => {
  await sql`
	ALTER TABLE leaps ADD COLUMN
	expiry TIMESTAMP NOT NULL DEFAULT NOW() + INTERVAL '720 hours'
	`;
};

exports.down = async (sql) => {
  await sql`
	ALTER TABLE leaps DROP COLUMN expiry
	`;
};
