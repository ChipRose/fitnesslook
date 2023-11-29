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

const setMobSlider = (container, controlsContainer, props) => {
  return tns({
    container,
    items: 1,
    nav: false,
    controlsContainer,
    ...props
  })
}

export { setSlider, setMobSlider };
