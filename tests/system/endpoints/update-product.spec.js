const request = require('supertest');
const app = require('../../../src/app');
const {initializeProducts, clearProducts, connectMongo} = require('../../utils/products');
const mongoose = require('mongoose');

describe('PUT /:id endpoint', () => {
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

  it('Should return 200 status if product was updated', async () => {
    const response = await request(app).put('/02002002000226').send({full_name: 'Changed Full Name'});
    expect(response.statusCode).toBe(200);
  });

  it('Should update product and return new values if it was found', async () => {
    const response = await request(app).put('/02002002000226').send({full_name: 'Changed Full Name'});
    
    const {full_name, short_name, identifier} = response.body;
    
    expect(full_name).toBe('Changed Full Name');
    expect(short_name).toBe('Computei Consultoria');
    expect(identifier).toBe('02002002000226');
  });

  it('Should return 404 status if product wasn`t found', async () => {
    const response = await request(app).put('/foo').send({full_name: 'Changed Full Name'});
    expect(response.statusCode).toBe(404);
  });
});