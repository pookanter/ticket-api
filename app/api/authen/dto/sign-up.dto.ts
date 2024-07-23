import { IsString, IsStrongPassword } from "class-validator";

export class SignUpDto {
  @IsString()
  name: string;

  @IsString()
  lastname: string;

  @IsString()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;
}
