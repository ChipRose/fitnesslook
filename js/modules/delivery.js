/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
const OPEN_CLASS = 'button-popup--open';
const popupItems = document.querySelectorAll('.button-popup');
const closeAllPopup = () => {
  popupItems.forEach(item => {
    item.classList.remove(OPEN_CLASS);
  });
};
popupItems.forEach(item => {
  const buttonPopup = item.querySelector('.button-popup__button');
  item.addEventListener('click', () => {
    if (item.classList.contains(OPEN_CLASS)) {
      closeAllPopup();
    } else {
      closeAllPopup();
      item.classList.add(OPEN_CLASS);
    }
  });
  buttonPopup.addEventListener('blur', () => {
    closeAllPopup();
  });
});

/***/ }),
/* 2 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
const CLOSE_CLASS = 'accordion--close';
const accordion = document.querySelector('.accordion');
const accordionButton = accordion.querySelector('.accordion__button');
const accordionContent = accordion.querySelector('.accordion__content');
const accordionBody = accordion.querySelector('.accordion__body');
if (accordion.classList.contains(CLOSE_CLASS)) {
  accordionBody.style.height = 0;
}
accordionButton.addEventListener('click', () => {
  console.log(accordionContent.offsetHeight);
  if (accordion.classList.contains(CLOSE_CLASS)) {
    accordion.classList.remove(CLOSE_CLASS);
    accordionBody.style.height = `${accordionContent.offsetHeight}px`;
  } else {
    accordion.classList.add(CLOSE_CLASS);
    accordionBody.style.height = 0;
  }
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
/* harmony import */ var _delivery_popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _delivery_accordion_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


})();

/******/ })()
;