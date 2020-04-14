import {component } from 'picoapp';

function ManAccDropdown(node){
  const dropdown = document.querySelector('.DropDown')
  dropdown.onchange = (e) =>  {
    const id = e.target.value.replace(/[{()}]/g, '').split(' ').join('_').toLowerCase();
    const iframes = document.getElementsByClassName('form_iframe');
    for (let iframe of iframes){
      iframe.style.display = 'none';
    }
    const target = document.getElementById(id);
    target.style.display = "block";
  }

}

export default component((node, ctx) => {
  new ManAccDropdown(node, ctx)
});