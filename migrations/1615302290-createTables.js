exports.up = async (sql) => {
  await sql`CREATE TABLE IF NOT EXISTS categories (
		id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		category VARCHAR(150) NOT NULL,
		background_color VARCHAR(30) NOT NULL,
		icon VARCHAR(100) NOT NULL
	);`;

  await sql`CREATE TABLE IF NOT EXISTS role (
				id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
				role VARCHAR(15) NOT NULL
			);`;
  await sql`CREATE TABLE IF NOT EXISTS "user" (
			id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
			name VARCHAR(100) NOT NULL,
			password_hash VARCHAR(100) NOT NULL,
			username VARCHAR(20) UNIQUE,
			email TEXT,
			role_id integer references role(id)
		);`;

  await sql`CREATE TABLE IF NOT EXISTS "location" (
	id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	city VARCHAR(50),
	state VARCHAR(50),
	country VARCHAR(50)
);`;

  await sql`CREATE TABLE IF NOT EXISTS leaps (
		id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		title VARCHAR(150) NOT NULL,
		description TEXT,
		user_id  integer references "user"(id),
		category_id integer references categories(id),
		location_id integer references "location"(id)
	);`;

  await sql`CREATE TABLE IF NOT EXISTS safed_leaps (
		id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
		leap_id integer references leaps(id),
		user_id integer references "user"(id)
	);`;
};

exports.down = async (sql) => {
  await sql`
	DROP TABLE IF EXISTS safed_leaps`;
  await sql`
	DROP TABLE IF EXISTS leaps`;
  await sql`
	DROP TABLE IF EXISTS "location"`;
  await sql`
	DROP TABLE IF EXISTS "user"`;
  await sql`
	DROP TABLE IF EXISTS role`;
  await sql`
	DROP TABLE IF EXISTS categories`;
};
