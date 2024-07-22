import { AuthenDto } from "app/dtos";
import { UsersService } from "app/services";
import { Body, Get, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";

@JsonController()
@Service()
export class AuthenController {
  usersService = new UsersService();
  @Get("")
  index() {
    return "test";
  }

  @Post("/sign-up")
  async signUp(@Body() body: AuthenDto.SignUp) {
    return this.usersService.signUp(body);
  }
}
