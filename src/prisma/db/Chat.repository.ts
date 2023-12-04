import { Inject } from '@nestjs/common';
import { IChatRepository } from './interface/IChat.repository';
import { PrismaClient } from '@prisma/client';

export class ChatRepository implements IChatRepository {
  constructor(@Inject('PrismaClient') private readonly db: PrismaClient) {}
  async createChat(): Promise<void> {
    await this.db.chat.create({
      data: {
        name: 'Public Chat',
      },
    });
  }
}
