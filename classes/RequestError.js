function RequestError({ message, statusCode }) {
  this.name = "RequestError";
  this.message = message;
  this.statusCode = statusCode;
  this.stack = new Error().stack;
}

RequestError.prototype = Object.create(RequestError.prototype);
RequestError.prototype.constructor = RequestError;

module.exports = RequestError;
