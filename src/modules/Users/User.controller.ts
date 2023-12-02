import { Controller, Post, HttpCode, Body } from '@nestjs/common';
import { UserService } from './Users.service';
import { createUserInput } from './dto/createUserInput';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @Post('/create')
  getHello(@Body() userInfo: createUserInput) {
    return this.userService.create(userInfo);
  }
}
