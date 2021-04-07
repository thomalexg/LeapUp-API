exports.up = async (sql) => {
  await sql`
	ALTER TABLE leaps ADD COLUMN email TEXT;
`;
};

exports.down = async (sql) => {
  await sql`
	ALTER TABLE leaps DROP COLUMN email;
`;
};
