class DataException extends Error {
    constructor(message) {
      super(message);
      this.name = "DataException";
    }
  }
  
  class AlreadyException extends Error {
    constructor(message) {
      super(message);
      this.name = "AlreadyException";
    }
  }
  
  module.exports = { DataException, AlreadyException };