import { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import { asyncClient } from '../core/redis';

export async function createSession(
  accessToken: string,
  refreshToken: string,
  res: Response
) {
  const sessionToken = randomBytes(64).toString('hex');
  await asyncClient(
    'hset',
    `session:${sessionToken}`,
    'accessToken',
    accessToken,
    'refreshToken',
    refreshToken
  );
  setSessionToken(sessionToken, res);
}

export async function hasSession(req: Request): Promise<boolean> {
  try {
    return !!(await getSpotifyAccessToken(req));
  } catch (e) {
    return false;
  }
}

export async function getSpotifyAccessToken(req: Request): Promise<string> {
  const token = getSessionToken(req);
  if (!token) {
    throw new Error('No access token found for session.');
  }
  return accessTokenBySession(token);
}

async function accessTokenBySession(sessionId: string) {
  return asyncClient('hget', `session:${sessionId}`, 'accessToken');
}

export async function refreshTokenBySession(sessionId: string) {
  return asyncClient('hget', `session:${sessionId}`, 'refreshToken');
}

export async function deleteTokensBySession(sessionId: string) {
  return asyncClient('del', `session:${sessionId}`);
}

function setSessionToken(token: string, res: Response): void {
  res.cookie('session', token, {
    httpOnly: true,
    maxAge: 60 * 59 * 1000, // 59 minutes
    sameSite: true,
  });
}

export function getSessionToken(req: Request): string | undefined {
  const { session } = req.cookies;
  return session;
}
