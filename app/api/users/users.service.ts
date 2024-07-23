import { IUsersRepository, UsersRepository } from "app/repositories";
import { Inject, Service } from "typedi";

@Service()
export class UsersService {
  @Inject(() => UsersRepository)
  usersRepository: IUsersRepository;

  getMe() {
    // this.usersRepository.getUserById()
  }
}
