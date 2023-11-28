import {setSlider, setMobSlider} from './slider.js';
import Accordion from 'accordion-js';
import settingAccordion from './accordion.js';

if (document.querySelector('.slider-intro') && document.querySelector('.intro__buttons-block')) {
  setSlider('.slider-intro', '.intro__buttons-block');
}

if (document.querySelector('.slider-best') && document.querySelector('.best__buttons-block')) {
  setSlider('.slider-best', '.best__buttons-block');
}

setSlider('.slider-questions', '.questions__buttons-block');

setMobSlider('.slider-with-button__slider', '.slider-with-button__buttons');
setMobSlider('.slider-why', '.why__buttons-block');

new Accordion(Array.from(document.querySelectorAll('.accordion')), settingAccordion());

