import Accordion from 'accordion-js';
import { settingAccordionAdaptive, closeAllAccordions } from './region-delivery/accordion.js';
import { getData } from './region-delivery/api.js';
import setPopup from './region-delivery/popup.js';
import { setAccordions } from './util/accordion.js';
import './region-delivery/modal.js';
import { setFormSubmit, sendForm, setSuccessState, setErrorState } from './region-delivery/form.js';
import { renderCitiesDelivery } from './region-delivery/regions.js';
import { setNavigation } from './util/navigation.js';
import { setSlider, setSimpleSlider } from './region-delivery/slider.js';

getData((regions) => {
  renderCitiesDelivery(regions);
});

setFormSubmit(sendForm(setSuccessState, setErrorState));

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

setAccordions();

// Navigation

setNavigation('#navigation-in');
setNavigation('#cost-regions');
setNavigation('#global-up');
setNavigation('#receiving-up');
setNavigation('#regions-list-button');
setNavigation('#receiving-close-up', () => closeAllAccordions(accordionDelivery));
