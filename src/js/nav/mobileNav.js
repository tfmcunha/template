import {component } from 'picoapp';

class MobileNav{
  constructor(el, ctx) {
    this.ctx = ctx;
    this.button = el.querySelector('.toggle-mobile');
    this.identifier = el.dataset.identifier;
    this.init(el);
    this.bindEvents();
  }

  init(el){
    this.mobileNav = document.querySelector('.NavMobile--main');
  }  

  bindEvents(){
    var self = this;
    this.ctx.on('toggle', (state) => {
      if (state.identifier == this.identifier) {
        this.toggle()
      }
    });
  }

  toggle(){
    var self = this;
    // Bailout if toggle component is disabled
    if (this.disabled) {
      return;
    }
    if (!self.active) {
      this.open();
    } else {
      this.close();
    }
  }

  open(){
    this.active = true;
    this.mobileNav.classList.add('mobileNav--opened');
    this.button.classList.add('active');
  }
  close(){
    this.active = false;
    this.mobileNav.classList.remove('mobileNav--opened')
    this.button.classList.remove('active');
  }
}

export default component((node, ctx) => {
  new MobileNav(node, ctx)
});