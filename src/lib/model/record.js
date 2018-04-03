const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const {NotFoundMongoException, ValidateMongoException} = require('../exceptions/exceptions');

class Record {

  constructor(data){
    this._document = new this.constructor.collection(data);
  }

  static get collection(){
    const { ELASTICSEARCH_HOST = '127.0.0.1', ELASTICSEARCH_PORT = '9200' } = process.env;
    const schema = new mongoose.Schema(this.schema);
    schema.plugin(mongoosastic, {host: ELASTICSEARCH_HOST, port: ELASTICSEARCH_PORT});
    collections[this.name] = collections[this.name] || mongoose.model(this.name, schema);
    collections[this.name].createMapping({
      "analysis" : {
        "analyzer":{
          "content":{
            "type":"custom",
            "tokenizer":"keyword"
          }
        }
      }
    },(err, mapping) => {});
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

  static async findById(id){
    let document;
    if (id.match(/^[0-9a-fA-F]{24}$/)) document = await this.collection.findById(id).exec();
    if(!document) throw new NotFoundMongoException(this.name, id);
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