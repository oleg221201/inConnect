import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

export async function hashPassword(data: string): Promise<string> {
  const salt = randomBytes(16).toString('hex');
  const buf = await scryptSync(data, salt, 64);

  return `${buf.toString('hex')}.${salt}`;
}

export async function comparePassword(
  incomingPassword: string,
  storedPassword: string,
): Promise<boolean> {
  const [hashedPassword, salt] = storedPassword.split('.');
  const hashedPasswordBuf = Buffer.from(hashedPassword, 'hex');
  const suppliedPasswordBuf = scryptSync(incomingPassword, salt, 64);

  return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
}
