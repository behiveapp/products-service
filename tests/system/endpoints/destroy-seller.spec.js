const request = require('supertest');
const app = require('../../../src/app');
const {initializeSellers, clearSellers, mockSellers, connectMongo} = require('../../utils/sellers');
const mongoose = require('mongoose');

describe('DELETE /:id endpoint', () => {
  beforeAll(() => {
    connectMongo();
  });

  beforeEach(async () => {
    await clearSellers();
    await initializeSellers();
  });

  afterEach(async () => {
    await clearSellers();
  });

  it('Should return 200 status if seller was destroyed', async () => {
    const response = await request(app).delete('/02002002000226');
    expect(response.statusCode).toBe(200);
  });
  
  it('Should destroy seller', async () => {
    await request(app).delete('/02002002000226');
    const response = await request(app).get('/02002002000226');
    expect(response.statusCode).toBe(404);
  });

  it('Should return 404 status if seller wasn`t found', async () => {
    const response = await request(app).delete('/foo');
    expect(response.statusCode).toBe(404);
  });
});