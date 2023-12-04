import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ChatService } from './Chat.service';
import { addUserToChatInfo } from './dto/addUserToChatInfo';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @HttpCode(201)
  @Post('/create')
  async createChat() {
    await this.chatService.createChat();
  }

  @HttpCode(200)
  @Post('/addUser')
  async addUsersToChat(@Body() info: addUserToChatInfo) {
    await this.chatService.addUsersToChat(info);
  }
}
