import { tns } from "tiny-slider";

const setSlider = (container)=>{
  return tns({
    container,
    items: 1,
  })
}

export default setSlider;
