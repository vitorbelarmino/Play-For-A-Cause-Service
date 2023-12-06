import { ConflictException, Inject } from '@nestjs/common';
import { IChatRepository } from 'src/prisma/db/interface/IChat.repository';
import { addUserToChatInfo } from './dto/addUserToChatInfo';
import { Chat } from 'src/prisma/db/entities/Chat.entity';

export class ChatService {
  constructor(
    @Inject('IChatRepository')
    private readonly chatRepository: IChatRepository,
  ) {}
  async createChat(): Promise<string> {
    const getChat = await this.getOne();
    if (getChat) {
      throw new ConflictException('Chat already exists.');
    }
    return await this.chatRepository.createChat();
  }

  async addUsersToChat(info: addUserToChatInfo): Promise<void> {
    await this.chatRepository.addUserToChat(info);
  }

  async getOne(): Promise<Chat | null> {
    return await this.chatRepository.getOne();
  }
}
