import "reflect-metadata";

import { createExpressServer } from "routing-controllers";
import { AuthenController } from "app/api/authen/authen.controller";
import { UsersController } from "app/api/users/users.controller";

const app = createExpressServer({
  controllers: [AuthenController, UsersController],
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
