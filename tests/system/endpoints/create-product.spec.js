const request = require('supertest');
const app = require('../../../src/app');
const {initializeProducts, clearProducts, connectMongo} = require('../../utils/products');
const mongoose = require('mongoose');

describe('POST / endpoint', () => {
  beforeAll(() => {
    connectMongo();
  });

  beforeEach(async () => {
    await clearProducts();
  });

  afterEach(async () => {
    await clearProducts();
  });

  it('Should return 200 status if product was created', async () => {
    const response = await request(app).post('/').send({seller_identifier: '01001001000113'});
    expect(response.statusCode).toBe(200);
  });

  it('Should return the correct product if it was created', async () => {
    const response = await request(app).post('/').send({
      seller_identifier: '02002002000226',
      code:'PRODTEST',
      name: 'Test Product'
    });
    
    const {name, code, seller_identifier} = response.body;
    
    expect(name).toBe('Test Product');
    expect(code).toBe('PRODTEST');
    expect(seller_identifier).toBe('02002002000226');
  });

  it('Should return 422 status if a required field wasn`t informed', async () => {
    const response = await request(app).post('/').send({});
    expect(response.statusCode).toBe(422);
  });
});