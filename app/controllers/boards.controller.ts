import { BoardsService } from 'app/services';
import { Get, JsonController } from 'routing-controllers';
import { Service } from 'typedi';

@JsonController()
@Service()
export class BoardsController {
  boardsService = new BoardsService()
  @Get('/boards')
  async getBoard() {
    return this.boardsService.getBoard()
  }
}