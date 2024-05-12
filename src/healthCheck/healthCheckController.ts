import { Controller, Get, Route, SuccessResponse, Response } from 'tsoa';
import { provideSingleton } from '../utils/provideSingleton';
import { InternalServerError } from '../middlewares/errorHandler';

interface PingResponse {
  status: 'ok';
}

@Route('healthCheck')
@provideSingleton(HealthCheckController)
export class HealthCheckController extends Controller {
  @SuccessResponse('200', 'Ok')
  @Response<InternalServerError>(500, 'Internal Server Error')
  @Get()
  public async ping(): Promise<PingResponse> {
    return {
      status: 'ok'
    };
  }
}
