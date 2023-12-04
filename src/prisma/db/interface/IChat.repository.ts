import { addUserToChatInfo } from 'src/modules/Chat/dto/addUserToChatInfo';

export abstract class IChatRepository {
  abstract createChat(): Promise<void>;
  abstract addUserToChat(info: addUserToChatInfo): Promise<void>;
}
