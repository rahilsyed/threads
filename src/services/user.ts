import { prismaClient } from '../lib/db';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
export interface createUserPayload {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  salt: string;
}
const JWT_SECRET= 'secret_key'
export interface GetUserTokenPayload {
  email: string;
  password: string;
}

export class UserServices {
  
  public static async createUser(payload: createUserPayload) {
    const { firstName, lastName, email, password, salt } = payload;

    const hashed= await bcrypt.hash(password,12);
    return prismaClient.user.create({
      data: {
        firstName,
        lastName,
        email,
        salt,
        password: hashed,
      },
    });
  }
    public static getUserById(id: string) {
    return prismaClient.user.findUnique({ where: { id } });
  }

  private static getUserByEmail(email: string) {
    return prismaClient.user.findUnique({ where: { email } });
  }

  public static async getUserToken(payload: GetUserTokenPayload) {
    const { email, password } = payload;
    const user = await UserServices.getUserByEmail(email);
    if (!user) throw new Error("user not found");

    const userSalt = user.salt;
    const usersHashPassword = await bcrypt.hash( password,12);

    if (usersHashPassword !== user.password)
      throw new Error("Incorrect Password");

    // Gen Token
    const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return token;
  }

  public static decodeJWTToken(token: string) {
    return JWT.verify(token, JWT_SECRET);
  }
}
