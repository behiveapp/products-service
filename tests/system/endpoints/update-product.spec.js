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
    const {body: products} = await request(app).get('/');
    const response = await request(app).put(`/${products[0]._id}`).send({name: 'Changed Name'});
    expect(response.statusCode).toBe(200);
  });

  it('Should update product and return new values if it was found', async () => {
    const {body: products} = await request(app).get('/');
    const product = products.find(p => (p.code === 'PROD01'));
    const response = await request(app).put(`/${product._id}`).send({name: 'Changed Name'});
    
    const {name, code, seller_identifier} = response.body;
    expect(name).toBe('Changed Name');
    expect(code).toBe('PROD01');
    expect(seller_identifier).toBe('01001001000113');
  });

  it('Should return 404 status if product wasn`t found', async () => {
    const response = await request(app).put('/foo').send({name: 'Changed Name'});
    expect(response.statusCode).toBe(404);
  });
});