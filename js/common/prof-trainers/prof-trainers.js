import setSlider from './slider.js';
import Accordion from 'accordion-js';
import settingAccordion from './accordion.js';


setSlider('.slider-intro','.intro__buttons-block');

new Accordion(['.advantage','.service'], settingAccordion());

console.log('hi');
