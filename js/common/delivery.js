import Accordion from 'accordion-js';
import { settingAccordionAdaptive, settingAccordionInSlider } from './delivery/accordion.js';
import setPopup from './delivery/popup.js';
import { setSlider, setTableSlider } from './delivery/slider.js';

setPopup();

const sliderDelivery = document.querySelector('#slider-delivery') && document.querySelector('#slider-delivery-buttons') && setSlider('#slider-delivery', {
  navContainer: '#slider-delivery-buttons',
  autoHeight: true,
});

const sliderCost = document.querySelector('#slider-cost-delivery') && document.querySelector('#slider-cost-delivery-buttons') && setSlider('#slider-cost-delivery', {
  navContainer: '#slider-cost-delivery-buttons',
  autoHeight: true,
});

const sliderTable = document.querySelector('#slider-table') && document.querySelector('#slider-table') && setTableSlider('#slider-table',{
  controlsContainer: '#slider-table-buttons',
});

const sliderCostLifting = document.querySelector('#slider-cost-lifting') && document.querySelector('#slider-cost-lifting-buttons') && setSlider('#slider-cost-lifting', {
  navContainer: '#slider-cost-lifting-buttons',
  autoHeight: true,
});

sliderDelivery.events.on('indexChanged', () => {
  settingAccordionAdaptive(accordionDelivery, sliderDelivery);
});

const accordionDelivery = new Accordion(Array.from(document.querySelectorAll('.accordion')), settingAccordionInSlider(sliderDelivery));
settingAccordionAdaptive(accordionDelivery, sliderDelivery);

