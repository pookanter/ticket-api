import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';

@JsonController()
@Service()
export class BoardsController {
  @Get('/boards')
  async getBoard() {
    return "Hello World!!!!"
  }
}