import jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import environment from "config/environment";
import { Service } from "typedi";

const privateKey = readFileSync(environment.private_key, "utf-8");

export interface IAuthentication {
  comparePassword(password: string, hash: string): Promise<boolean>;
  hashPassword(password: string): Promise<string>;
  generateToken(tokenPayload: { [key: string]: any }): {
    access_token: string;
    refresh_token: string;
  };
  verifyToken(token: string): {
    user_id: number;
    iat: number;
    exp: number;
  };
}

@Service()
export class Authentication implements IAuthentication {
  comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
  hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  generateToken(tokenPayload: { [key: string]: any }): {
    access_token: string;
    refresh_token: string;
  } {
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
  }
  verifyToken(token: string): {
    user_id: number;
    iat: number;
    exp: number;
  } {
    return jwt.verify(token, privateKey, {
      algorithms: ["RS256"],
    }) as any;
  }
}
