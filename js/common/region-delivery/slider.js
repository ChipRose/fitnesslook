import { tns } from 'tiny-slider';

const setSimpleSlider = (buttonsSelector, container, activeSlide = 0) => {
  const sliderButtons = document.querySelector(buttonsSelector);
  const slideContainer = document.querySelector(container);
  const children = Array.from(slideContainer.children);
  const buttons = Array.from(sliderButtons.children);

  buttons?.forEach((element) => element.classList.remove('button-main--active'));
  children?.forEach((element) => {
    element.style.display = 'none';
  });

  children[activeSlide].style.display = 'block';
  buttons[activeSlide].classList.add('button-main--active');

  sliderButtons.addEventListener('click', (evt) => {
    const item = slideContainer.querySelector(`#${evt.target.value}`);

    buttons?.forEach((element) => {
      if (element.value === evt.target.value) {
        element.classList.add('button-main--active');
      } else {
        element.classList.remove('button-main--active');
      }
    });

    children?.forEach((element) => {
      element.style.display = 'none';
    });
    item.style.display = 'block';
  });
};

const setSlider = (container, props) => tns({ container, items: 1, controls: false, gutter: 40, loop: true, ...props });

const setTableSlider = (container, props) => tns({ container, items: 5, nav: false, responsive: { 768: { items: 6 } }, ...props });

const settingSliderAdaptive = (slider) => {
  let newSlider = slider;
  if (window.innerWidth < 768) {
    if (!newSlider.isOn) {
      newSlider = slider.rebuild();
      newSlider.updateSliderHeight();
    }
  } else {
    if (newSlider.isOn) {
      newSlider.destroy();
    }
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      if (!newSlider.isOn) {
        newSlider = slider.rebuild();
        newSlider.updateSliderHeight();
      }
    } else {
      if (newSlider.isOn) {
        newSlider.destroy();
      }
    }
  });
};

const updateSliderAdaptive = (slider) => {
  window.addEventListener('resize', () => {
    slider.updateSliderHeight();
  });
};

export { setSlider, setTableSlider, settingSliderAdaptive, updateSliderAdaptive, setSimpleSlider };
