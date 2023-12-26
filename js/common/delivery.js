import Accordion from 'accordion-js';
import { settingAccordionAdaptive } from './delivery/accordion.js';
import setPopup from './delivery/popup.js';
import { setSlider } from './delivery/slider.js';

setPopup();



const sliderDelivery = document.querySelector('#slider-delivery') && document.querySelector('#slider-delivery-buttons') && setSlider('#slider-delivery', {
  navContainer: '#slider-delivery-buttons',
  autoHeight: true,
});

sliderDelivery.events.on('indexChanged', () => {
  settingAccordionAdaptive(accordionDelivery, sliderDelivery);
});

const accordionDelivery = new Accordion(Array.from(document.querySelectorAll('.accordion')), {
  duration: 200,
  onOpen: () => {
    sliderDelivery.updateSliderHeight();
  },
  onClose: () => {
    sliderDelivery.updateSliderHeight();
  },
});
settingAccordionAdaptive(accordionDelivery, sliderDelivery);

