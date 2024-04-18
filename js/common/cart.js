import { tns } from 'tiny-slider';
import IMask from 'imask';
import { Fancybox } from '@fancyapps/ui';

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
  const controlElement = document.querySelector('.cart-page__details') || document.querySelector('.form-order__payment');
  const controlSectionPosition = controlElement?.getBoundingClientRect().top;

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

const parentDiv0 = document.querySelector('.container-extra__col');
const flagElement0 = parentDiv0.querySelector('#summary-section');
const parentDiv1 = flagElement0;
const flagElement1 = parentDiv0.querySelector('.order-content__common-wrapper');
const accordionWrapperElement = parentDiv0.querySelector('#accordion-wrapper');
const orderContentElement = document.querySelector('.order-content');
const windowWidth = window.innerWidth;


const accordionHandler = (evt) => {
  evt.preventDefault();
  const curentAccordion = evt.target.closest('.accordion');
  const currentContent = evt.target.nextElementSibling;
  const extraBlocks = [document.querySelector('.form-order__date'), document.querySelector('.form-order__discount')];
  let widthFlag = true;

  if (widthFlag) {
    [...extraBlocks, curentAccordion]?.forEach((block) => {
      block.classList.toggle('active');
    });
  }

  const closeAccordion = () => {
    parentDiv1?.insertBefore(accordionWrapperElement, flagElement1.nextSibling);
    orderContentElement?.classList.remove('section', 'section--nopad', 'active');

    [...extraBlocks, curentAccordion]?.forEach((block) => {
      block.classList.remove('active');
    });

    [...extraBlocks, currentContent]?.forEach((block) => {
      block.style.maxHeight = 0;
    });
  };

  const closeAccordionHandler = () => {
    const windowCloseWidth = window.innerWidth;
    widthFlag = windowCloseWidth === windowWidth;

    if (!widthFlag) {
      closeAccordion();
    }
  };

  if (curentAccordion.classList.contains('active')) {
    parentDiv0?.insertBefore(accordionWrapperElement, flagElement0.nextSibling);
    orderContentElement?.classList.add('section', 'section--nopad', 'active');

    [...extraBlocks, currentContent]?.forEach((block) => {
      block.style.maxHeight = `${block.scrollHeight}px`;
    });

    window.addEventListener('resize', closeAccordionHandler);

  } else {
    closeAccordion(currentContent);

    window.removeEventListener('resize', closeAccordionHandler);
  }
};

accordions?.forEach((accordion) => {
  accordion.addEventListener('click', accordionHandler);
});


//Modals

const buttonsModal = document.querySelectorAll('.button-radio__modal-button');

buttonsModal?.forEach((button) => {
  button?.addEventListener('click', () => {
    Fancybox.bind('[data-fancybox]', {
    });
  });
});

