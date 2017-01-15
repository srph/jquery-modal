const $ = require('jquery');
require('@srph/jqt');
require('./compensate');
const a11y = require('./a11y');
const ModalError = require('./ModalError');
const body = $('body');
const doc = $(document);

function Modal(el, opts) {
  if (!(this instanceof Modal)) return new Modal(el, opts);

  opts = this.opts = $.extend({}, opts, {
    escapable: true,
    backdrop: el
  });

  this.init = false;
  this.status = false; // Open status
  this.el = el;
  this.dialogue = el.children().get(0);
  this.jqt = el.jqt({ speed: opts.speed });
  this.bind();
}

/**
 * Main application element for accessibility
 */
Modal.main = $('main');

Modal.prototype = {
  /**
   * Bind all required events
   */
  bind: function() {
    var self = this;

    self.init = true;

    if ( self.opts.escapable ) {
      doc.on('keyup', function(evt) {
        if ( evt.which === 27 ) {
          self.close();
        }
      });
    }

    if ( self.opts.backdrop ) {
      var backdrop = $(self.opts.backdrop);

      backdrop.children().on('click', function(evt) {
        evt.stopPropagation();
      });

      backdrop.on('click', function(evt) {
        self.close();
      });
    }
  },

  /**
   * Open the modal
   */
  open: function() {
    if ( this.status ) return;

    this.status = true;
    body.addClass('modal-open');
    this.jqt.enter(function() {
      a11y.focus(Modal.main, this.dialogue);
      this.el.trigger('modal:open');
    }.bind(this));
  },

  /**
   * Close the modal
   */
  close: function() {
    if ( !this.status ) return;

    this.status = false;
    body.removeClass('modal-open');
    this.jqt.exit(function() {
      a11y.restore(Modal.main);
      this.el.trigger('modal:close');
    }.bind(this));
  },
};

module.exports = Modal;