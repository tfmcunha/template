import { merge } from 'lodash-es';
import { picoapp } from 'picoapp';
import AppComponents from './AppComponents';
import AppViews from './AppViews';
import AppState from './AppState';
import common from './features/common';
import webfonts from './features/webfonts';
import icons from './features/icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

const components = merge(AppComponents, AppViews);
const app = picoapp(components, AppState);

app.mount(['data-component', 'data-view']);

common.init(app);
webfonts.init();
icons.init();
AOS.init();

window.onscroll = function() {setStickyHeaderColor()};
var header = document.getElementsByClassName("Header")[0];
var sticky = header.offsetTop;
function setStickyHeaderColor() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}