import { BoardsRepository } from 'app/repositories'
import { Service } from 'typedi'

@Service()
export class BoardsService {
  getBoard() {
    return 'Hello World!!!!'
  }
}