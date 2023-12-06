import { Module } from '@nestjs/common';
import { UsersModule } from './modules/Users/Users.module';
import { ChatModule } from './modules/Chats/Chat.module';
import { MessagesModule } from './modules/Messages/Message.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [UsersModule, ChatModule, MessagesModule, WebsocketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
