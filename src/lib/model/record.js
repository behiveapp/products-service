const mongoose = require('mongoose');
const {NotFoundMongoException, ValidateMongoException} = require('../exceptions/exceptions');

class Record {

  constructor(data){
    this._document = new this.constructor.collection(data);
  }

  static get collection(){
    collections[this.name] = collections[this.name] || mongoose.model(this.name, this.schema)
    return collections[this.name];
  }

  static find(query){
    return this.collection.find(query).exec();
  }

  static async findOne(query){
    const document = await this.collection.findOne(query).exec();
    if(!document) throw new NotFoundMongoException(this.name, query);
    return Promise.resolve(document);
  }

  static update(query, values){
    try{
      return this.collection.update(query, values).exec();
    } catch(err){
      throw new ValidateMongoException(this.name, err);
    }
  }
  
  save(){
    return new Promise((resolve, reject) => {
      this._document.save((err) => {
        if(err) reject(new ValidateMongoException(this.constructor.name, err));
        resolve(this._document);
      });
    });
  }

}
const collections = {};

module.exports = Record;