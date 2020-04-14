// import $ from 'jquery';
import { component } from 'picoapp';
import { getClosest } from '../utils/utilities';
/**
 * ----------------------------------------------------------------------------
 * ACCORDION
 * ----------------------------------------------------------------------------
 */

class Accordion {
  constructor(el) {
    this.init(el);
    this.bindEvents();
  }

  init(el) {
    this.el = el;
    // this.$el = $(el);
    this.items = el.querySelectorAll('.Accordion__item');
    this.handleHashUpdate(false);
  }

  bindEvents() {
    this.items.forEach((element) => {
      element.addEventListener('click', (e) => {
        // e.preventDefault();
        // this.toggleItem(element);
        if (
          e.target.classList.contains('Accordion__toggle') ||
          getClosest(e.target, '.Accordion__toggle')
        ) {
          if (e.target.parentElement.nodeName != 'A') {
            e.preventDefault();
            this.toggleItem(element);
          } 
        }
      });
    });

    window.onhashchange = this.handleHashUpdate.bind(this);
  }

  toggleItem(el) {
    if (el.classList.contains('is-active')) {
      if (el.querySelector('.article_toggle')) {
        el.querySelector('.close').style = 'display: none';
        el.querySelector('.open').style = 'display: block';
      }
      el.classList.remove('is-active');
    } else {
      if (el.querySelector('.article_toggle')) {
        el.querySelector('.open').style = 'display: none';
        el.querySelector('.close').style = 'display: block';
      }
      el.classList.add('is-active');
    }
    var optionsArray = Array.prototype.slice.call(this.items);
    var filteredArray = optionsArray.filter((item) => !item.isEqualNode(el));
    filteredArray.forEach((el) => {
      el.classList.remove('is-active');
    });
  }

  handleHashUpdate(autoScroll) {
    if (!window.location.hash) return; // Account for calls without an actual hash change

    const newPanel = this.el.querySelector(
      ':scope > [data-identifier=' + window.location.hash.substring(1) + ']'
    );

    if (newPanel) {
      this.toggleItem(newPanel);

      if (autoScroll) {
        // Scroll tabs into view
        // const panelPos = newPanel.offsetTop - 140;
        jump(newPanel, {
          duration: 600,
          offset: -100,
          a11y: false
        });
        // setTimeout(() => {
        //   window.scrollTo({
        //     top: panelPos,
        //     behavior: 'smooth' // Optional, adds animation
        //   });
        // }, 200);
      }
    }
  }
}

export default component((node, ctx) => {
  new Accordion(node, ctx);
});
