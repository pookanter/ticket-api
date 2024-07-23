import { IUsersRepository, UsersRepository } from "app/repositories";
import { Authentication, IAuthentication } from "libs/authentication";
import { BadRequestError, InternalServerError, NotFoundError } from "routing-controllers";
import { Inject, Service } from "typedi";
@Service()
export class AuthenService {
  @Inject(() => UsersRepository)
  usersRepository: IUsersRepository;

  @Inject(() => Authentication)
  authentication: IAuthentication;

  async signIn({ email, password }: { email: string; password: string }) {
    const [user] = await this.usersRepository.findUserByEmail(email);

    if (!user) {
      throw new BadRequestError("Invalid password or email");
    }

    const isMatch = await this.authentication.comparePassword(password, user.password);

    if (!isMatch) {
      throw new BadRequestError("Invalid password or email");
    }

    return this.authentication.generateToken({
      user_id: user.id,
    });
  }

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

    const hashed = await this.authentication.hashPassword(password);

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
