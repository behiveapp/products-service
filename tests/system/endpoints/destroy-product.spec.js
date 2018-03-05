const request = require('supertest');
const app = require('../../../src/app');
const {initializeProducts, clearProducts, connectMongo} = require('../../utils/products');
const mongoose = require('mongoose');

describe('DELETE /:id endpoint', () => {
  beforeAll(() => {
    connectMongo();
  });

  beforeEach(async () => {
    await clearProducts();
    await initializeProducts();
  });

  afterEach(async () => {
    await clearProducts();
  });

  it('Should return 200 status if product was destroyed', async () => {
    const response = await request(app).delete('/PROD01');
    expect(response.statusCode).toBe(200);
  });
  
  it('Should destroy product', async () => {
    await request(app).delete('/PROD01');
    const response = await request(app).get('/PROD01');
    expect(response.statusCode).toBe(404);
  });

  it('Should return 404 status if product wasn`t found', async () => {
    const response = await request(app).delete('/foo');
    expect(response.statusCode).toBe(404);
  });
});