import { IUsersRepository, UsersRepository } from "app/repositories";
import { BadRequestError, InternalServerError, NotFoundError } from "routing-controllers";
import { Inject, Service } from "typedi";
@Service()
export class AuthenService {
  @Inject(() => UsersRepository)
  usersRepository: IUsersRepository;

  async signUp({
    email,
    name,
    lastname,
    password,
  }: {
    name: string;
    lastname: string;
    email: string;
    password: string;
  }) {
    const users = await this.usersRepository.findUserByEmail(email);

    if (users.length > 0) {
      throw new BadRequestError("User already exists");
    }

    const [userId] = await this.usersRepository.createUser({ email, name, lastname, password });

    if (!userId) {
      throw new InternalServerError("Failed to create user");
    }

    return userId;
  }
}
