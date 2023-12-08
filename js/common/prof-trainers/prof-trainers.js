// import projects from '../../../json/projects.json';
// import { renderProjectsGallery } from './projects.js';
// import { setPagination } from './slider-pagination.js'
import Accordion from 'accordion-js';
import { removeElements, addListeners } from './util.js';
import { setNavigation } from './navigation.js';
import { setSlider, setSmallSlider, settingSliderAdaptive } from './slider.js';
import { settingAccordion, settingAccordionAdaptive, settingMobileAccordionAdaptive } from './accordion.js';
import { renderProductsGallery } from './products.js';
import { getData } from './api.js';
import { getDataStructure } from './data.js';

getData((products)=>{
  const productsList= getDataStructure(products);
    renderProductsGallery(productsList);

    productsList.forEach(({ id }) => {
    setSmallSlider(`#product-list-${id}`, `#product-list-buttons-${id}`, { responsive: { 768: { items: 2, gutter: 32, edgePadding: 32, } } });
  })
})
// renderProjectsGallery(projects);

// Sliders

const sliderIntro = document.querySelector('#slider-intro') && document.querySelector('#slider-intro-buttons') && setSlider('#slider-intro', '#slider-intro-buttons',{controlsContainer:'#slider-intro-controls'});

const sliderBest = setSlider('#slider-best', '#slider-best-buttons', { gutter: 32,  controlsContainer:'#slider-best-controls' });

// const progectsGallery = setSmallSlider('.slider-projects__slider', '.slider-projects__buttons', { loop: false });
// setPagination(progectsGallery);

const orderMobSlider = setSmallSlider('#slider-order-small', '#slider-order-small-buttons');
settingSliderAdaptive(orderMobSlider);

const bestFitnessSmallSlider = setSmallSlider('#slider-bestfit-small', '#slider-bestfit-small-buttons');
settingSliderAdaptive(bestFitnessSmallSlider);

const whySmallSlider = setSmallSlider('#slider-why-small', '#slider-why-small-buttons');
settingSliderAdaptive(whySmallSlider);

// setSmallSlider('.slider-mob-projects__slider', '.slider-mob-projects__buttons');

// Accordions

const accordionIntro = new Accordion(Array.from(document.querySelectorAll('#accordion-intro')), settingAccordion({ showMultiple: true }));
settingAccordionAdaptive(accordionIntro);

const accordionAbout = new Accordion(Array.from(document.querySelectorAll('#accordion-about')), settingAccordion({ showMultiple: true }));
settingAccordionAdaptive(accordionAbout);

const accordionBest = new Accordion(Array.from(document.querySelectorAll('.accordion-best')), settingAccordion({ showMultiple: true }));
settingAccordionAdaptive(accordionBest);

const accordionGarantee = new Accordion(Array.from(document.querySelectorAll('.garantee-list')), settingAccordion({ showMultiple: true }));
settingAccordionAdaptive(accordionGarantee);

new Accordion(Array.from(document.querySelectorAll('.accordion-main')));
new Accordion(Array.from(document.querySelectorAll('.accordion-questions')), settingAccordion());

// Accordions in slider

sliderBest.events.on('indexChanged', ()=>{
  settingMobileAccordionAdaptive(accordionBest);
});

sliderIntro.events.on('indexChanged', ()=>{
  settingMobileAccordionAdaptive(accordionIntro);
});

// Remove section

removeElements(['#projects-section', '#projects-detail-section', '#projects-button','a[data-type="calc-example"]'])

// Navigation

setNavigation('#navigation-in');

// Buttons click

addListeners('a[data-type="calc-button"]', ()=>$("#callmeform").show());
addListeners('a[data-type="call-button"]', ()=>$("#callmeform").show());
