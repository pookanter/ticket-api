import { UsersEntity } from "app/entities";
import { UsersRepositoryMock } from "./users.repository.mock";
import { AuthenService } from "app/api/authen/authen.service";
import { describe } from "mocha";
import Container from "typedi";
import chai, { expect } from "chai";
import { BadRequestError } from "routing-controllers";
import chaiAsPromised from "chai-as-promised";
import Sinon from "sinon";
import { UsersRepository } from "app/repositories";

export const authenServiceTest = () => {
  describe("signUp", () => {
    const usersRepository = Container.get(UsersRepository);
    const parameter: Parameters<AuthenService["signUp"]>[0] = {
      email: "pookan@mail.com",
      name: "pookan",
      lastname: "kung",
      password: "safojiwqnfoqlnfo",
    };

    before(() => {
      chai.should();
      chai.use(chaiAsPromised);
      Container.set(UsersRepository, new UsersRepositoryMock());
    });
    beforeEach(() => {
      usersRepository.users = [];
    });
    it("should create success", async () => {
      usersRepository.users = [
        {
          id: 1,
          name: "pookan",
          lastname: "kung",
          email: "pookan@mail.com",
          password: "safojiwqnfoqlnfo",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      const authenService = Container.get(AuthenService);

      await authenService.signUp(parameter).should.eventually.be.fulfilled;
    });
    it("should throw an error on email already exists", async () => {
      const authenService = Container.get(AuthenService);

      await authenService.signUp(parameter).should.eventually.be.rejectedWith(BadRequestError);
    });
  });
};
