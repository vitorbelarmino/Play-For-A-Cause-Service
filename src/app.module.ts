import { Module } from '@nestjs/common';
import { UsersModule } from './modules/Users/Users.module';
import { ChatModule } from './modules/Chats/Chat.module';

@Module({
  imports: [UsersModule, ChatModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
