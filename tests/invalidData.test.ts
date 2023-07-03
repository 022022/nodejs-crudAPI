import request from 'supertest';
import { server } from './../src/index';
import { describe } from 'node:test';
import { STATUS } from '../src/constants/constants';
import { messages } from '../src/data/messages';

describe('Invalid data', async () => {
  afterAll(() => server.close());

  const newUserWithNoUsername = {
    age: 25,
    hobbies: ["music"]
  };

  const validUser = {
    username: "John L",
    age: 25,
    hobbies: ["music"]
  }

  const newUserInvalidType = {
    username: "John L",
    age: "25",
    hobbies: ["music"]
  };

  const newUserWithInvalidDataFormat = ["John L", 25, ["music"]];

  it("Tries to get a user with invalid uid(error message expected)", async() => {
    const response = await request(server)
      .get("/api/users/invalid-uid");

    expect(response.statusCode).toBe(STATUS.BAD_REQUEST);
    expect(response.text).toEqual(messages.invalidUid);
  });

  it("Tries to update a user with invalid uid(error message expected)", async() => {
    const response = await request(server)
      .put("/api/users/invalid-uid");

    expect(response.statusCode).toBe(STATUS.BAD_REQUEST);
    expect(response.text).toEqual(messages.invalidUid);
  });

  it("Tries to patch a user with invalid uid(error message expected)", async() => {
    const response = await request(server)
      .patch("/api/users/invalid-uid");

    expect(response.statusCode).toBe(STATUS.BAD_REQUEST);
    expect(response.text).toEqual(messages.invalidUid);
  });

  it("Tries to delete a user with invalid uid(error message expected)", async() => {
    const response = await request(server)
      .delete("/api/users/invalid-uid");

    expect(response.statusCode).toBe(STATUS.BAD_REQUEST);
    expect(response.text).toEqual(messages.invalidUid);
  });

  it("Tries to create a user without a required field (error message expected)", async() => {
    const response = await request(server)
      .post("/api/users")
      .send(newUserWithNoUsername);

    expect(response.statusCode).toBe(STATUS.BAD_REQUEST);
    expect(response.text).toEqual(messages.invalidUserType);
  });

  it(" Tries to update a user without a required field (error message expected)", async() => {
    const newUser = await request(server).post("/api/users").send(validUser);
    const newUserId = JSON.parse(newUser.text).id;

    const response = await request(server)
      .put(`/api/users/${newUserId}`)
      .send(newUserWithNoUsername);

    expect(response.statusCode).toBe(STATUS.BAD_REQUEST);
    expect(response.text).toEqual(messages.invalidUserType);
  });

  it("Tries to create a user with invalid data type (error message expected)", async() => {
    const response = await request(server)
      .post("/api/users")
      .send(newUserInvalidType);

    expect(response.statusCode).toBe(STATUS.BAD_REQUEST);
    expect(response.text).toEqual(messages.invalidUserType);
  });

  it("Tries to create a user with invalid data format (error message expected)", async() => {
    const response = await request(server)
      .post("/api/users")
      .send(newUserWithInvalidDataFormat);

    expect(response.statusCode).toBe(STATUS.BAD_REQUEST);
    expect(response.text).toEqual(messages.invalidUserType);
  });

  it("Tries to update a user with invalid data type (error message expected)", async() => {
    const newUser = await request(server).post("/api/users").send(validUser);
    const newUserId = JSON.parse(newUser.text).id;

    const response = await request(server)
      .put(`/api/users/${newUserId}`)
      .send(newUserInvalidType);

    expect(response.statusCode).toBe(STATUS.BAD_REQUEST);
    expect(response.text).toEqual(messages.invalidUserType);
  });

  it("Tries to patch a user with invalid data format (error message expected)", async() => {
    const newUser = await request(server).post("/api/users").send(validUser);
    const newUserId = JSON.parse(newUser.text).id;

    const response = await request(server)
      .patch(`/api/users/${newUserId}`)
      .send({age: "26"});

    expect(response.statusCode).toBe(STATUS.BAD_REQUEST);
    expect(response.text).toEqual(messages.invalidUserType);
  });

});