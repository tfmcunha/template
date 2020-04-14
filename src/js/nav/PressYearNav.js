import {component } from 'picoapp';
import { getClosest } from '../utils/utilities';

function PressYearNav(){
  const nav_items = document.getElementsByClassName("year__nav");
  filterPressReleases()

  for (var item of nav_items) {
    toggleActive(item);
  }

  function toggleActive(el) {
    el.onclick = () => {
      const active = document.getElementsByClassName('isActive')[0];
      if (el !== active) {
        active.classList.remove('isActive');
        el.classList.add('isActive');
        filterPressReleases();
      }
    }
  }

  function filterPressReleases(){
    const active = document.getElementsByClassName('isActive')[0];
    const pressReleases = document.getElementsByClassName('press-release')
    for (let pressRelease of pressReleases){
      const date = pressRelease.querySelector('.date');
      
      if (!date.innerHTML.includes(active.id)) {
        //getClosest(pressRelease, '.content').classList.add('hide')
        pressRelease.classList.add('hide')
      } else {
        pressRelease.classList.remove('hide')
      }
    }
  }
  
}

export default component((node, ctx) => {
  new PressYearNav()
});