import { Module } from '@nestjs/common';
import { ChatController } from './Chat.controller';
import { PrismaClient } from '@prisma/client';
import { ChatRepository } from 'src/prisma/db/Chat.repository';
import { ChatService } from './Chat.service';

@Module({
  controllers: [ChatController],
  providers: [
    ChatService,
    ChatRepository,
    { provide: 'IChatRepository', useClass: ChatRepository },
    { provide: 'PrismaClient', useClass: PrismaClient },
  ],
})
export class ChatModule {}
