import { Inject } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { IUserRepository } from './interface/IUser.repository';
import { createUserInput } from '../../modules/Users/dto/createUserInput';

export class UserRepository implements IUserRepository {
  constructor(@Inject('PrismaClient') private readonly db: PrismaClient) {}

  async create(userInfo: createUserInput): Promise<User> {
    const user = await this.db.user.create({
      data: {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
}
