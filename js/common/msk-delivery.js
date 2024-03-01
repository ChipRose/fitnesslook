import Accordion from 'accordion-js';
import { settingAccordionAdaptive, closeAllAccordions } from './delivery/accordion.js';
import { getData } from './delivery/api.js';
import setPopup from './delivery/popup.js';
import initMap from './msk-delivery/map.js';
import './delivery/modal.js';
import { renderQuestionsList } from './delivery/faq.js';
import questions from '../../json/msk-delivery/questions.json';
import { setFormSubmit, sendForm, setSuccessState, setErrorState } from './delivery/form.js';
import { renderCitiesDelivery } from './delivery/regions.js';
import { setNavigation } from './delivery/navigation.js';
import { setSlider, setTableSlider, setSimpleSlider } from './delivery/slider.js';

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
setSimpleSlider('#slider-cost-lifting-buttons', '#slider-cost-lifting');
setSimpleSlider('#slider-delivery-type-buttons', '.receiving-type__main-slider');

if (document.querySelector('#slider-table') && document.querySelector('#slider-table-buttons')) {
  setTableSlider('#slider-table', {
    controlsContainer: '#slider-table-buttons'
  });
}

if (document.querySelector('#slider-table-no-elevator') && document.querySelector('#slider-table-buttons-no-elevator')) {
  setTableSlider('#slider-table-no-elevator', {
    controlsContainer: '#slider-table-buttons-no-elevator'
  });
}

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

// DOM

const column1 = document.querySelector('.receiving-type__col--1');
const columnChild1 = document.querySelector('.receiving-type__col--1').children;
const column2 = document.querySelector('.receiving-type__col--2');
const columnChild2 = document.querySelector('.receiving-type__col--2').children;
let flag = true;

const changeAdvOrder = () => {
  const windowWidth = window.innerWidth;

  if (windowWidth >= 768 && flag) {
    column2.insertBefore(columnChild1[1], columnChild2[0]);
    column1.insertBefore(columnChild2[1], columnChild1[0].nextSibling);
    flag = false;
  }

  if (!flag && windowWidth < 768) {
    column2.insertBefore(columnChild1[1], columnChild2[0]);
    column1.insertBefore(columnChild2[1], columnChild1[0].nextSibling);
    flag = true;
  }
};

changeAdvOrder();

window.addEventListener('resize', changeAdvOrder);

// Navigation

setNavigation('#navigation-in');
setNavigation('#cost-regions');
setNavigation('#global-up');
setNavigation('#receiving-up');
setNavigation('#regions-list-button');
setNavigation('#receiving-close-up', () => closeAllAccordions(accordionDelivery));
