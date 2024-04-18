/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// Accordion

const accordions = Array.from(document.querySelectorAll('.accordion'));
const windowWidth = window.innerWidth;
const accordionHandler = evt => {
  evt.preventDefault();
  const curentAccordion = evt.target.closest('.accordion');
  const currentContent = evt.target.nextElementSibling;
  let widthFlag = true;
  if (widthFlag) {
    curentAccordion.classList.toggle('active');
  }
  const closeAccordion = () => {
    curentAccordion.classList.remove('active');
    currentContent.style.maxHeight = 0;
  };
  const closeAccordionHandler = () => {
    const windowCloseWidth = window.innerWidth;
    widthFlag = windowCloseWidth === windowWidth;
    if (!widthFlag) {
      closeAccordion();
    }
  };
  if (curentAccordion.classList.contains('active')) {
    currentContent.style.maxHeight = `${currentContent.scrollHeight}px`;
    window.addEventListener('resize', closeAccordionHandler);
  } else {
    closeAccordion(currentContent);
    window.removeEventListener('resize', closeAccordionHandler);
  }
};
accordions?.forEach(accordion => {
  accordion.addEventListener('click', accordionHandler);
});

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assembly_accordion_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

})();

/******/ })()
;