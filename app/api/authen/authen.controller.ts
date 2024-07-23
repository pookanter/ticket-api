import { Body, Get, JsonController, Post } from "routing-controllers";
import Container from "typedi";
import { SignUpDto } from "./dto";
import { AuthenService } from "./authen.service";

@JsonController()
export class AuthenController {
  authenService: AuthenService = Container.get(AuthenService);

  @Get("")
  index() {
    return "test";
  }

  @Post("/sign-up")
  async signUp(@Body() body: SignUpDto) {
    return this.authenService.signUp(body);
  }
}
