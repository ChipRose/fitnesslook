import { tns } from 'tiny-slider';
import IMask from 'imask';

//Counter

const counters = document.querySelectorAll('.counter');

const handleCounterClick = (evt, counter) => {
  const field = counter.querySelector('.counter__field');
  let state = Number(field.value);
  if (evt.target.dataset.count === 'minus') {
    state = state > 1 ? state -= 1 : 1;
  } else {
    state++;
  }
  field.value = state;
};

Array.from(counters).forEach((counter) => {
  const counterButtonBlock = counter.querySelector('.counter__buttons-block');
  counterButtonBlock.addEventListener('click', (evt) => handleCounterClick(evt, counter));
});

//Slider

const setSimpleSlider = (container, controlsContainer) => tns({
  container,
  controlsContainer,
  items: 3,
  nav: false,
  gutter: 8,
  slideBy: 1,
  loop: false,
  rewind: true,
  responsive: {
    798: {
      items: 4
    },
    906: {
      items: 5
    }
  }
});

if (document.querySelector('#date-slider') && document.querySelector('#date-control')) {
  setSimpleSlider('#date-slider', '#date-control');
}

//Input Validation

const loyalityInput = document.querySelector('#card-loyality');
const phoneInput = document.querySelector('#contact-phone');

const maskOptions = {
  mask: [
    { mask: '+{7}(000)000-00-00' },
    { mask: 'FL 0000 0000 00' },
  ]
};

const maskPhoneOptions = {
  mask: [
    { mask: '+{7}(000)000-00-00' },
  ]
};

if (loyalityInput) {
  IMask(loyalityInput, maskOptions);
}

if (phoneInput) {
  IMask(phoneInput, maskPhoneOptions);
}


//Extra control

const controlExtraElement = document.querySelector('.control-extra');


const handleMenuAppearance = () => {
  const conrolElement = document.querySelector('.cart-page__details');
  const controlSectionPosition = conrolElement.getBoundingClientRect().top;

  if (!window.pageYOffset || window.innerWidth >= 1100 || controlSectionPosition < 0) {
    controlExtraElement.style.display = 'none';
    return;
  }

  if (controlExtraElement.style.display === 'none' || controlExtraElement.style.display === '') {
    controlExtraElement.style.display = 'block';
  }
};

if (controlExtraElement) {
  handleMenuAppearance();
  window.addEventListener('scroll', handleMenuAppearance);
  window.addEventListener('resize', handleMenuAppearance);
}


// Accordion

const accordions = Array.from(document.querySelectorAll('.accordion'));

const accordionHandler = (evt) => {
  evt.preventDefault();
  const curentAccordion = evt.target.closest('.accordion');
  const currentContent = evt.target.nextElementSibling;
  curentAccordion.classList.toggle('active');
  if (curentAccordion.classList.contains('active')) {
    currentContent.style.maxHeight = `${currentContent.scrollHeight}px`;
  } else {
    currentContent.style.maxHeight = 0;
  }
};

accordions.forEach((accordion) => {
  accordion.addEventListener('click', accordionHandler);
});
