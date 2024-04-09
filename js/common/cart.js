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
  rewind: true
});

const dateSlider = setSimpleSlider('#date-slider','#date-control');
