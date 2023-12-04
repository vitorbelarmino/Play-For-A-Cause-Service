import { Inject } from '@nestjs/common';
import { IChatRepository } from 'src/prisma/db/interface/IChat.repository';

export class ChatService {
  constructor(
    @Inject('IChatRepository')
    private readonly chatRepository: IChatRepository,
  ) {}
  async createChat(): Promise<void> {
    await this.chatRepository.createChat();
  }
}
