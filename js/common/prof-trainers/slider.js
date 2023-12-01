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

export { setSlider, setSmallSlider };
