import { Body, Get, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";
import { SignUpDto } from "./dto";
import { AuthenService } from "./authen.service";

@JsonController()
@Service()
export class AuthenController {
  constructor(private authenService: AuthenService) {}

  @Get("")
  index() {
    return "test";
  }

  @Post("/sign-up")
  async signUp(@Body() body: SignUpDto) {
    return this.authenService.signUp(body);
  }
}
