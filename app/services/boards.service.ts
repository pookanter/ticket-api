import { BoardsRepository } from 'app/repositories'
import { Service } from 'typedi'

@Service()
export class BoardsService {
  boardsRepository = new BoardsRepository()

  getBoard() {
    return this.boardsRepository.getBoard()
  }
}