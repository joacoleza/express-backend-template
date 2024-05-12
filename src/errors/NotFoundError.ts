import { Exception } from 'tsoa';

export class NotFoundError extends Error implements Exception {
  public status = 404;
  public name = 'NotFoundError';

  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
