import { Controller, HttpCode, Post } from '@nestjs/common';
import { ChatService } from './Chat.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @HttpCode(201)
  @Post('/create')
  async createChat() {
    await this.chatService.createChat();
  }
}
