import projects from '../../../json/projects.json';
import { renderProjectGallery } from './project.js';
import { setSlider, setSmallSlider } from './slider.js';
import { getProjectsIndex, formatNumber } from '../util.js';
import Accordion from 'accordion-js';
import settingAccordion from './accordion.js';

renderProjectGallery(projects);


if (document.querySelector('.slider-intro') && document.querySelector('.intro__buttons-block')) {
  setSlider('.slider-intro', '.intro__buttons-block');
}

if (document.querySelector('.slider-best') && document.querySelector('.best__buttons-block')) {
  setSlider('.slider-best', '.best__buttons-block');
}

setSlider('.slider-questions', '.questions__buttons-block');
const progectsGallery = setSmallSlider('.slider-projects__slider', '.slider-projects__buttons', { loop: false });
setSmallSlider('.slider-mob-best__slider', '.slider-mob-best__buttons');
setSmallSlider('.slider-mob-why__slider', '.slider-mob-why__buttons');
setSmallSlider('.slider-mob-projects__slider', '.slider-mob-projects__buttons');

const sliderProjectsButtons = document.querySelector('.slider-projects__buttons');
const slideNumber = document.querySelector('.slider-projects-index');
const slidePrevNumber = slideNumber.querySelector('#slider-projects-prev');
const slideCurrentNumber = slideNumber.querySelector('#slider-projects-current');
const slideNextNumber = slideNumber.querySelector('#slider-projects-next');

slideCurrentNumber.textContent = formatNumber(getProjectsIndex(progectsGallery).current);
slidePrevNumber.textContent = formatNumber(getProjectsIndex(progectsGallery).prev);
slideNextNumber.textContent = formatNumber(getProjectsIndex(progectsGallery).next);


sliderProjectsButtons.addEventListener('click', (evt) => {
  slideCurrentNumber.textContent = formatNumber(getProjectsIndex(progectsGallery).current);
  slidePrevNumber.textContent = formatNumber(getProjectsIndex(progectsGallery).prev);
  slideNextNumber.textContent = formatNumber(getProjectsIndex(progectsGallery).next);
})


new Accordion(Array.from(document.querySelectorAll('.accordion')), settingAccordion());

