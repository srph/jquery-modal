const $ = require('jquery');
require('@srph/jqt');
require('./compensate');
const a11y = require('./a11y');
const ModalError = require('./ModalError');
const body = $('body');
const doc = $(document);

function Modal(el, opts) {
  if (!(this instanceof Modal)) return new Modal(el, opts);
  this.init = false;
  this.status = false; // Open status
  this.node = el;
  this.wrapped = $(el);
  this.opts = $.extend(opts, {
    escapable: true,
    backdrop: this.wrapped
  });
  this.dialogue = this.wrapped.children().get(0);
  this.jqt = this.wrapped.jqt({ speed: this.opts.speed });
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

    if ( self.init ) {
      throw new ModalError('This element has already been initialized!');
    }

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
    }.bind(this));

    this.wrapped.trigger('modal:open');
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
    });

    this.wrapped.trigger('modal:close');
  },
};

module.exports = Modal;