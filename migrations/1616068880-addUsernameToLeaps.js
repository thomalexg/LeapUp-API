exports.up = async (sql) => {
  await sql`
	ALTER TABLE leaps ADD COLUMN username VARCHAR(50);
`;
};

exports.down = async (sql) => {
  await sql`
	ALTER TABLE leaps DROP COLUMN username;
`;
};
