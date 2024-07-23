import { IAuthentication } from "libs/authentication";

export class AuthenticationMock implements IAuthentication {
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return password === hash;
  }
  async hashPassword(password: string): Promise<string> {
    return password;
  }
  generateToken(tokenPayload: { [key: string]: any }): {
    access_token: string;
    refresh_token: string;
  } {
    return {
      access_token: "",
      refresh_token: "",
    };
  }
  verifyToken(token: string): { [key: string]: any } | undefined {
    return {};
  }
}
