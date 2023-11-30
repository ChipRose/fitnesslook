import { getProjectsIndex, formatNumber } from './util.js';

const setPagination=(slider)=>{
  const sliderProjectsButtons = document.querySelector('.slider-projects__buttons');
  const slideNumber = document.querySelector('.slider-projects-index');
  const slidePrevNumber = slideNumber.querySelector('#slider-projects-prev');
  const slideCurrentNumber = slideNumber.querySelector('#slider-projects-current');
  const slideNextNumber = slideNumber.querySelector('#slider-projects-next');

  slideCurrentNumber.textContent = formatNumber(getProjectsIndex(slider).current);
  slidePrevNumber.textContent = formatNumber(getProjectsIndex(slider).prev);
  slideNextNumber.textContent = formatNumber(getProjectsIndex(slider).next);


  sliderProjectsButtons.addEventListener('click', () => {
    slideCurrentNumber.textContent = formatNumber(getProjectsIndex(slider).current);
    slidePrevNumber.textContent = formatNumber(getProjectsIndex(slider).prev);
    slideNextNumber.textContent = formatNumber(getProjectsIndex(slider).next);
  })
}

export {setPagination}
