require('object-fit-polyfill');
require('respimg-polyfill');
require('bgset');
const lazysizes = require('lazysizes');
const delegate = require('delegate');
import { str2json } from '../utils/utilities';

export default {
  init: function(app) {
    this.app = app;
    this.bindEvents();
  },

  bindEvents: function() {
    // Make the entire block clickable
    delegate(
      document.body,
      '.js-clickBlock',
      'click',
      (e) => {
        // If already a link bailout
        if (e.target.tagName == 'A' || e.target.tagName == 'BUTTON') {
          return;
        }
        const link = e.delegateTarget.querySelector('a');
        if (link && link.href) {
          e.preventDefault();
          window.location.href = link.href;
        }
      },
      false
    );
    delegate(
      document.body,
      '[data-action]',
      'click',
      (e) => {
        e.preventDefault();
        const evData = str2json(e.delegateTarget.dataset.action);
        this.app.emit(evData.type, { identifier: evData.target });
      },
      false
    );
    
  }
};
