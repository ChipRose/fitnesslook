import Accordion from 'accordion-js';
import { settingAccordionAdaptive, closeAllAccordions } from './region-delivery/accordion.js';
import { getData } from './region-delivery/api.js';
import setPopup from './region-delivery/popup.js';
import initMap from './region-delivery/map.js';
import './region-delivery/modal.js';
import { renderQuestionsList } from './region-delivery/faq.js';
import questions from '../../json/region-delivery/questions.json';
import { setFormSubmit, sendForm, setSuccessState, setErrorState } from './region-delivery/form.js';
import { renderCitiesDelivery } from './region-delivery/regions.js';
import { setNavigation } from './region-delivery/navigation.js';
import { setSlider, setSimpleSlider } from './region-delivery/slider.js';

getData((regions) => {
  renderCitiesDelivery(regions);
});

setFormSubmit(sendForm(setSuccessState, setErrorState));

renderQuestionsList(questions);

// eslint-disable-next-line
ymaps.ready(initMap)
setPopup();

// Sliders

setSimpleSlider('#slider-cost-delivery-buttons', '#slider-cost-delivery');
setSimpleSlider('#slider-delivery-type-buttons', '.receiving-type__main-slider');

if (document.querySelector('#pickup-slider') && document.querySelector('#pickup-slider-buttons')) {
  setSlider('#pickup-slider', {
    controlsContainer: '#pickup-slider-buttons',
    controls: true,
    nav: false
  });
}

// Accordions

const accordionDelivery = new Accordion(Array.from(document.querySelectorAll('.accordion--delivery')));
settingAccordionAdaptive(accordionDelivery);

const accordionFAQ = new Accordion(Array.from(document.querySelectorAll('.accordion--faq')), {
  duration: 100
});

closeAllAccordions(accordionFAQ);

// Navigation

setNavigation('#navigation-in');
setNavigation('#cost-regions');
setNavigation('#global-up');
setNavigation('#receiving-up');
setNavigation('#regions-list-button');
setNavigation('#receiving-close-up', () => closeAllAccordions(accordionDelivery));
