import Accordion from 'accordion-js';
import { settingAccordionAdaptive, closeAllAccordions } from './region-delivery/accordion.js';
import { getData } from './region-delivery/api.js';
import setPopup from './region-delivery/popup.js';
// import initMap from './region-delivery/map.js';
import './region-delivery/modal.js';
import { renderQuestionsList } from './region-delivery/faq.js';
import questions from '../../json/region-delivery/questions.json';
import { setFormSubmit, sendForm, setSuccessState, setErrorState } from './region-delivery/form.js';
import { renderCitiesDelivery } from './region-delivery/regions.js';
import { setNavigation } from "./region-delivery/navigation.js";
import { setSlider, setTableSlider, setSimpleSlider } from './region-delivery/slider.js';

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

// ymaps.ready(initMap);
setPopup();

// Sliders

setSimpleSlider('#slider-cost-delivery-buttons', '#slider-cost-delivery');
setSimpleSlider('#slider-delivery-type-buttons', '.receiving-type__main-slider');


// Accordions

const accordionDelivery = new Accordion(Array.from(document.querySelectorAll('.accordion--delivery')));
settingAccordionAdaptive(accordionDelivery);

new Accordion(Array.from(document.querySelectorAll('.accordion--faq')), {
  duration: 100
});


