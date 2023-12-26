import Accordion from 'accordion-js';
import { settingAccordionAdaptive, settingAccordionInSlider } from './delivery/accordion.js';
import setPopup from './delivery/popup.js';
import { setSlider } from './delivery/slider.js';

setPopup();

const sliderDelivery = document.querySelector('#slider-delivery') && document.querySelector('#slider-delivery-buttons') && setSlider('#slider-delivery', {
  navContainer: '#slider-delivery-buttons',
  autoHeight: true,
});

const sliderCost = document.querySelector('#slider-cost') && document.querySelector('#slider-cost-buttons') && setSlider('#slider-cost', {
  navContainer: '#slider-cost-buttons',
  autoHeight: true,
});

sliderDelivery.events.on('indexChanged', () => {
  settingAccordionAdaptive(accordionDelivery, sliderDelivery);
});

const accordionDelivery = new Accordion(Array.from(document.querySelectorAll('.accordion')), settingAccordionInSlider(sliderDelivery));
settingAccordionAdaptive(accordionDelivery, sliderDelivery);

