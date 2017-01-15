const scope = require('a11y-focus-scope');
const store = require('a11y-focus-store');

/**
 * Handle accessibility
 * @forked https://github.com/cloudflare/react-modal2/blob/master/src/Modal.js#L6-L16
 */
module.exports = {
  focus: function(main, el) {
    store.storeFocus();
    main.length && main.attr('aria-hidden', 'true');
    scope.scopeFocus(el);
  },

  restore: function(main) {
    scope.unscopeFocus();
    main.length && main.removeAttr('aria-hidden');
    store.restoreFocus();
  },
};