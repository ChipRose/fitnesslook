import { tns } from "tiny-slider";

const setSlider = (container)=>{
  return tns({
    container,
    items: 1,
    controls: false,
    navContainer: ".intro__button-block"
  })
}

export default setSlider;
