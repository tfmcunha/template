var WebFont = require('webfontloader');

export default {
  init: function () {
    WebFont.load({
      //typekit: {
      //  id: 'elp7uls'
      //},
      //google: {
      //  families: ['Cutive+Mono']
      //     families: ['Lora:400,400i']
      //},
      custom: {
        families: ['Axiforma', 'Drama'],
        urls: ['/wp-content/themes/sorensoncomm/src/fonts/stylesheet.css']
      },
      // custom: {
      //     families: ['din:n3,n4,n5,n7,n9', 'dinengschrift:n3,n4,n7'],
      //     urls: ['/wp-content/themes/enve/build/fonts/din.css', '/wp-content/themes/enve/build/fonts/dinengschrift.css']
      // },
      loading: function () {
        const body = document.getElementsByTagName('body')[0]
        body.classList.add('webFontsLoader')    
      },
      active: function () {
        const body = document.getElementsByTagName('body')[0]
        body.classList.remove('webFontsLoader')
        const el = document.getElementsByClassName('is-style-brush')[0]
        if (el != undefined){
          el.style.opacity = 1;
        }
      }
    });
  }
};
