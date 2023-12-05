import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MessagesService } from './Message.service';
import { ICreateMessageInput } from './dto/createMessageInput';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}

  @Post('/create')
  @HttpCode(201)
  async createMessage(@Body() message: ICreateMessageInput) {
    return this.messageService.createMessage(message);
  }
}
