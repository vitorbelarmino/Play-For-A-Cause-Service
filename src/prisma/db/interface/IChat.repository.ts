export abstract class IChatRepository {
  abstract createChat(): Promise<void>;
}
