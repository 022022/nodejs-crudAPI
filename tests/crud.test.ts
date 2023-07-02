import request from 'supertest';
import { server } from './../src/index';
import { describe } from 'node:test';
import { STATUS } from '../src/constants/constants';
import { UserEntry } from '../src/types/types';

describe('crud operations', () => {
  afterAll(() => server.close());

  const newUser = {
    username: "John L",
    age: 25,
    hobbies: ["music"]
  };

  let createdUser: UserEntry;

  it("Gets all records with a GET api/users request (an empty array is expected)", async() => {
    const response = await request(server).get("/api/users");

    expect(response.statusCode).toBe(STATUS.OK);
    expect(JSON.parse(response.text)).toHaveLength(0);
  });

  it("A new object is created by a POST api/users request (a response containing newly created record is expected)", async() => {
    const response = await request(server)
      .post("/api/users")
      .send(newUser);

    expect(response.statusCode).toBe(STATUS.CREATED);

    createdUser = JSON.parse(response.text);
    expect(createdUser).toEqual({...newUser, id: createdUser.id});
  });

  it("Gets user by id (the created record is expected)", async() => {
    const response = await request(server).get(`/api/users/${createdUser.id}`);

    expect(response.statusCode).toBe(STATUS.OK);
    expect(JSON.parse(response.text)).toEqual({...newUser, id: createdUser.id});
  });

  it("Updates the created record (a response is expected containing an updated object with the same id)", async() => {
    const response = await request(server)
      .put(`/api/users/${createdUser.id}`)
      .send({age: 26});

    expect(response.statusCode).toBe(STATUS.OK);
    expect(JSON.parse(response.text).age).toEqual(26);
  });

  it("Delete the created object by id (confirmation of successful deletion is expected)", async() => {
    const response = await request(server)
      .delete(`/api/users/${createdUser.id}`);
    expect(response.statusCode).toBe(STATUS.NO_CONTENT);
  });

  it("Tries to get a deleted object by id (expected answer is that there is no such object)", async() => {
    const response = await request(server).get(`/api/users/${createdUser.id}`);
    expect(response.statusCode).toBe(STATUS.NOT_FOUND);
  });
})
