import { IsString } from "class-validator";

export class SignUp {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  email: string;

  @IsString()
  password: string;
}
