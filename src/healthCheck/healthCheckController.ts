import { Controller, Get, Route } from 'tsoa';

interface PingResponse {
  status: 'ok' | 'error';
}

@Route('healthCheck')
export class HealthCheckController extends Controller {
  @Get()
  public async ping(): Promise<PingResponse> {
    return {
      status: 'ok'
    };
  }
}
