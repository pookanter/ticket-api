// this shim is required
import { createExpressServer } from 'routing-controllers';
import * as controllers from 'app/controllers'
import { dictToArray } from 'libs/utils';
// import * as knexConfig from 'app/database/knexfile';
import knex from 'knex';

console.log('app');
// creates express app, registers all controller routes and returns you express app instance
const app = createExpressServer({
  controllers: dictToArray(controllers), // we specify controllers we want to use
});


// run express application on port 3000
app.listen(3000, () => {
  console.log('app is running on port 3000');

  console.log('app111');
knex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'randomrootpassword',
    database: 'ticket_dev',
  },
})('boards').select().then((data) => {
  console.log(data);
}).catch((err) => {
  console.error(err);
})
console.log('app222');

});