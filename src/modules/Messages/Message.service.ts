import { Inject } from '@nestjs/common';
import { IMessageRepository } from '../../prisma/db/interface/IMessages.repository';
import { ICreateMessageInput } from './dto/createMessageInput';

export class MessagesService {
  constructor(
    @Inject('IMessageRepository')
    private readonly messageRepository: IMessageRepository,
  ) {}
  async createMessage(message: ICreateMessageInput): Promise<void> {
    await this.messageRepository.createMessage(message);
  }
}
