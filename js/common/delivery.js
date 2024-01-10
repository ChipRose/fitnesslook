import Accordion from 'accordion-js';
import { settingAccordionAdaptive,  } from './delivery/accordion.js';
import setPopup from './delivery/popup.js';
import initMap from './delivery/map.js';
import './delivery/modal.js';
import './delivery/form.js';
import { setSlider, setTableSlider,setSimpleSlider } from './delivery/slider.js';

setPopup();


const sliderCost = document.querySelector('#slider-cost-delivery') && document.querySelector('#slider-cost-delivery-buttons') && setSlider('#slider-cost-delivery', {
  navContainer: '#slider-cost-delivery-buttons',
  autoHeight: true,
});

const sliderTable = document.querySelector('#slider-table') && document.querySelector('#slider-table') && setTableSlider('#slider-table', {
  controlsContainer: '#slider-table-buttons',
});

const sliderPickup = document.querySelector('#pickup-slider') && document.querySelector('#pickup-slider-buttons') && setSlider('#pickup-slider', {
  controlsContainer: "#pickup-slider-buttons",
  controls: true,
  nav: false
});

const sliderCostLifting = document.querySelector('#slider-cost-lifting') && document.querySelector('#slider-cost-lifting-buttons') && setSlider('#slider-cost-lifting', {
  navContainer: '#slider-cost-lifting-buttons',
  autoHeight: true,
});



const accordionDelivery = new Accordion(Array.from(document.querySelectorAll('.accordion--delivery')));
settingAccordionAdaptive(accordionDelivery);

const accordionFaq = new Accordion(Array.from(document.querySelectorAll('.accordion--faq')));

settingAccordionAdaptive(accordionDelivery);

setSimpleSlider('#slider-delivery-type-buttons', '.receiving-type__main-slider');


