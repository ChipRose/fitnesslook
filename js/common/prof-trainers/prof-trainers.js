import projects from '../../../json/projects.json';
import { renderProjectsGallery } from './projects.js';
import { setPagination } from './slider-pagination.js'
import Accordion from 'accordion-js';
import { removeElements, addListeners, sortProjects } from './util.js';
import { setNavigation } from './navigation.js';
import { setSlider, setSmallSlider, setSimpleSlider, settingSliderAdaptive } from './slider.js';
import { settingAccordion, settingAccordionAdaptive, settingMobileAccordionAdaptive, closeAllAccordions, settingAccordionInSlider } from './accordion.js';
import { renderProductsGallery } from './products.js';
import { getData } from './api.js';
import { getDataStructure } from './data.js';

// Remove section

removeElements([
  'a[data-type="calc-example"]',
  '#sertificates-button',
  '#delivery-button',
  '#garantee-card-button',
  '#projects-info-download',
  '#project-subtitle-pdf',
  '#sale-button'
])

getData((products) => {
  const productsList = getDataStructure(products);
  renderProductsGallery(productsList);
  productsList.forEach(({ id }) => {
    setSmallSlider(`#product-list-${id}`, `#product-list-buttons-${id}`, { responsive: { 768: { items: 2, gutter: 32, edgePadding: 32, } } });
  })
})

renderProjectsGallery(sortProjects(projects));

// Sliders

const sliderIntro = document.querySelector('#slider-intro') && document.querySelector('#slider-intro-buttons') && setSlider('#slider-intro', '#slider-intro-buttons', { gutter: 32, controlsContainer: '#slider-intro-controls', autoHeight: true });

const sliderBest = setSlider('#slider-best', '#slider-best-buttons', { gutter: 32, controlsContainer: '#slider-best-controls', autoHeight: true});

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

const accordionIntro = new Accordion(Array.from(document.querySelectorAll('#accordion-intro')), settingAccordionInSlider(sliderIntro));
settingAccordionAdaptive(accordionIntro, sliderIntro);

const accordionAbout = new Accordion(Array.from(document.querySelectorAll('#accordion-about')), settingAccordion({ showMultiple: true }));
settingAccordionAdaptive(accordionAbout);

const accordionBest = new Accordion(Array.from(document.querySelectorAll('.accordion-best')), settingAccordionInSlider(sliderBest));
settingAccordionAdaptive(accordionBest, sliderBest);

const accordionGarantee = new Accordion(Array.from(document.querySelectorAll('.garantee-list')), settingAccordion({ showMultiple: true }));
settingAccordionAdaptive(accordionGarantee);

const accordionMain = new Accordion(Array.from(document.querySelectorAll('.accordion-main')), settingAccordionInSlider(progectsGallery));

new Accordion(Array.from(document.querySelectorAll('.accordion-questions')), settingAccordion());

// Accordions in slider

sliderBest.events.on('indexChanged', () => {
  settingMobileAccordionAdaptive(accordionBest, sliderBest);
});

sliderIntro.events.on('indexChanged', () => {
  settingMobileAccordionAdaptive(accordionIntro, sliderIntro);
});

progectsGallery.events.on('indexChanged', () => {
  closeAllAccordions(accordionMain);
});

// Navigation

setNavigation('#navigation-in');

// Buttons click

addListeners('a[data-type="calc-button"]', () => $("#callmeform").show());
addListeners('a[data-type="call-button"]', () => $("#callmeform").show());

window.addEventListener("load", () => {
  sliderBest.updateSliderHeight();
  progectsGallery.updateSliderHeight();
  sliderIntro.updateSliderHeight();
});
