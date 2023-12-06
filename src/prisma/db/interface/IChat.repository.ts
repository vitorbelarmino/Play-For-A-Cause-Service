import { addUserToChatInfo } from '../../../modules/Chats/dto/addUserToChatInfo';
import { Chat } from '../entities/Chat.entity';

export abstract class IChatRepository {
  abstract createChat(): Promise<string>;
  abstract addUserToChat(info: addUserToChatInfo): Promise<void>;
  abstract getOne(): Promise<Chat | null>;
}
