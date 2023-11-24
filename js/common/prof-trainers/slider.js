import { tns } from "tiny-slider";

const setSlider = (container, navContainer)=>{
  return tns({
    container,
    items: 1,
    controls: false,
    navContainer
  })
}

export default setSlider;
