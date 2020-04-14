import {component } from 'picoapp';

function CCPA(node){

  const close = node.querySelector('.close');
  close.onclick = () => {
    node.style.display = "none"
  }
}

export default component((node, ctx) => {
  new CCPA(node, ctx)
});