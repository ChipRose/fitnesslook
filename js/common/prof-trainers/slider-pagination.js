import { formatNumber } from './util.js';

const getProjectsIndex = (slider) => {
  return {
    current: slider.getInfo().displayIndex,
    next: slider.getInfo().displayIndex === slider.getInfo().slideCount ? 1 : slider.getInfo().displayIndex + 1,
    prev: slider.getInfo().displayIndex === 1 ? slider.getInfo().slideCount : slider.getInfo().displayIndex - 1
  }
}

const setPagination=(slider)=>{
  const slideNumber = document.querySelector('#projects-pagination');
  const slidePrevNumber = slideNumber.querySelector('#slider-projects-prev');
  const slideCurrentNumber = slideNumber.querySelector('#slider-projects-current');
  const slideNextNumber = slideNumber.querySelector('#slider-projects-next');

  slideCurrentNumber.textContent = formatNumber(getProjectsIndex(slider).current);
  slidePrevNumber.textContent = formatNumber(getProjectsIndex(slider).prev);
  slideNextNumber.textContent = formatNumber(getProjectsIndex(slider).next);


  slider.events.on('indexChanged', () => {
    slideCurrentNumber.textContent = formatNumber(getProjectsIndex(slider).current);
    slidePrevNumber.textContent = formatNumber(getProjectsIndex(slider).prev);
    slideNextNumber.textContent = formatNumber(getProjectsIndex(slider).next);
  })
}

export {setPagination}
