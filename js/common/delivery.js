import Accordion from 'accordion-js';
import { settingAccordionAdaptive, settingAccordionInSlider } from './delivery/accordion.js';
import setPopup from './delivery/popup.js';
import initMap from './delivery/map.js';
import './delivery/modal.js';
import './delivery/form.js';
import { setSlider, setTableSlider } from './delivery/slider.js';

setPopup();

const sliderDelivery = setSlider('#slider-deliv', {
  navContainer: '#slider-deliv-buttons',
  autoHeight: true,
  onInit: () => {

    ymaps.ready(initMap);
  }
});


const sliderCost = document.querySelector('#slider-cost-delivery') && document.querySelector('#slider-cost-delivery-buttons') && setSlider('#slider-cost-delivery', {
  navContainer: '#slider-cost-delivery-buttons',
  autoHeight: true,
});

const sliderTable = document.querySelector('#slider-table') && document.querySelector('#slider-table') && setTableSlider('#slider-table', {
  controlsContainer: '#slider-table-buttons',
});

const sliderCostLifting = document.querySelector('#slider-cost-lifting') && document.querySelector('#slider-cost-lifting-buttons') && setSlider('#slider-cost-lifting', {
  navContainer: '#slider-cost-lifting-buttons',
  autoHeight: true,
});

sliderDelivery.events.on('indexChanged', (evt) => {
  settingAccordionAdaptive(accordionDelivery, sliderDelivery);
  if(evt.displayIndex===2) {
    ymaps.ready(initMap);
  }

});

const accordionDelivery = new Accordion(Array.from(document.querySelectorAll('.accordion--delivery')), settingAccordionInSlider(sliderDelivery));
settingAccordionAdaptive(accordionDelivery, sliderDelivery);

const accordionFaq = new Accordion(Array.from(document.querySelectorAll('.accordion--faq')));

