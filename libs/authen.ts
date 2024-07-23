import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { readFileSync } from "fs";

const privateKey = readFileSync("./certs/private_key.pem", "utf-8");

export const Authen = {
  comparePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  },
  hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  },
  gerateToken(tokenPayload: { [key: string]: any }) {
    const accessToken = jwt.sign(tokenPayload, privateKey, {
      algorithm: "RS256",
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    const refreshToken = jwt.sign(tokenPayload, privateKey, {
      algorithm: "RS256",
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });

    return {
      accessToken,
      refreshToken,
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
