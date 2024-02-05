import Accordion from 'accordion-js';
import { settingAccordionAdaptive, closeAllAccordions } from './delivery/accordion.js';
import { getData } from './delivery/api.js';
import setPopup from './delivery/popup.js';
import initMap from './delivery/map.js';
import { removeElements } from './delivery/util.js';
import './delivery/modal.js';
import { renderQuestionsList } from './delivery/faq.js';
import questions from '../../json/delivery/questions.json';
import { setFormSubmit, sendForm, setSuccessState, setErrorState } from './delivery/form.js';
import { renderCitiesDelivery } from './delivery/regions.js';
import { setNavigation } from "./delivery/navigation.js";
import { setSlider, setTableSlider, setSimpleSlider } from './delivery/slider.js';

getData((regions) => {
  renderCitiesDelivery(regions);
});

setFormSubmit(sendForm(setSuccessState, setErrorState));

renderQuestionsList(questions);

// Navigation

setNavigation('#navigation-in');
setNavigation('#cost-regions');
setNavigation('#global-up');
setNavigation('#receiving-up');
setNavigation('#regions-list-button');
setNavigation('#receiving-close-up', () => closeAllAccordions(accordionDelivery));

ymaps.ready(initMap);
setPopup();

// Sliders

setSimpleSlider('#slider-cost-delivery-buttons', '#slider-cost-delivery');
setSimpleSlider('#slider-delivery-type-buttons', '.receiving-type__main-slider');


const sliderPickup = document.querySelector('#pickup-slider') && document.querySelector('#pickup-slider-buttons') && setSlider('#pickup-slider', {
  controlsContainer: "#pickup-slider-buttons",
  controls: true,
  nav: false
});


// Accordions

const accordionDelivery = new Accordion(Array.from(document.querySelectorAll('.accordion--delivery')));
settingAccordionAdaptive(accordionDelivery);

new Accordion(Array.from(document.querySelectorAll('.accordion--faq')), {
  duration: 100
});


