const location = [
  {
    city: 'Salzburg',
    state: 'Salzburg',
    country: 'Austria',
  },
  {
    city: 'Innsbruck',
    state: 'Tyrol',
    country: 'Austria',
  },
  {
    city: 'Graz',
    state: 'Styria',
    country: 'Austria',
  },
  {
    city: 'Wiener Neustadt',
    state: 'Lower Austria',
    country: 'Austria',
  },
  {
    city: 'Sankt Pölten',
    state: 'Lower Austria',
    country: 'Austria',
  },
  {
    city: 'Karlsruhe',
    state: 'Baden-Wuerttemberg',
    country: 'Germany',
  },
  {
    city: 'Freiburg',
    state: 'Baden-Wuerttemberg',
    country: 'Germany',
  },
  {
    city: 'Mannheim',
    state: 'Baden-Wuerttemberg',
    country: 'Germany',
  },
  {
    city: 'Ulm',
    state: 'Baden-Wuerttemberg',
    country: 'Germany',
  },
  {
    city: 'Munich',
    state: 'Bavaria',
    country: 'Germany',
  },
  {
    city: 'Nuremberg',
    state: 'Bavaria',
    country: 'Germany',
  },
  {
    city: 'Augsburg',
    state: 'Bavaria',
    country: 'Germany',
  },
  {
    city: 'Leipzig',
    state: 'Saxony',
    country: 'Germany',
  },
  {
    city: 'Dresden',
    state: 'Saxony',
    country: 'Germany',
  },
  {
    city: 'Berlin',
    state: 'Berlin',
    country: 'Germany',
  },
  {
    city: 'Potsdam',
    state: 'Brandenburg',
    country: 'Germany',
  },
  {
    city: 'Hamburg',
    state: 'Hamburg',
    country: 'Germany',
  },
  {
    city: 'Hanover',
    state: 'Lower Saxony',
    country: 'Germany',
  },
  {
    city: 'Hanover',
    state: 'Lower Saxony',
    country: 'Germany',
  },
  {
    city: 'Lüneburg',
    state: 'Lower Saxony',
    country: 'Germany',
  },
  {
    city: 'Kiel',
    state: 'Schleswig-Holstein',
    country: 'Germany',
  },
  {
    city: 'Lübeck',
    state: 'Schleswig-Holstein',
    country: 'Germany',
  },
  {
    city: 'Rostock',
    state: 'Mecklenburg-Western Pomerania',
    country: 'Germany',
  },
  {
    city: 'Bremen',
    state: 'Bremen',
    country: 'Germany',
  },
  {
    city: 'Cologne',
    state: 'North Rhine-Westphalia',
    country: 'Germany',
  },
  {
    city: 'Bonn',
    state: 'North Rhine-Westphalia',
    country: 'Germany',
  },
  {
    city: 'Dusseldorf',
    state: 'North Rhine-Westphalia',
    country: 'Germany',
  },
  {
    city: 'Dortmund',
    state: 'North Rhine-Westphalia',
    country: 'Germany',
  },
  {
    city: 'Aachen',
    state: 'North Rhine-Westphalia',
    country: 'Germany',
  },
  {
    city: 'Münster',
    state: 'North Rhine-Westphalia',
    country: 'Germany',
  },
  {
    city: 'Oldenburg',
    state: 'Lower Saxony',
    country: 'Germany',
  },
  {
    city: 'Darmstadt',
    state: 'Hesse',
    country: 'Germany',
  },
  {
    city: 'Frankfurt am Main',
    state: 'Hesse',
    country: 'Germany',
  },
  {
    city: 'Kassel',
    state: 'Hesse',
    country: 'Germany',
  },
  {
    city: 'Marburg',
    state: 'Hesse',
    country: 'Germany',
  },
  {
    city: 'Giessen',
    state: 'Hesse',
    country: 'Germany',
  },
  {
    city: 'Göttingen',
    state: 'Lower Saxony',
    country: 'Germany',
  },
  {
    city: 'Wiesbaden',
    state: 'Hesse',
    country: 'Germany',
  },
  {
    city: 'Offenbach am Main',
    state: 'Hesse',
    country: 'Germany',
  },
  {
    city: 'Mainz',
    state: 'Rhineland-Palatinate',
    country: 'Germany',
  },
  {
    city: 'Kaiserslautern',
    state: 'Rhineland-Palatinate',
    country: 'Germany',
  },
  {
    city: 'Saarbrücken',
    state: 'Saarland',
    country: 'Germany',
  },
  {
    city: 'Erfurt',
    state: 'Thuringia',
    country: 'Germany',
  },
];

exports.up = async (sql) => {
  await sql`
	INSERT INTO "location" ${sql(location, 'city', 'state', 'country')};`;
};

exports.down = async (sql) => {
  await sql`
	DELETE FROM "location"
	`;
};
