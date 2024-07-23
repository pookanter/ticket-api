import { Request, Response } from "express";
import { Authentication, IAuthentication } from "libs/authentication";
import { ExpressMiddlewareInterface, UnauthorizedError } from "routing-controllers";

export class AuthenMiddleware implements ExpressMiddlewareInterface {
  authenticaton: IAuthentication = new Authentication();

  use(request: Request, response: Response, next: (err?: any) => any) {
    const bearer = request.get("Authorization");

    const [_, token] = bearer.split(" ");

    if (!token) {
      throw new UnauthorizedError("Unauthorized");
    }

    try {
      const claims = this.authenticaton.verifyToken(token);

      request["authen"] = claims;

      next();
    } catch (error) {
      throw new UnauthorizedError("Unauthorized");
    }
  }
}
