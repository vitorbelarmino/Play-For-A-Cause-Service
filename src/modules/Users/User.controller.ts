import { Controller, Post, HttpCode, Body, Get, Param } from '@nestjs/common';
import { UserService } from './Users.service';
import { createUserInput } from './dto/createUserInput';
import { loginInput } from './dto/loginInput';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @Post('/create')
  async createUser(@Body() userInfo: createUserInput) {
    return this.userService.create(userInfo);
  }

  @HttpCode(200)
  @Post('/login')
  async login(@Body() login: loginInput) {
    return this.userService.login(login);
  }

  @HttpCode(200)
  @Get('/:id')
  async getUser(@Param() params: { id: string }) {
    const { id } = params;
    return this.userService.findById(id);
  }
}
