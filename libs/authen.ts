import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import environment from "config/environment";

const privateKey = readFileSync(environment.private_key, "utf-8");

export const Authen = {
  comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  },
  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  },
  gerateToken(tokenPayload: { [key: string]: any }) {
    const access_token = jwt.sign(tokenPayload, privateKey, {
      algorithm: "RS256",
      expiresIn: environment.access_token_expire,
    });
    const refresh_token = jwt.sign(tokenPayload, privateKey, {
      algorithm: "RS256",
      expiresIn: environment.refresh_token_expire,
    });

    return {
      access_token,
      refresh_token,
    };
  },
  verifyToken(token: string) {
    return jwt.verify(token, privateKey, {
      algorithms: ["RS256"],
    }) as
      | {
          [key: string]: any;
        }
      | undefined;
  },
};
