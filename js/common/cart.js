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
    906 :{
      items: 5
    }
  }
});

setSimpleSlider('#date-slider', '#date-control');

//Input

const phoneInput = document.querySelector('#card-loyality');

const maskOptions = {
  mask: [
    { mask: '+{7}(000)000-00-00' },
    { mask: 'FL 0000 0000 00' },
  ]
};

IMask(phoneInput, maskOptions);


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

handleMenuAppearance();
window.addEventListener('scroll', handleMenuAppearance);
window.addEventListener('resize', handleMenuAppearance);

