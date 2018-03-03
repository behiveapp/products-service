const request = require('supertest');
const app = require('../../../src/app');
const {initializeSellers, clearSellers, mockSellers, connectMongo} = require('../../utils/sellers');
const mongoose = require('mongoose');

describe('POST / endpoint', () => {
  beforeAll(() => {
    connectMongo();
  });

  beforeEach(async () => {
    await clearSellers();
  });

  afterEach(async () => {
    await clearSellers();
  });

  it('Should return 200 status if seller was created', async () => {
    const response = await request(app).post('/').send({identifier: '01001001000113'});
    expect(response.statusCode).toBe(200);
  });

  it('Should return the correct seller if it was found', async () => {
    const response = await request(app).post('/').send({
      identifier: '02002002000226',
      full_name:'Computei Consultoria SA',
      short_name: 'Computei Consultoria'
    });
    
    const {full_name, short_name, identifier} = response.body;
    
    expect(full_name).toBe('Computei Consultoria SA');
    expect(short_name).toBe('Computei Consultoria');
    expect(identifier).toBe('02002002000226');
  });

  it('Should return 422 status if a required field wasn`t informed', async () => {
    const response = await request(app).post('/').send({});
    expect(response.statusCode).toBe(422);
  });
});