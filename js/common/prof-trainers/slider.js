import { tns } from 'tiny-slider';

const setSlider = (container, navContainer, props) => tns({ container, items: 1, controls: false, navContainer, responsive: { 768: { controls: true } }, ...props });

const setSmallSlider = (container, controlsContainer, props) => tns({ container, items: 1, nav: false, controlsContainer, gutter: 20, ...props });

const setSimpleSlider = (container, props) => tns({ container, gutter: 32, items: 1, nav: false, autoHeight: true, ...props });

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

const setTinySlider = (buttonsSelector, container, activeSlide = 0) => {
  const sliderButtons = document.querySelector(buttonsSelector);
  const slideContainer = document.querySelector(container);
  const children = Array.from(slideContainer.children);
  const buttons = Array.from(sliderButtons.children);
  buttons[activeSlide].classList.add('button-basic--active');

  buttons?.forEach((element) => element.classList.remove('button-basic--active'));
  children?.forEach((element) => {
    element.style.display = 'none';
  });

  children[activeSlide].style.display = 'block';
  buttons[activeSlide].classList.add('button-basic--active');

  sliderButtons.addEventListener('click', (evt) => {
    const item = slideContainer.querySelector(`#${evt.target.value}`);

    buttons?.forEach((element) => {
      if (element.value === evt.target.value) {
        element.classList.add('button-basic--active');
      } else {
        element.classList.remove('button-basic--active');
      }
    });

    children?.forEach((element) => {
      element.style.display = 'none';
    });
    item.style.display = 'block';
  });
};

const setScrolSlider = (buttonsSelector, container, mainButtonsSelector, activeSlide = 0) => {
  const sliderButtons = document.querySelector(buttonsSelector);
  const slideContainer = document.querySelector(container);
  const children = Array.from(slideContainer.children);
  const mainButtons = Array.from(document.querySelector(mainButtonsSelector).children);

  children?.forEach((element) => {
    element.style.display = 'none';
  });

  children[activeSlide].style.display = 'block';
  // buttons[activeSlide].classList.add('button-main--active');

  const handleScroll = (evt) => {
    const buttonClicked = evt.target.value;

    const setInitialState = () => {
      children?.forEach((element, index) => {
        element.style.display = 'none';
        mainButtons[index].classList.remove('button-basic--active');
      });
    };

    setInitialState();
    if (buttonClicked === 'next') {
      setInitialState();
      activeSlide = activeSlide < children?.length - 1 ? activeSlide + 1 : 0;
      mainButtons[activeSlide].classList.add('button-basic--active');
      children[activeSlide].style.display = 'block';
    }
    if (buttonClicked === 'prev') {
      setInitialState();
      activeSlide = activeSlide > 0 ? activeSlide - 1 : children?.length - 1;
      mainButtons[activeSlide].classList.add('button-basic--active');
      children[activeSlide].style.display = 'block';
    }
  };

  sliderButtons.addEventListener('click', (evt) => handleScroll(evt));
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && handleScroll) {
      if (handleScroll) {
        sliderButtons.removeEventListener('click', handleScroll);
      }
    }
  });
};

export { setTinySlider, setSlider, setSmallSlider, setSimpleSlider, settingSliderAdaptive, updateSliderAdaptive, setScrolSlider };
