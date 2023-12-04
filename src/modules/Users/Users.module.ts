import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './User.controller';
import { UserService } from './Users.service';
import { UserRepository } from './prisma/db/User.repository';
import { PrismaClient } from '@prisma/client';
import { ValidationMiddleware } from './middleware/userValidation.middleware';
import { BCrypt } from 'src/Utils/BCrypt';
import { LoginValidationMiddleware } from './middleware/LoginValidation.middleware';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    { provide: 'IUserRepository', useClass: UserRepository },
    {
      provide: 'PrismaClient',
      useClass: PrismaClient,
    },
    BCrypt,
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidationMiddleware)
      .forRoutes('user/create')
      .apply(LoginValidationMiddleware)
      .forRoutes('user/login');
  }
}
