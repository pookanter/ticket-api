import { createExpressServer } from 'routing-controllers';
import * as controllers from 'app/controllers'
import { dictToArray } from 'libs/utils';

const app = createExpressServer({
  controllers: dictToArray(controllers),
});

app.listen(3000, (app) => {
  console.log('app is running on port 3000');


});