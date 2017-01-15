function ModalError(msg) {
  this.name = 'ModalError';
  this.message = 'jquery-modal: ' + message;
  this.stack = (new Error()).stack;
}

ModalError.prototype = Object.create(Error.prototype);
ModalError.prototype.constructor = ModalError;

module.exports = ModalError;