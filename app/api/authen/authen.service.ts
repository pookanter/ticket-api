import { IUsersRepository, UsersRepository } from "app/repositories";
import { Authen } from "libs/authen";
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

    const hashed = await Authen.hashPassword(password);

    const [userId] = await this.usersRepository.createUser({
      email,
      name,
      lastname,
      password: hashed,
    });

    if (!userId) {
      throw new InternalServerError("Failed to create user");
    }

    const [user] = await this.usersRepository.getUserById(userId);

    if (!user) {
      throw new InternalServerError("Failed to get user after create");
    }

    return {
      error: false,
      message: "user created",
    };
  }
}
