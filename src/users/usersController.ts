import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Route,
  SuccessResponse,
  Response
} from 'tsoa';
import { User } from './user';
import { UsersService, UserCreationParams } from './usersService';
import { NotFoundError } from '../errors/NotFoundError';
import {
  InternalServerError,
  NotFoundApiError,
  ValidationApiError
} from '../middlewares/errorHandler';
import { provideSingleton } from '../utils/provideSingleton';
import { inject } from 'inversify';

@Route('v1/users')
@provideSingleton(UsersController)
export class UsersController extends Controller {
  constructor(@inject(UsersService) private usersService: UsersService) {
    super();
  }

  /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   * @example userId 1
   */
  @SuccessResponse('200', 'Ok')
  @Response<NotFoundApiError>(404, 'User not found')
  @Response<InternalServerError>(500, 'Internal Server Error')
  @Get('{userId}')
  public async getUser(@Path() userId: number): Promise<User> {
    const user = this.usersService.get(userId);
    if (!user) {
      throw new NotFoundError(`User ${userId} not found.`);
    }
    return user;
  }

  /**
   * Creates a user.
   */
  @SuccessResponse('201', 'Created')
  @Response<ValidationApiError>(422, 'Validation error')
  @Response<InternalServerError>(500, 'Internal Server Error')
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<number> {
    this.setStatus(201);
    const user = this.usersService.create(requestBody);
    return user.id;
  }
}
