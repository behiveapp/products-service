const request = require('supertest');
const app = require('../../../src/app');
const {initializeSellers, clearSellers, mockSellers, connectMongo} = require('../../utils/sellers');
const mongoose = require('mongoose');

describe('PUT /:id endpoint', () => {
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

  it('Should return 200 status if seller was updated', async () => {
    const response = await request(app).put('/02002002000226').send({full_name: 'Changed Full Name'});
    expect(response.statusCode).toBe(200);
  });

  it('Should update seller and return new values if it was found', async () => {
    const response = await request(app).put('/02002002000226').send({full_name: 'Changed Full Name'});
    
    const {full_name, short_name, identifier} = response.body;
    
    expect(full_name).toBe('Changed Full Name');
    expect(short_name).toBe('Computei Consultoria');
    expect(identifier).toBe('02002002000226');
  });

  it('Should return 404 status if seller wasn`t found', async () => {
    const response = await request(app).put('/foo').send({full_name: 'Changed Full Name'});
    expect(response.statusCode).toBe(404);
  });
});