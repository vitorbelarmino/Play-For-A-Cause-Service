import { Inject } from '@nestjs/common';
import { IChatRepository } from 'src/prisma/db/interface/IChat.repository';
import { addUserToChatInfo } from './dto/addUserToChatInfo';

export class ChatService {
  constructor(
    @Inject('IChatRepository')
    private readonly chatRepository: IChatRepository,
  ) {}
  async createChat(): Promise<void> {
    await this.chatRepository.createChat();
  }

  async addUsersToChat(info: addUserToChatInfo): Promise<void> {
    await this.chatRepository.addUserToChat(info);
  }
}
