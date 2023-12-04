import { Inject, NotFoundException } from '@nestjs/common';
import { IChatRepository } from './interface/IChat.repository';
import { PrismaClient } from '@prisma/client';
import { addUserToChatInfo } from 'src/modules/Chat/dto/addUserToChatInfo';

export class ChatRepository implements IChatRepository {
  constructor(@Inject('PrismaClient') private readonly db: PrismaClient) {}
  async createChat(): Promise<void> {
    await this.db.chat.create({
      data: {
        name: 'Public Chat',
      },
    });
  }

  async addUserToChat(info: addUserToChatInfo): Promise<void> {
    const user = await this.db.user.findUnique({ where: { id: info.userId } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const chat = await this.db.chat.findUnique({
      where: { id: info.chatId },
      include: { users: true },
    });

    if (!chat) {
      throw new NotFoundException('Chat not found.');
    }

    chat.users.forEach((user) => {
      if (user.id === info.userId) {
        throw new NotFoundException('User already in chat.');
      }
    });

    await this.db.chat.update({
      where: {
        id: info.chatId,
      },
      data: {
        users: {
          connect: [
            {
              id: user.id,
            },
          ],
        },
      },
    });
  }
}
