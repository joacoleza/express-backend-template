import supertest from 'supertest';
import { app } from '../app';

describe('v1/users', () => {
  let userId: number;
  describe('POST', () => {
    it('should create a user', async () => {
      const response = await supertest(app)
        .post('/v1/users')
        .send({
          phoneNumbers: ['+1111111111'],
          name: 'John Doe ',
          email: 'john.doe@mail.com'
        });
      expect(response.status).toEqual(201);
      expect(response.body).toEqual({
        id: expect.any(Number),
        phoneNumbers: ['+1111111111'],
        name: 'John Doe ',
        email: 'john.doe@mail.com',
        status: 'Happy'
      });
      userId = response.body.id;
    });

    describe('should validate the request body', () => {
      it('should fail if an id is passed', async () => {
        const response = await supertest(app)
          .post('/v1/users')
          .send({
            id: 1,
            phoneNumbers: ['+1111111111'],
            name: 'John Doe ',
            email: 'john.doe@mail.com'
          });
        expect(response.status).toEqual(422);
        console.log('!!!!', response.body);
        expect(response.body.details['requestBody.id'].message).toEqual(
          '"id" is an excess property and therefore is not allowed'
        );
      });

      it('should fail if an name is not present', async () => {
        const response = await supertest(app).post('/v1/users').send({
          phoneNumbers: '+1111111111',
          email: 'john.doe@mail.com'
        });
        expect(response.status).toEqual(422);
        expect(response.body.details['requestBody.name'].message).toEqual(
          "'name' is required"
        );
      });

      it('should fail if an email is not present', async () => {
        const response = await supertest(app).post('/v1/users').send({
          phoneNumbers: '+1111111111',
          name: 'John Doe '
        });
        expect(response.status).toEqual(422);
        expect(response.body.details['requestBody.email'].message).toEqual(
          "'email' is required"
        );
      });
    });
  });

  describe('GET', () => {
    it('should get a user', async () => {
      expect(userId).toBeDefined();
      const response = await supertest(app).get(`/v1/users/${userId}`);
      expect(response.status).toEqual(200);
      expect(response.body).toEqual({
        id: userId,
        phoneNumbers: ['+1111111111'],
        name: 'John Doe ',
        email: 'john.doe@mail.com',
        status: 'Happy'
      });
    });

    it('should return 404 - Not found when user does not exist', async () => {
      const response = await supertest(app).get(`/v1/users/0`);
      expect(response.status).toEqual(404);
      expect(response.body).toEqual({
        details: 'User 0 not found.',
        message: 'Not found'
      });
    });
  });
});
