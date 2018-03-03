class ConnectionException extends Error {
  constructor(name, url = '', params = {}, err = {}, message = '', status = 500) {
    super(message);
    Object.assign(this, {
      name,
      url,
      params,
      err,
      status,
    });
  }
}

class BadRequestException extends Error {
  constructor(name, bodyExpected = [], body = {}, query = {}, message = '', status = 400) {
    super(message);
    Object.assign(this, {
      name,
      bodyExpected,
      body,
      query,
      status,
    });
  }
}

class ResponseException extends Error {
  constructor(name, url = '', response = {}, message = '', status = 500) {
    super(message);
    Object.assign(this, {
      name,
      url,
      response,
      status,
    });
  }
}

class NotFoundMongoException extends Error {
  constructor(name, query = {}, message = 'Document was not found', status = 404) {
    super(message);
    Object.assign(this, {
      name,
      query,
      status,
    });
  }
}

class ValidateMongoException extends Error {
  constructor(name, detail = {}, message = 'Document was not saved', status = 422) {
    super(message);
    Object.assign(this, {
      name,
      detail,
      status,
    });
  }
}


module.exports = {
  ConnectionException,
  BadRequestException,
  ResponseException,
  NotFoundMongoException,
  ValidateMongoException,
};
