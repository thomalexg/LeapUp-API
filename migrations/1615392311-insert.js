const roles = [
  {
    role: 'admin',
  },
  {
    role: 'moderator',
  },
  {
    role: 'user',
  },
];

const users = [
  {
    password_hash: '1714fa58aa2976dac8e9b6adf3661888',
    username: 'thomalex',
    email: 'thomas@fakemail.com',
    role_id: 1,
  },
];

const categories = [
  {
    background_color: '#fc5c65',
    icon: 'guitar-acoustic',
    category: 'Music',
  },
  {
    background_color: '#fd9644',
    icon: 'language-javascript',
    category: 'Programming',
  },
  {
    background_color: '#fed330',
    icon: 'camera',
    category: 'Photography',
  },
  {
    background_color: '#26de81',
    icon: 'cards',
    category: 'Games',
  },
  {
    background_color: '#2bcbba',
    icon: 'shoe-heel',
    category: 'Clothing',
  },
  {
    background_color: '#45aaf2',
    icon: 'basketball',
    category: 'Sports',
  },
  {
    background_color: '#4b7bec',
    icon: 'video',
    category: 'Videography',
  },
  {
    background_color: '#a55eea',
    icon: 'book-open-variant',
    category: 'Books',
  },
  {
    background_color: '#a55eea',
    icon: 'format-paint',
    category: 'Design',
  },
  {
    background_color: '#778ca3',
    icon: 'application',
    category: 'Other',
  },
];

const leaps = [
  {
    title: 'Hello to LeapUp!',
    description:
      'LeapUp helps you to find people who want to learn the same things that you want to learn. So just go through the Leaps and see if someone wants to learn the same as you. And if you don´t find any Leap, ust create your own Leap and wait for people reaching out to you.',
    user_id: 1,
    category_id: 10,
    username: thomalex,
  },
];

const location = [
  {
    city: 'Vienna',
    state: 'Vienna',
    country: 'Austria',
  },
  {
    city: 'Stuttgart',
    state: 'Baden-Wuerttemberg',
    country: 'Germany',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO categories ${sql(
    categories,
    'background_color',
    'icon',
    'category',
  )};
	`;
  await sql`
	 INSERT INTO role ${sql(roles, 'role')};
	 `;
  await sql`
		INSERT INTO "user" ${sql(
      users,
      'password_hash',
      'username',
      'email',
      'role_id',
    )};
		`;
  await sql`
		INSERT INTO "location" ${sql(location, 'city', 'state', 'country')};`;
  await sql`
		 INSERT INTO leaps ${sql(
       leaps,
       'title',
       'description',
       'user_id',
       'category_id',
     )};
		 `;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM
	 leaps
`;
  await sql`
  DELETE FROM
   "location"
  `;
  await sql`
DELETE FROM
 "user"
`;
  await sql`
DELETE FROM
 role
`;
  await sql`
DELETE FROM
 categories
`;
};
