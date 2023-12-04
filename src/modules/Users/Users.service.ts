import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from './prisma/db/interface/IUser.repository';
import { createUserInput } from './dto/createUserInput';
import { BCrypt } from 'src/Utils/BCrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    private readonly bcrypt: BCrypt,
  ) {}
  async create(userInfo: createUserInput) {
    const user = await this.findByEmail(userInfo.email);
    if (user) {
      throw new ConflictException('Email address already registered.');
    }
    const hashedPassword = await this.bcrypt.hashPassword(userInfo.password);
    await this.userRepository.create({ ...userInfo, password: hashedPassword });
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new ConflictException('Email address not registered.');
    }
    const match = await this.bcrypt.comparePasswords(password, user.password);
    if (!match) {
      throw new ConflictException('Incorrect password.');
    }
  }
}
