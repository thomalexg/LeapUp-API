import argon2 from 'argon2';

export async function hashPassword(password: string) {
  console.log('argon', argon2.hash(password));
  return argon2.hash(password);
}

export async function doesPasswordMatchPasswordHash(
  password: string,
  passwordHash: string,
) {
  console.log(password);
  console.log(passwordHash);
  return await argon2.verify(passwordHash, password);
}
