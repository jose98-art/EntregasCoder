import "./db.js";
import UsersManager from "../src/persistencia/mogodb/daos/UserManager.js";
// import assert from "assert";
import { expect } from "chai";
import mongoose from "mongoose";

describe("Testing de sessions", () => {
  before(function () {
    this.sessionsDao = new UsersManager();
  });

  beforeEach(function () {
    mongoose.connection.collections.users.drop();
  });

  it("Debe agregar un usuario as la base de datos", async function () {
    const user = {
      first_name: "Prueba",
      last_name: "Test",
      email: "ptest@mail.com",
      password: "12345",
    };
    const result = await this.sessionsDao.createUser(user);
    expect(Array.isArray(result)).to.be.equal(false)
  });

 
});
