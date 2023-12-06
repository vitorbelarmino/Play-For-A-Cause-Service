import { Inject, NotFoundException } from '@nestjs/common';
import { IChatRepository } from './interface/IChat.repository';
import { PrismaClient } from '@prisma/client';
import { addUserToChatInfo } from 'src/modules/Chats/dto/addUserToChatInfo';
import { Chat } from './entities/Chat.entity';

export class ChatRepository implements IChatRepository {
  constructor(@Inject('PrismaClient') private readonly db: PrismaClient) {}
  async createChat(): Promise<string> {
    const data = await this.db.chat.create({
      data: {
        name: 'Public Chat',
      },
    });
    return data.id;
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

  async getOne(): Promise<Chat | null> {
    const chat = await this.db.chat.findFirst({
      include: {
        users: true,
        messages: true,
      },
    });
    return chat;
  }
}
