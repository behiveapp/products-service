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
    const {body: products} = await request(app).get('/');
    const response = await request(app).get(`/${products[0]._id}`);
    expect(response.statusCode).toBe(200);
  });

  it('Should return the correct product if it was found', async () => {
    const {body: products} = await request(app).get('/');
    const product = products.find(p => (p.code === 'PROD01'));
    const response = await request(app).get(`/${product._id}`);
    const {name, code, seller_identifier, price, description} = response.body;
    
    expect(name).toBe('Product 1');
    expect(code).toBe('PROD01');
    expect(seller_identifier).toBe('01001001000113');
    expect(price).toBe(29.9);
    expect(description).toBe('A brief description of the product');
  });

  it('Should return the correct product if it wasn`t found', async () => {
    const response = await request(app).get('/123');
    expect(response.statusCode).toBe(404);
  });
});