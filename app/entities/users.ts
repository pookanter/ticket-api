export interface UsersEntity {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}
export enum UsersAttributes {
  Id = "id",
  Name = "name",
  Lastname = "lastname",
  Email = "email",
  Password = "password",
  CreatedAt = "created_at",
  UpdatedAt = "updated_at",
}
export const USERS_TABLE = "users";
