import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ICreateMessageInput } from '../../modules/Messages/dto/createMessageInput';

export class MessageRepository implements MessageRepository {
  constructor(
    @Inject('PrismaClient')
    private readonly db: PrismaClient,
  ) {}

  async createMessage(messages: ICreateMessageInput): Promise<void> {
    await this.db.message.create({
      data: {
        text: messages.text,
        chatId: messages.chatId,
        userId: messages.userId,
        userName: messages.userName,
      },
    });
  }
}
