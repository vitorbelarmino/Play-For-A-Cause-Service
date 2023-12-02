import { Module } from '@nestjs/common';
import { UsersModule } from './modules/Users/Users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
