import { AuthenMiddleware } from "app/middlewares/authen.middleware";
import { Get, JsonController, Req, UseBefore } from "routing-controllers";

@JsonController()
export class UsersController {
  @Get("/users/me")
  @UseBefore(AuthenMiddleware)
  getMe(@Req() request: any) {
    return request["authen"];
  }
}
