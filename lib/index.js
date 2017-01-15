const $ = require('jquery');
const modal = require('./modal');
const error = require('./error');

$.fn.modal = function interface(opts) {
  opts = opts || {};

  $(this).each(function() {
    if ( typeof opts === 'string' ) {
      if ( !this.modal ) {
        error(`Element hasn't been initialized yet!`);
      }

      this.modal[opts]();
    } else if ( typeof opts === 'object' ) {
      this.modal = modal(this, opts);
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