import { addUserToChatInfo } from 'src/modules/Chats/dto/addUserToChatInfo';

export abstract class IChatRepository {
  abstract createChat(): Promise<void>;
  abstract addUserToChat(info: addUserToChatInfo): Promise<void>;
}
