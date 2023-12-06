import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { createUserInput } from './dto/createUserInput';
import { BCrypt } from 'src/Utils/BCrypt';
import { IUserRepository } from 'src/prisma/db/interface/IUser.repository';
import { loginInput } from './dto/loginInput';

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

  async login(info: loginInput) {
    const user = await this.findByEmail(info.email);
    if (!user) {
      throw new ConflictException('Email address not registered.');
    }
    const match = await this.bcrypt.comparePasswords(
      info.password,
      user.password,
    );
    if (!match) {
      throw new ConflictException('Incorrect password.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async findById(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new ConflictException('User not found.');
    }
    return user;
  }
}
