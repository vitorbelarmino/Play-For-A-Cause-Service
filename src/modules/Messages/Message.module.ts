import { Module } from '@nestjs/common';
import { MessagesController } from './Messges.controller';
import { MessagesService } from './Message.service';
import { PrismaClient } from '@prisma/client';
import { MessageRepository } from '../../prisma/db/Messages.repository';

@Module({
  controllers: [MessagesController],
  providers: [
    MessagesService,
    { provide: 'IMessageRepository', useClass: MessageRepository },
    {
      provide: 'PrismaClient',
      useClass: PrismaClient,
    },
  ],
})
export class MessagesModule {}
