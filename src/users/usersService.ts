import { inject } from 'inversify';
import { provideSingleton } from '../utils/provideSingleton';
import { User } from './interfaces/user';
import { UserCreationParams } from './interfaces/userCreationParams';
import { UsersRepository } from './usersRepository';
import { IUsersRepository } from './interfaces/usersRepository';

@provideSingleton(UsersService)
export class UsersService {
  constructor(
    @inject(UsersRepository) private usersRepository: IUsersRepository
  ) {}

  public get(id: number): User | null {
    return this.usersRepository.get(id);
  }

  public create(user: UserCreationParams): User {
    return this.usersRepository.create({
      ...user,
      status: 'Happy'
    });
  }
}
