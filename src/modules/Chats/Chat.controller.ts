import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { ChatService } from './Chat.service';
import { addUserToChatInfo } from './dto/addUserToChatInfo';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @HttpCode(201)
  @Post('/create')
  async createChat() {
    const chatId = await this.chatService.createChat();
    return { chatId };
  }

  @HttpCode(200)
  @Post('/addUser')
  async addUsersToChat(@Body() info: addUserToChatInfo) {
    await this.chatService.addUsersToChat(info);
  }

  @HttpCode(200)
  @Get('/getOne')
  async getAll() {
    return await this.chatService.getOne();
  }
}
