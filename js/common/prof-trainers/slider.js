import { tns } from "tiny-slider";

const setSlider = (container, navContainer, props) => {
  return tns({
    container,
    items: 1,
    controls: false,
    navContainer,
    ...props
  })
}

const setSmallSlider = (container, controlsContainer, props) => {
  return tns({
    container,
    items: 1,
    nav: false,
    controlsContainer,
    gutter: 20,
    ...props
  })
}

const settingSliderAdaptive = (cb) => {
  let newSlider=cb;
  if (window.innerWidth < 768) {
    if(!newSlider.isOn)newSlider = cb.rebuild()

  }
  else {
    newSlider.isOn&&newSlider.destroy();
  };

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      if(!newSlider.isOn)newSlider = cb.rebuild()
    }
    else {
      newSlider.isOn&&newSlider.destroy();
    };
  });
}

export { setSlider, setSmallSlider, settingSliderAdaptive };
