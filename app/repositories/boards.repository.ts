import * as knexConfig from '../../knexfile'
export class BoardsRepository {
  knex = require('knex')(knexConfig)
  getBoard(): Promise<any> {
    return this.knex.select('*').from('boards').limit(1)
  }
}