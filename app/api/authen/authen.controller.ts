import { Body, Get, JsonController, Post } from "routing-controllers";
import Container from "typedi";
import { RefreshTokenDto, SignInDto, SignUpDto } from "./dto";
import { AuthenService } from "./authen.service";

@JsonController()
export class AuthenController {
  authenService: AuthenService = Container.get(AuthenService);

  @Get("")
  index() {
    return "AuthenController";
  }

  @Post("/sign-in")
  signIn(@Body() body: SignInDto) {
    return this.authenService.signIn(body);
  }

  @Post("/sign-up")
  signUp(@Body() body: SignUpDto) {
    return this.authenService.signUp(body);
  }

  @Post("/refresh-token")
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.authenService.refreshToken(body.refresh_token);
  }
}
