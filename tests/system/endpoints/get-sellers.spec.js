const request = require('supertest');
const app = require('../../../src/app');
const {initializeSellers, clearSellers, mockSellers, connectMongo} = require('../../utils/sellers');
const mongoose = require('mongoose');

describe('GET / endpoint', () => {
  beforeAll(() => {
    connectMongo();
  });

  beforeEach(async () => {
    await clearSellers();
    await initializeSellers();
  });

  it('Should return 200 status', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });

  it('Should return the correct json', async () => {
    const response = await request(app).get('/');

    expect(response.body.length).toBe(2);
  });
});