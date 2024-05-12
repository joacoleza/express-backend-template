import supertest from 'supertest';
import { app } from '../app';

describe('/healthCheck', () => {
  it('should respond ok', async () => {
    const response = await supertest(app).get('/healthCheck');
    expect(response.status).toEqual(200);
    expect(response.body).toEqual({ status: 'ok' });
  });
});
