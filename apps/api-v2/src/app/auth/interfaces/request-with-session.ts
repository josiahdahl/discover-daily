import { Request } from 'express';

export type RequestWithSession = Request & { session: any };
