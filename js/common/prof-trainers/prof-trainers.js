// import projects from '../../../json/projects.json';
// import { renderProjectsGallery } from './projects.js';
// import { setPagination } from './slider-pagination.js'
import hits from '../../../json/trainers.json';
import Accordion from 'accordion-js';
import { removeElements } from './util.js';
import { setNavigation } from './navigation.js';
import { setSlider, setSmallSlider, settingSliderAdaptive } from './slider.js';
import { settingAccordion, settingAccordionAdaptive } from './accordion.js';
import { renderProductsGallery } from './products.js';
import './api.js';



// renderProjectsGallery(projects);
renderProductsGallery(hits);

hits.forEach(({ id }) => {
  setSmallSlider(`#product-list-${id}`, `#product-list-buttons-${id}`, { responsive: { 768: { items: 2, gutter: 32, edgePadding: 32 } } });
})

// Sliders
document.querySelector('#slider-intro') && document.querySelector('#slider-intro-buttons') && setSlider('#slider-intro', '#slider-intro-buttons');


const sliderBest = setSlider('#slider-best', '#slider-best-buttons', { gutter: 32, responsive: { 768: {} } });
// sliderBest.updateSliderHeight();

window.addEventListener('resize', () => {
  sliderBest.updateSliderHeight();

})

// const progectsGallery = setSmallSlider('.slider-projects__slider', '.slider-projects__buttons', { loop: false });
// setPagination(progectsGallery);

const orderMobSlider = setSmallSlider('#slider-order-small', '#slider-order-small-buttons');
settingSliderAdaptive(orderMobSlider);

setSlider('.slider-questions', '.questions__buttons-block');

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

// Remove section

removeElements(['#projects-section', '#projects-detail-section', '#projects-button'])

// Navigation

setNavigation('#navigation-in');

const calcButtons = document.querySelectorAll('a[data-type="calc-button"]')

calcButtons.forEach(button => {
  button.addEventListener('click', (evt) => {
    evt.preventDefault();
    $("#callmeform").show()
  })
})

const GET_LINK = 'https://www.fitnesslook.ru/?products_prof_trainers=1';

fetch(GET_LINK, { mode: 'no-cors' })
  .then((response) => {
    if (response.ok) {
      return response;
    }

    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then((response) => response.json())
  .then((products) => console.log(products))
  .catch((error) => console.log(error));

  fetch(GET_LINK,{
    method:'GET',
    mode:'no-cors'
  })
  .then((response) => response.json())
  .then((posts) => console.log(posts));


