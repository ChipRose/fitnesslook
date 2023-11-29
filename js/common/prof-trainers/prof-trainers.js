import projects from '../../../json/projects.json';
import { renderSlide } from './project.js';
import {setSlider, setMobSlider} from './slider.js';
import Accordion from 'accordion-js';
import settingAccordion from './accordion.js';
// import './project.js';

renderSlide(projects[0]);


if (document.querySelector('.slider-intro') && document.querySelector('.intro__buttons-block')) {
  setSlider('.slider-intro', '.intro__buttons-block');
}

if (document.querySelector('.slider-best') && document.querySelector('.best__buttons-block')) {
  setSlider('.slider-best', '.best__buttons-block');
}

setSlider('.slider-questions', '.questions__buttons-block');

setMobSlider('.slider-mob-best__slider', '.slider-mob-best__buttons');
setMobSlider('.slider-mob-why__slider', '.slider-mob-why__buttons');
setMobSlider('.slider-mob-projects__slider', '.slider-mob-projects__buttons');



new Accordion(Array.from(document.querySelectorAll('.accordion')), settingAccordion());

