"use strict";

const mongoose = require("mongoose");
const dbHandler = require("./db-handler");
require("dotenv").config();

const Service = require("./test-service");
const Model = require("../models/Products");

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
  await dbHandler.connect();
});
beforeEach(async () => {
  await createP();
});
/**
 * Clear all test data after every test.
 */
afterEach(async () => {
  await dbHandler.clearDatabase();
});
/**
 * Remove and close the db and server.
 */
afterAll(async () => {
  await dbHandler.closeDatabase();
});

//Tests ... //
describe("product getById ", () => {
  /**
   * Should return null if getById doesn't find any user with the provided id.
   */
  it("should return null if nothing is found", async () => {
    await expect(
      Service.getById(mongoose.Types.ObjectId())
    ).resolves.toBeNull();
  });

  /**
   * Should return the correct user if getById finds the user with the provided id.
   */
  it("should retrieve correct product if id matches", async () => {
    const product = await Service.getById(PID);

    expect(product.id).toBe(PID);
    expect(product.title).toBe(P1.title);
  });
});

//Exp
const createP = async () => {
  const created = await Model.create(P1);
  PID = created.id;
  await Model.create(P2);
};

let PID;

const P1 = {
  title: "Candy",
  price: "0.50",
  quantity: "10",
};
const P2 = {
  title: "Chips",
  price: "0.65",
  quantity: "10",
};
