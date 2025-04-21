import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  secret: process.env.JWT_SECRET || 'poetry-secret-key',
  expiresIn: parseInt(process.env.JWT_EXPIRATION || '86400', 10), // 24 hours in seconds
}));