import { Injectable, NestMiddleware } from "@nestjs/common";
import { RequestWithSession } from "../interfaces/request-with-session";
import { NextFunction, Response } from "express";
import csurf from "csurf";

/**
 * Custom middleware to conditionally apply csurf
 */
@Injectable()
export class CsurfMiddleware implements NestMiddleware {
  async use(req: RequestWithSession, res: Response, next: NextFunction) {
    return csurf()(req, res, next);
  }
}
