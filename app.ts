// this shim is required
import { createExpressServer } from 'routing-controllers';
import * as controllers from 'app/controllers'
import { dictToArray } from 'libs/utils';

// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  controllers: dictToArray(controllers), // we specify controllers we want to use
});

// run express application on port 3000
app.listen(3000);