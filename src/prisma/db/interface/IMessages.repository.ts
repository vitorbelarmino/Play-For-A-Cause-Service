import { ICreateMessageInput } from 'src/modules/Messages/dto/createMessageInput';

export abstract class IMessageRepository {
  abstract createMessage(message: ICreateMessageInput): Promise<void>;
}
