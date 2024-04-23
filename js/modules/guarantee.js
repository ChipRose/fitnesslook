/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setAccordions: () => (/* binding */ setAccordions)
/* harmony export */ });
const setAccordions = (selector = '.accordion-simple') => {
  const accordions = Array.from(document.querySelectorAll(selector));
  const windowWidth = window.innerWidth;
  const accordionContentSelector = `${selector}__content`;
  const accordionAdaptiveSelector = `${selector}--mobonly`.substring(1);
  const accordionHandler = evt => {
    evt.preventDefault();
    const currentAccordion = evt.target.closest(selector);
    const currentContent = currentAccordion.querySelector(accordionContentSelector);
    const inactiveAccordion = accordions.filter(accordion => accordion !== currentAccordion && !accordion.classList.contains('open-desk'));
    inactiveAccordion.forEach(accordion => {
      accordion.classList.remove('active');
      accordion.querySelector(accordionContentSelector).style.maxHeight = 0;
    });
    let widthChangeFlag = true;
    const closeAccordion = () => {
      if (!currentAccordion.classList.contains('open-desk')) {
        currentAccordion.classList.remove('active');
        currentContent.style.maxHeight = 0;
      }
    };
    if (widthChangeFlag) {
      currentAccordion.classList.toggle('active');
    }
    const closeAccordionHandler = () => {
      const windowCloseWidth = window.innerWidth;
      widthChangeFlag = windowCloseWidth === windowWidth;
      if (!widthChangeFlag) {
        closeAccordion();
      }
    };
    if (currentAccordion.classList.contains('active')) {
      currentContent.style.maxHeight = `${currentContent.scrollHeight}px`;
      window.addEventListener('resize', closeAccordionHandler);
    } else {
      closeAccordion(currentContent);
      window.removeEventListener('resize', closeAccordionHandler);
    }
  };
  const setAccordionsListener = (accordion, destroyAccordionFlag) => {
    const accordionContent = accordion.querySelector(accordionContentSelector);
    if (accordion.classList.contains(accordionAdaptiveSelector)) {
      if (destroyAccordionFlag) {
        accordion.removeEventListener('click', accordionHandler);
        accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
        accordion.classList.add('open-desk');
      } else {
        accordion.addEventListener('click', accordionHandler);
        accordionContent.style.maxHeight = 0;
        accordion.classList.remove('open-desk');
      }
    } else {
      accordion.addEventListener('click', accordionHandler);
    }
  };
  accordions?.forEach(accordion => {
    setAccordionsListener(accordion);
  });
  const windowChangeDeskWidthFlag = window.innerWidth > 767;
  accordions?.forEach(accordion => {
    setAccordionsListener(accordion, windowChangeDeskWidthFlag);
  });
  window.addEventListener('resize', () => {
    const destroyAccordionFlag = window.innerWidth > 767;
    accordions?.forEach(accordion => {
      setAccordionsListener(accordion, destroyAccordionFlag);
    });
  });
};


/***/ }),
/* 2 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setNavigation: () => (/* binding */ setNavigation)
/* harmony export */ });
const HEADER_HEIGHT = 153;
const navigationHandle = (element, ...callBacks) => {
  const elementHref = element.target.href;
  const elementId = elementHref.substring(elementHref.indexOf('#'));
  const scrollElement = document.querySelector(elementId).offsetTop;
  window.scrollTo({
    top: scrollElement + HEADER_HEIGHT,
    behavior: 'smooth'
  });
  if (callBacks?.length) {
    callBacks.forEach(cb => {
      cb();
    });
  }
};
const setNavigation = (container, ...callBacks) => {
  const navigationList = document.querySelector(container);
  navigationList?.addEventListener('click', evt => {
    evt.preventDefault();
    navigationHandle(evt, ...callBacks);
  });
};


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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
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
/* harmony import */ var _util_accordion_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _util_navigation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);


(0,_util_navigation_js__WEBPACK_IMPORTED_MODULE_1__.setNavigation)('#navigation-in');
(0,_util_navigation_js__WEBPACK_IMPORTED_MODULE_1__.setNavigation)('#global-up');
(0,_util_accordion_js__WEBPACK_IMPORTED_MODULE_0__.setAccordions)('.accordion-simple');
})();

/******/ })()
;