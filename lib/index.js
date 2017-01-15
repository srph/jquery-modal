const $ = window.$ = require('jquery');
const modal = require('./modal');
const ModalError = require('./ModalError');

$.fn.modal = function interface(opts) {
  opts = opts || {};

  $(this).each(function() {
    var el = $(this);

    if ( typeof opts === 'string' ) {
      if ( !el.data('modal') ) {
        throw new ModalError('Element hasn\'t been initialized yet!');
      }

      el.data('modal')[opts]();
    } else if ( typeof opts === 'object' ) {
      if ( el.data('modal') ) {
        throw new ModalError('This element has already been initialized!');
      }

      el.data('modal', modal(el, opts));
    }
  });

  return this;
}

// ----------
// Data API Convenience Binding
// ----------

// Setup Data API to open modal
$('[data-modal]').each(function(key, node) {
  var el = $(node);
  var target = $(el.data('modal'));
  target.modal();

  el.on('click', function(evt) {
    evt.preventDefault();
    target.modal('open');
  });
});

// Setup Data API to close modal
$('[data-modal-close]').each(function(key, node) {
  var el = $(node);
  var target = $(el.data('modal-close'));

  el.on('click', function(evt) {
    evt.preventDefault();
    target.modal('close');
  });
});