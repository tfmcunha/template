import {component } from 'picoapp';

function CtaBelow(node){
  const main = document.getElementsByClassName('Main__content')[0];
  const sibling = node.nextSibling
  const cta = node.querySelector('.CTA');
  const clonedCta = cta.cloneNode(true);
  const cta_container = document.createElement('div');

  cta.classList.add('u-hide--untilTablet')
  cta_container.classList.add('cta_below_container','u-show--untilTablet');
  
  cta_container.appendChild(clonedCta)
  
  main.insertBefore(cta_container, sibling)
}

export default component((node, ctx) => {
  new CtaBelow(node, ctx)
});