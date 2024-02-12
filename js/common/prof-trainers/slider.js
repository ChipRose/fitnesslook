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

export { setSlider, setSmallSlider, setSimpleSlider, settingSliderAdaptive, updateSliderAdaptive };
