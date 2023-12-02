import { createUserInput } from 'src/modules/Users/dto/createUserInput';
import { User } from 'src/modules/Users/entities/User.entity';

export abstract class IUserRepository {
  abstract create(userInfo: createUserInput): Promise<User>;
  abstract findByEmail(email: string): Promise<User | null>;
}
