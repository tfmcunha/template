// import $ from 'jquery';
import { gsap } from 'gsap/all';

import { component } from 'picoapp';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

import { str2json } from '../utils/utilities';

class Modal {
  constructor(el, ctx) {
    this.ctx = ctx;
    this.isActive = false;
    this.identifier = el.dataset.identifier;
    this.init(el);
    this.initAnimations();
    this.bindEvents();
  }

  init(el) {
    // cache elements
    this.el = el;
    this.modal = el;
    this.body = document.querySelector('body');
    this.pageWraper = document.querySelector('.Main');
    this.modalContent = el.querySelector('.Modal__content');
    this.modalBox = el.querySelector('.Modal__box');
    this.backdrop = el.querySelector('.backdrop');

    const defaults = {
      // position: 'left'
    };

    const instanceOptions = str2json(this.el.dataset.options);
    const options = { ...defaults, ...instanceOptions };
  }

  initAnimations() {
    const body = document.body;
    const wrapper = this.el;
    const backdrop = this.backdrop;
    const modal = this.modalBox;

    this.tl = gsap.timeline({
      onStart: () => {
        gsap.set(wrapper, { display: 'flex' });
        body.classList.add('has-modalOpen');
      },
      paused: true,
      onComplete: () => {
        this.isActive = true;
        disableBodyScroll(this.modalContent);
      },
      onReverseComplete: () => {
        this.isActive = false;
        body.classList.remove('has-modalOpen');
        enableBodyScroll(this.modalContent);
        gsap.set(wrapper, { display: 'none' });
      }
    });

    this.tl.set(wrapper, { display: 'flex', immediateRender: false });

    // Shade
    this.tl.from(wrapper, { duration: 0.4, opacity: 0 });
    this.tl.from(backdrop, { duration: 0.35, autoAlpha: 0 });

    this.tl.from(
      modal,
      {
        duration: 0.5,
        y: '50%',
        autoAlpha: 0,
        ease: 'Expo.easeOut'
      },
      '-=0.4'
    );
  }

  bindEvents() {
    this.ctx.on('toggle', (state) => {
      if (state.identifier == this.identifier) {
        this.open();
      }
    });

    this.ctx.on('closeModal', (state) => {
      if (state.identifier == this.identifier) {
        this.close();
      }
    });

    if (this.backdrop) {
      this.backdrop.addEventListener('click', (e) => {
        this.close();
      });
    }

    // Close modal with ESC key
    window.jQuery(document).keyup((e) => {
      if (e.keyCode == 27 && this.isActive) {
        // escape key maps to keycode `27`
        this.close();
      }
    });
  }

  toggle() {
    // Bailout if toggle component is disabled
    if (this.disabled) {
      return;
    }
    if (this.isActive) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    const isActive = new CustomEvent('isActive');
    console.log('open');
    if (this.isActive) {
      return;
    }
    this.tl.play();
    this.el.dispatchEvent(isActive);
  }

  close() {
    const isInactive = new CustomEvent('isInactive');
    if (!this.isActive) {
      return;
    }
    this.tl.reverse();
    this.el.dispatchEvent(isInactive);
  }
}

export default component((node, ctx) => {
  new Modal(node, ctx);
});
