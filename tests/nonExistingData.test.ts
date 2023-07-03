import request from 'supertest';
import { server } from '../src/index';
import { describe } from 'node:test';
import { STATUS } from '../src/constants/constants';
import { messages } from '../src/data/messages';
import { v4 } from 'uuid';

describe('Non-existing data', () => {
  afterAll(() => server.close());

  const fakeValidUid = v4();

  it("Tries to get a non-existing user(error message expected)", async() => {
    const response = await request(server).get(`/api/users/${fakeValidUid}`);

    expect(response.statusCode).toBe(STATUS.NOT_FOUND);
    expect(response.text).toEqual(messages.userNotExist);
  });

  it("Tries to update a non-existing user(error message expected)", async() => {
    const updatedUser = {
      username: "John LL",
      age: 25,
      hobbies: ["skating"]
    };

    const response = await request(server)
      .put(`/api/users/${fakeValidUid}`)
      .send(updatedUser);

    expect(response.statusCode).toBe(STATUS.NOT_FOUND);
    expect(response.text).toEqual(messages.userNotExist);
  });

  it("Tries to patch a non-existing user(error message expected)", async() => {
    const response = await request(server)
      .patch(`/api/users/${fakeValidUid}`)
      .send({age: 36});

      expect(response.statusCode).toBe(STATUS.NOT_FOUND);
      expect(response.text).toEqual(messages.userNotExist);
  });

  it("Tries to delete a non-existing user(error message expected)", async() => {
    const response = await request(server)
      .delete(`/api/users/${fakeValidUid}`);
    expect(response.statusCode).toBe(STATUS.NOT_FOUND);
    expect(response.text).toEqual(messages.userNotExist);
  });

});