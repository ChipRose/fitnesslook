import { tns } from "tiny-slider";

const setSimpleSlider = (buttonsSelector, container) => {
  const sliderButtons = document.querySelector(buttonsSelector);
  const slideContainer = document.querySelector(container);
  const children = Array.from(slideContainer.children);
  const buttons = Array.from(sliderButtons.children);

  buttons.forEach(element => element.classList.remove('button-main--active'));
  children?.forEach(element => {
    element.style.display = 'none';
  });

  children[0].style.display = 'block';
  buttons[0].classList.add('button-main--active');

  sliderButtons.addEventListener('click', (evt) => {
    const item = slideContainer.querySelector(`#${evt.target.value}`);

    buttons.forEach(element => element.classList.remove('button-main--active'));
    evt.target.classList.add('button-main--active');

    children?.forEach(element => {
      element.style.display = 'none';
    });
    item.style.display = 'block';
  })
}

const setSlider = (container, props) => {
  return tns({
    container,
    items: 1,
    controls: false,
    gutter: 40,
    loop: true,
    ...props
  })
};

const setTableSlider = (container, props) => {
  return tns({
    container,
    items: 4,
    nav: false,
    responsive: {
      768:{
        items: 7

      }
    },
    ...props
  })
};


const settingSliderAdaptive = (slider) => {
  let newSlider = slider;
  if (window.innerWidth < 768) {
    if (!newSlider.isOn) newSlider = slider.rebuild()
    newSlider.updateSliderHeight();
  }
  else {
    newSlider.isOn && newSlider.destroy();
  };

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      if (!newSlider.isOn) newSlider = slider.rebuild()
      newSlider.updateSliderHeight();
    }
    else {
      newSlider.isOn && newSlider.destroy();
    };
  });
}

const updateSliderAdaptive = (slider) => {
  window.addEventListener('resize', () => {
    slider.updateSliderHeight();
  });
}



export { setSlider, setTableSlider, settingSliderAdaptive, updateSliderAdaptive, setSimpleSlider };
