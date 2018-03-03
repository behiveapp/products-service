const Product = require('../../../../src/lib/model/product');
const {initializeProducts, clearProducts, mockProducts, connectMongo} = require('../../../utils/products');
const mongoose = require('mongoose');

describe('Product Model', () => {
  beforeAll(() => {
    connectMongo();
  });

  beforeEach(async () => {
    await clearProducts();
    await initializeProducts();
  });

  describe('#getAll', async () => {
    it('Should return all products', async () => {
      const products = await Product.collection.find().exec();
      
      expect(products.length).toBe(2);
    });
    
  });

  describe('#find', async () => {
    it("Should return the correct product if it exists", async () => {
      const product = await Product.collection.findOne({identifier: '01001001000113'}).exec();
      const {full_name, short_name, identifier} = product;

      expect(full_name).toBe('Império das Grifes LTDA');
      expect(short_name).toBe('Império das Grifes');
      expect(identifier).toBe('01001001000113');
    });

    it("Should return null if product does not exist", async () => {
      const product = await Product.collection.findOne({identifier: '123'}).exec();

      expect(product).toBeNull();
    });
    
  });
});