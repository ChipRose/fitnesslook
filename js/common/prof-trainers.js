import Accordion from 'accordion-js';
import projects from '../../json/prof-trainers/projects.json';
import './prof-trainers/video.js';
import { renderProjectsGallery } from './prof-trainers/projects.js';
import { setPagination } from './prof-trainers/slider-pagination.js';
import { removeElements, addListeners } from './prof-trainers/util.js';
import { setNavigation } from './prof-trainers/navigation.js';
import { setSmallSlider, setScrolSlider, setSimpleSlider, settingSliderAdaptive, setTinySlider } from './prof-trainers/slider.js';
import { settingAccordion, settingAccordionAdaptive, settingMobileAccordionAdaptive, closeAllAccordions, settingAccordionInSlider } from './prof-trainers/accordion.js';
import { renderProductsGallery } from './prof-trainers/products.js';
import { getData } from './prof-trainers/api.js';
import { getDataStructure } from './prof-trainers/data.js';

// Remove section

removeElements([
  'a[data-type="calc-example"]',
  '#sertificates-button',
  '#delivery-button',
  '#garantee-card-button',
  '#project-subtitle-pdf',
  '#sale-button'
]);

getData((products) => {
  const productsList = getDataStructure(products);
  renderProductsGallery(productsList);
  productsList.forEach(({ id }) => {
    setSmallSlider(`#product-list-${id}`, `#product-list-buttons-${id}`, { responsive: { 768: { items: 2, gutter: 32, edgePadding: 32 } } });
  });
});

renderProjectsGallery(projects);

// Sliders
setTinySlider('#slider-intro-buttons', '#slider-intro');
setScrolSlider('#slider-intro-controls', '#slider-intro', '#slider-intro-buttons');

setTinySlider('#slider-best-buttons', '#slider-best');

const progectsGallery = setSimpleSlider('#slider-projects-details', { controlsContainer: '#slider-projects-details-buttons' });
setPagination(progectsGallery);

const orderSmallSlider = setSmallSlider('#slider-order-small', '#slider-order-small-buttons');
settingSliderAdaptive(orderSmallSlider);

const bestFitnessSmallSlider = setSmallSlider('#slider-bestfit-small', '#slider-bestfit-small-buttons');
settingSliderAdaptive(bestFitnessSmallSlider);

const whySmallSlider = setSmallSlider('#slider-why-small', '#slider-why-small-buttons');
settingSliderAdaptive(whySmallSlider);

const projectsSmallSlider = setSmallSlider('#slider-projects-small', '#slider-projects-small-buttons');
settingSliderAdaptive(projectsSmallSlider);

// Accordions

const accordionIntro = new Accordion(Array.from(document.querySelectorAll('.accordion-intro')));
settingAccordionAdaptive(accordionIntro);

const accordionAbout = new Accordion(Array.from(document.querySelectorAll('#accordion-about')), settingAccordion({ showMultiple: true }));
settingAccordionAdaptive(accordionAbout);

const accordionBest = new Accordion(Array.from(document.querySelectorAll('.accordion-best')));
settingAccordionAdaptive(accordionBest);

const accordionGarantee = new Accordion(Array.from(document.querySelectorAll('.garantee-list')), settingAccordion({ showMultiple: true }));
settingAccordionAdaptive(accordionGarantee);

const accordionsMain = new Accordion(Array.from(document.querySelectorAll('.accordion-main')), settingAccordionInSlider(progectsGallery));

const accordionsProjects = new Accordion(Array.from(document.querySelectorAll('.accordion-projects')), settingAccordionInSlider(progectsGallery));

new Accordion(Array.from(document.querySelectorAll('.accordion-questions')), settingAccordion());

// Accordions in slider

document.querySelector('#slider-intro-buttons').addEventListener('click', () => {
  settingMobileAccordionAdaptive(accordionIntro);
});

document.querySelector('#slider-best-buttons').addEventListener('click', () => {
  settingMobileAccordionAdaptive(accordionBest);
});

progectsGallery.events.on('indexChanged', () => {
  closeAllAccordions(accordionsMain);
});

// Navigation

setNavigation('#navigation-in');
setNavigation('.project-detail-up');
setNavigation('.project-detail-close-up', () => closeAllAccordions(accordionsProjects));

// Buttons click

/* eslint-disable */
addListeners('button[data-type="calc-button"]', () => $('#callmeform').show())
addListeners('button[data-type="call-button"]', () => $('#callmeform').show())
/* eslint-enable */

window.addEventListener('load', () => {
  progectsGallery.updateSliderHeight();
});
