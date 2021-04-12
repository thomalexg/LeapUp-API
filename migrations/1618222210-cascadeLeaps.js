exports.up = async (sql) => {
  await sql`
    ALTER TABLE leaps ALTER COLUMN user_id
		TYPE integer references "user"(id) ON DELETE CASCADE;
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE leaps
  `;
};
