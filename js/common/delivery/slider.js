import { tns } from "tiny-slider";

const setSlider = (container, props) => {
  return tns({
    container,
    items: 1,
    controls: false,
    gutter: 40,
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

export { setSlider, settingSliderAdaptive, updateSliderAdaptive };
