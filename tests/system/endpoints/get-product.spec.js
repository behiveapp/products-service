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

  it('Should return 200 status if product was found', async () => {
    const response = await request(app).get('/PROD01');
    expect(response.statusCode).toBe(200);
  });

  it('Should return the correct product if it was found', async () => {
    const response = await request(app).get('/PROD02');
    const {name, code, seller_identifier} = response.body;
    
    expect(name).toBe('Product 2');
    expect(code).toBe('PROD02');
    expect(seller_identifier).toBe('02002002000226');
  });

  it('Should return the correct product if it wasn`t found', async () => {
    const response = await request(app).get('/123');
    expect(response.statusCode).toBe(404);
  });
});