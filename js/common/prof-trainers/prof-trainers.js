import setSlider from './slider.js';
import Accordion from 'accordion-js';
import settingAccordion from './accordion.js';

if (document.querySelector('.slider-intro') && document.querySelector('.intro__buttons-block')) {
  setSlider('.slider-intro', '.intro__buttons-block');
}

if (document.querySelector('.slider-best') && document.querySelector('.best__buttons-block')) {
  setSlider('.slider-best', '.best__buttons-block');
}

new Accordion(Array.from(document.querySelectorAll('.accordion')), settingAccordion());

