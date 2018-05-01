const Product = require('../../../../src/lib/model/product');
const {initializeProducts, clearProducts, connectMongo} = require('../../../utils/products');
const mongoose = require('mongoose');

describe('Product Model', () => {
  beforeAll(() => {
    connectMongo();
  });

  beforeEach(async () => {
    await clearProducts();
    await initializeProducts();
  });

  describe('#find', async () => {
    it('Should return all products', async () => {
      const products = await Product.collection.find().exec();
      
      expect(products.length).toBe(3);
    });
    
  });

  describe('#findOne', async () => {
    it("Should return the correct product if it exists", async () => {
      const product = await Product.collection.findOne({code: 'PROD01'}).exec();
      const {name, code, seller_identifier, categories} = product;
      expect(name).toBe('Product 1');
      expect(code).toBe('PROD01');
      expect(seller_identifier).toBe('01001001000113');
      expect(categories.length).toBe(2);
    });

    it("Should return null if product does not exist", async () => {
      const product = await Product.collection.findOne({identifier: '123'}).exec();

      expect(product).toBeNull();
    });
    
  });

  describe('#save', async () => {
    it("Should save product correctly", async () => {
      const product = new Product({
        seller_identifier: '02002002000226',
        code:'PRODTEST',
        name: 'Test Product',
        categories: ['Category1', 'Category2'],
        price: 29.9,
        description: 'A brief description of the product'
      });

      await product.save();

      const insertedProduct = await Product.findOne({code: 'PRODTEST'});
      
      const {name, code, seller_identifier, categories, price, description} = insertedProduct;
      
      expect(name).toBe('Test Product');
      expect(code).toBe('PRODTEST');
      expect(seller_identifier).toBe('02002002000226');
      expect(categories.length).toBe(2);
      expect(price).toBe(29.9);
      expect(description).toBe('A brief description of the product');
    });

  });
});