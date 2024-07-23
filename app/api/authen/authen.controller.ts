import { Body, Get, JsonController, Post } from "routing-controllers";
import Container from "typedi";
import { SignUpDto } from "./dto";
import { AuthenService } from "./authen.service";

@JsonController()
export class AuthenController {
  authenService: AuthenService = Container.get(AuthenService);

  @Get("")
  index() {
    return "AuthenController";
  }

  @Post("/sign-up")
  async signUp(@Body() body: SignUpDto) {
    console.log(JSON.stringify(body, null, 4));
    return this.authenService.signUp(body);
  }
}
