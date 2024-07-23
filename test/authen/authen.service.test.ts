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
import { Authentication } from "libs/authentication";
import { AuthenticationMock } from "./authentication.mock";

export const authenServiceTest = () => {
  Container.set(UsersRepository, new UsersRepositoryMock());
  Container.set(Authentication, new AuthenticationMock());

  const usersRepository = Container.get(UsersRepository);
  const authenService = Container.get(AuthenService);

  before(() => {
    chai.should();
    chai.use(chaiAsPromised);
  });
  beforeEach(() => {
    usersRepository.users = [];
  });
  describe("signIn", () => {
    const parameter: Parameters<AuthenService["signIn"]>[0] = {
      email: "pookan@mail.com",
      password: "safojiwqnfoqlnfo",
    };
    it("should return token", async () => {
      usersRepository.users = [
        {
          id: 1,
          name: "pookan",
          lastname: "kung",
          email: parameter.email,
          password: parameter.password,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      const tokens = await authenService.signIn(parameter);

      Object.keys(tokens).should.be.deep.equal(["access_token", "refresh_token"]);
    });
    it("should throw an error because a user does not exist", async () => {
      await authenService.signIn(parameter).should.eventually.be.rejectedWith(BadRequestError);
    });
    it("should throw an error because user's password doesn't match", async () => {
      usersRepository.users = [
        {
          id: 1,
          name: "pookan",
          lastname: "kung",
          email: parameter.email,
          password: "unmatchpassword",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];

      await authenService.signIn(parameter).should.eventually.be.rejectedWith(BadRequestError);
    });
  });
  describe("signUp", () => {
    const parameter: Parameters<AuthenService["signUp"]>[0] = {
      email: "pookan@test.com",
      name: "pookan",
      lastname: "kung",
      password: "safojiwqnfoqlnfo",
    };
    it("should create success", async () => {
      await authenService.signUp(parameter).should.eventually.be.fulfilled;
    });
    it("should throw an error on email already exists", async () => {
      usersRepository.users = [
        {
          id: 1,
          name: "",
          lastname: "",
          email: parameter.email,
          password: "",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      await authenService.signUp(parameter).should.eventually.be.rejectedWith(BadRequestError);
    });
  });
  describe("refreshToken", () => {
    it("should return token", async () => {
      const tokens = await authenService.refreshToken("adklnadlnmalkdmlakdmla");

      Object.keys(tokens).should.be.deep.equal(["access_token", "refresh_token"]);
    });
  });
};
