import { setAccordions } from './util/accordion.js';
import { setSimpleSlider } from './util/sliders.js';
import { setNavigation } from './util/navigation.js';

setNavigation('#navigation-in');
setNavigation('#global-up');

setAccordions('.accordion-simple');

setSimpleSlider('#request-slider-buttons', '#request-slider');
