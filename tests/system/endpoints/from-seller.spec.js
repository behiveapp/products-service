const request = require('supertest');
const app = require('../../../src/app');
const {initializeProducts, clearProducts, connectMongo} = require('../../utils/products');
const mongoose = require('mongoose');

describe('GET /:id endpoint', () => {
  beforeAll(() => {
    connectMongo();
  });

  beforeEach(async () => {
    await clearProducts();
    await initializeProducts();
  });

  it('Should return 200', async () => {
    const response = await request(app).get('/from-seller/02002002000226');
    expect(response.statusCode).toBe(200);
  });

  it('Should return 404 if no id parameter was informed', async () => {
    const response = await request(app).get('/from-seller');
    expect(response.statusCode).toBe(404);
  });

  it('Should return the correct product if it was found', async () => {
    const response = await request(app).get('/from-seller/02002002000226');
    
    expect(response.body.length).toBe(2);
  });

  it('Should return a empty array if no product was found', async () => {
    const response = await request(app).get('/from-seller/foo');
    expect(response.body.length).toBe(0);
  });
});