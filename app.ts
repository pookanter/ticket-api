import "reflect-metadata";

import { createExpressServer } from "routing-controllers";
import * as controllers from "app/controllers";
import { dictToArray } from "libs/utils";

const app = createExpressServer({
  controllers: [controllers.AuthenController],
});

app.listen(3000, (app) => {
  console.log("app is running on port 3000");
});
