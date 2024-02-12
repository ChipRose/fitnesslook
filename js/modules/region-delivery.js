/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

/**
 * Accordion v3.3.4
 * Lightweight and accessible accordion module created in pure Javascript
 * https://github.com/michu2k/Accordion
 *
 * Copyright (c) Michał Strumpf
 * Published under MIT License
 */

!function (e) {
  var t = 0,
    n = function e(n, s) {
      var i = this,
        r = this,
        o = !1;
      if (Array.isArray(n)) return !!n.length && n.map(function (t) {
        return new e(t, s);
      });
      var a = {
        init: function () {
          this.options = Object.assign({
            duration: 600,
            ariaEnabled: !0,
            collapse: !0,
            showMultiple: !1,
            onlyChildNodes: !0,
            openOnInit: [],
            elementClass: "ac",
            triggerClass: "ac-trigger",
            panelClass: "ac-panel",
            activeClass: "is-active",
            beforeOpen: function () {},
            onOpen: function () {},
            beforeClose: function () {},
            onClose: function () {}
          }, s);
          var e = "string" == typeof n;
          this.container = e ? document.querySelector(n) : n, this.createDefinitions(), r.attachEvents();
        },
        createDefinitions: function () {
          var e = this,
            n = this.options,
            s = n.elementClass,
            i = n.openOnInit,
            r = n.onlyChildNodes ? this.container.childNodes : this.container.querySelectorAll(u(s));
          this.elements = Array.from(r).filter(function (e) {
            return e.classList && e.classList.contains(s);
          }), this.firstElement = this.elements[0], this.lastElement = this.elements[this.elements.length - 1], this.elements.filter(function (e) {
            return !e.classList.contains("js-enabled");
          }).forEach(function (n) {
            n.classList.add("js-enabled"), e.generateIDs(n), e.setARIA(n), e.setTransition(n);
            var s = e.elements.indexOf(n);
            t++, i.includes(s) ? e.showElement(n, !1) : e.closeElement(n, !1);
          });
        },
        setTransition: function (e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
            n = this.options,
            s = n.duration,
            i = n.panelClass,
            r = e.querySelector(u(i)),
            o = l("transitionDuration");
          r.style[o] = t ? null : "".concat(s, "ms");
        },
        generateIDs: function (e) {
          var n = this.options,
            s = n.triggerClass,
            i = n.panelClass,
            r = e.querySelector(u(s)),
            o = e.querySelector(u(i));
          e.setAttribute("id", e.id || "ac-".concat(t)), r.setAttribute("id", r.id || "ac-trigger-".concat(t)), o.setAttribute("id", o.id || "ac-panel-".concat(t));
        },
        removeIDs: function (e) {
          var t = this.options,
            n = t.triggerClass,
            s = t.panelClass,
            i = e.querySelector(u(n)),
            r = e.querySelector(u(s));
          e.id.startsWith("ac-") && e.removeAttribute("id"), i.id.startsWith("ac-") && i.removeAttribute("id"), r.id.startsWith("ac-") && r.removeAttribute("id");
        },
        setARIA: function (e) {
          var t = this.options,
            n = t.ariaEnabled,
            s = t.triggerClass,
            i = t.panelClass;
          if (n) {
            var r = e.querySelector(u(s)),
              o = e.querySelector(u(i));
            r.setAttribute("role", "button"), r.setAttribute("aria-controls", o.id), r.setAttribute("aria-disabled", !1), r.setAttribute("aria-expanded", !1), o.setAttribute("role", "region"), o.setAttribute("aria-labelledby", r.id);
          }
        },
        updateARIA: function (e, t) {
          var n = t.ariaExpanded,
            s = t.ariaDisabled,
            i = this.options,
            r = i.ariaEnabled,
            o = i.triggerClass;
          if (r) {
            var a = e.querySelector(u(o));
            a.setAttribute("aria-expanded", n), a.setAttribute("aria-disabled", s);
          }
        },
        removeARIA: function (e) {
          var t = this.options,
            n = t.ariaEnabled,
            s = t.triggerClass,
            i = t.panelClass;
          if (n) {
            var r = e.querySelector(u(s)),
              o = e.querySelector(u(i));
            r.removeAttribute("role"), r.removeAttribute("aria-controls"), r.removeAttribute("aria-disabled"), r.removeAttribute("aria-expanded"), o.removeAttribute("role"), o.removeAttribute("aria-labelledby");
          }
        },
        focus: function (e, t) {
          e.preventDefault();
          var n = this.options.triggerClass;
          t.querySelector(u(n)).focus();
        },
        focusFirstElement: function (e) {
          this.focus(e, this.firstElement), this.currFocusedIdx = 0;
        },
        focusLastElement: function (e) {
          this.focus(e, this.lastElement), this.currFocusedIdx = this.elements.length - 1;
        },
        focusNextElement: function (e) {
          var t = this.currFocusedIdx + 1;
          if (t > this.elements.length - 1) return this.focusFirstElement(e);
          this.focus(e, this.elements[t]), this.currFocusedIdx = t;
        },
        focusPrevElement: function (e) {
          var t = this.currFocusedIdx - 1;
          if (t < 0) return this.focusLastElement(e);
          this.focus(e, this.elements[t]), this.currFocusedIdx = t;
        },
        showElement: function (e) {
          var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
            n = this.options,
            s = n.panelClass,
            i = n.activeClass,
            r = n.collapse,
            o = n.beforeOpen;
          t && o(e);
          var a = e.querySelector(u(s)),
            l = a.scrollHeight;
          e.classList.add(i), requestAnimationFrame(function () {
            requestAnimationFrame(function () {
              a.style.height = t ? "".concat(l, "px") : "auto";
            });
          }), this.updateARIA(e, {
            ariaExpanded: !0,
            ariaDisabled: !r
          });
        },
        closeElement: function (e) {
          var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
            n = this.options,
            s = n.panelClass,
            i = n.activeClass,
            r = n.beforeClose,
            o = e.querySelector(u(s)),
            a = o.scrollHeight;
          e.classList.remove(i), t ? (r(e), requestAnimationFrame(function () {
            o.style.height = "".concat(a, "px"), requestAnimationFrame(function () {
              o.style.height = 0;
            });
          })) : o.style.height = 0, this.updateARIA(e, {
            ariaExpanded: !1,
            ariaDisabled: !1
          });
        },
        toggleElement: function (e) {
          var t = this.options,
            n = t.activeClass,
            s = t.collapse,
            i = e.classList.contains(n);
          if (!i || s) return i ? this.closeElement(e) : this.showElement(e);
        },
        closeElements: function () {
          var e = this,
            t = this.options,
            n = t.activeClass;
          t.showMultiple || this.elements.forEach(function (t, s) {
            t.classList.contains(n) && s !== e.currFocusedIdx && e.closeElement(t);
          });
        },
        handleClick: function (e) {
          var t = this,
            n = e.currentTarget;
          this.elements.forEach(function (s, i) {
            s.contains(n) && "A" !== e.target.nodeName && (t.currFocusedIdx = i, t.closeElements(), t.focus(e, s), t.toggleElement(s));
          });
        },
        handleKeydown: function (e) {
          switch (e.key) {
            case "ArrowUp":
              return this.focusPrevElement(e);
            case "ArrowDown":
              return this.focusNextElement(e);
            case "Home":
              return this.focusFirstElement(e);
            case "End":
              return this.focusLastElement(e);
            default:
              return null;
          }
        },
        handleFocus: function (e) {
          var t = e.currentTarget,
            n = this.elements.find(function (e) {
              return e.contains(t);
            });
          this.currFocusedIdx = this.elements.indexOf(n);
        },
        handleTransitionEnd: function (e) {
          if (e.stopPropagation(), "height" === e.propertyName) {
            var t = this.options,
              n = t.onOpen,
              s = t.onClose,
              i = e.currentTarget,
              r = parseInt(i.style.height),
              o = this.elements.find(function (e) {
                return e.contains(i);
              });
            r > 0 ? (i.style.height = "auto", n(o)) : s(o);
          }
        }
      };
      this.attachEvents = function () {
        if (!o) {
          var e = a.options,
            t = e.triggerClass,
            n = e.panelClass;
          a.handleClick = a.handleClick.bind(a), a.handleKeydown = a.handleKeydown.bind(a), a.handleFocus = a.handleFocus.bind(a), a.handleTransitionEnd = a.handleTransitionEnd.bind(a), a.elements.forEach(function (e) {
            var s = e.querySelector(u(t)),
              i = e.querySelector(u(n));
            s.addEventListener("click", a.handleClick), s.addEventListener("keydown", a.handleKeydown), s.addEventListener("focus", a.handleFocus), i.addEventListener("webkitTransitionEnd", a.handleTransitionEnd), i.addEventListener("transitionend", a.handleTransitionEnd);
          }), o = !0;
        }
      }, this.detachEvents = function () {
        if (o) {
          var e = a.options,
            t = e.triggerClass,
            n = e.panelClass;
          a.elements.forEach(function (e) {
            var s = e.querySelector(u(t)),
              i = e.querySelector(u(n));
            s.removeEventListener("click", a.handleClick), s.removeEventListener("keydown", a.handleKeydown), s.removeEventListener("focus", a.handleFocus), i.removeEventListener("webkitTransitionEnd", a.handleTransitionEnd), i.removeEventListener("transitionend", a.handleTransitionEnd);
          }), o = !1;
        }
      }, this.toggle = function (e) {
        var t = a.elements[e];
        t && a.toggleElement(t);
      }, this.open = function (e) {
        var t = a.elements[e];
        t && a.showElement(t);
      }, this.openAll = function () {
        var e = a.options,
          t = e.activeClass,
          n = e.onOpen;
        a.elements.forEach(function (e) {
          e.classList.contains(t) || (a.showElement(e, !1), n(e));
        });
      }, this.close = function (e) {
        var t = a.elements[e];
        t && a.closeElement(t);
      }, this.closeAll = function () {
        var e = a.options,
          t = e.activeClass,
          n = e.onClose;
        a.elements.forEach(function (e) {
          e.classList.contains(t) && (a.closeElement(e, !1), n(e));
        });
      }, this.destroy = function () {
        i.detachEvents(), i.openAll(), a.elements.forEach(function (e) {
          a.removeIDs(e), a.removeARIA(e), a.setTransition(e, !0);
        }), o = !0;
      }, this.update = function () {
        a.createDefinitions(), i.detachEvents(), i.attachEvents();
      };
      var l = function (e) {
          return "string" == typeof document.documentElement.style[e] ? e : (e = c(e), e = "webkit".concat(e));
        },
        c = function (e) {
          return e.charAt(0).toUpperCase() + e.slice(1);
        },
        u = function (e) {
          return ".".concat(CSS.escape(e));
        };
      a.init();
    };
   true && void 0 !== module.exports ? module.exports = n : e.Accordion = n;
}(window);

/***/ }),
/* 2 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeAllAccordions: () => (/* binding */ closeAllAccordions),
/* harmony export */   settingAccordionAdaptive: () => (/* binding */ settingAccordionAdaptive)
/* harmony export */ });
const closeAllAccordions = accordions => {
  accordions?.forEach(item => {
    item.closeAll();
  });
};
const closeAllMobileAccordions = accordions => {
  if (window.innerWidth < 768) {
    accordions?.forEach(item => {
      item.closeAll();
    });
  }
};
const openAllDeskAccordions = accordions => {
  if (window.innerWidth >= 768) {
    accordions?.forEach(item => {
      item.openAll();
    });
  }
};
const settingAccordionAdaptive = (accordion, slider) => {
  let newAccordion = accordion;
  if (!Array.isArray(accordion)) {
    newAccordion = [accordion];
  }
  closeAllMobileAccordions(newAccordion);
  openAllDeskAccordions(newAccordion);
  slider?.updateSliderHeight();
  window.addEventListener('resize', () => {
    closeAllMobileAccordions(newAccordion);
    openAllDeskAccordions(newAccordion);
    slider?.updateSliderHeight();
  });
};


/***/ }),
/* 3 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getData: () => (/* binding */ getData),
/* harmony export */   sendData: () => (/* binding */ sendData)
/* harmony export */ });
const GET_LINK = 'https://www.fitnesslook.ru/api_front/list_domain/';
const POST_LINK = 'https://www.fitnesslook.ru/api_front/lid/';
const getData = (onSuccess, onError = () => {}) => {
  fetch(GET_LINK).then(response => {
    if (response.ok) {
      const regions = response.json();
      return regions;
    }
    throw new Error(`${response.status} — ${response.statusText}`);
  }).then(products => onSuccess(products)).catch(error => onError(error));
};
const sendData = (onSuccess, onError, data) => {
  fetch(POST_LINK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.ok ? onSuccess() : onError()).catch(() => onError());
};


/***/ }),
/* 4 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const OPEN_CLASS = 'button-popup--open';
const closeAllPopup = popupItems => {
  popupItems?.forEach(item => {
    item.classList.remove(OPEN_CLASS);
    item.querySelector('.button-popup__modal').style.opacity = 0;
  });
};
const setPopup = popupProperties => {
  const {
    popupClass = '.button-popup',
    buttonClass = '.button-popup__button'
  } = popupProperties || {};
  const popupItems = document.querySelectorAll(popupClass);
  popupItems.forEach(item => {
    const buttonPopup = item.querySelector(buttonClass);
    item.addEventListener('click', () => {
      if (item.classList.contains(OPEN_CLASS)) {
        closeAllPopup(popupItems);
      } else {
        closeAllPopup(popupItems);
        item.classList.add(OPEN_CLASS);
        item.querySelector('.button-popup__modal').style.opacity = 1;
      }
    });
    buttonPopup.addEventListener('blur', () => {
      closeAllPopup(popupItems);
    });
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setPopup);

/***/ }),
/* 5 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const LOCATION = {
  center: [59.997230, 30.269389],
  controls: ['zoomControl'],
  zoom: 16
};
const ANCOR = {
  iconLayout: 'default#image',
  iconImageHref: '/i/media/stat/icons/ancor.svg',
  icon_imagesize: [200, 200]
};
const map = document.querySelector('#map');
map.replaceChildren();
const initMap = () => {
  const myMap = new ymaps.Map('map', LOCATION);
  const myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, ANCOR);
  myMap.controls.get('zoomControl').options.set('size', 'small');
  myMap.behaviors.disable('drag');
  myMap.geoObjects.add(myPlacemark);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initMap);

/***/ }),
/* 6 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fancyapps_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7);

const buttonsModal = document.querySelectorAll('.button-modal__button');
buttonsModal.forEach(button => {
  button?.addEventListener('click', () => {
    _fancyapps_ui__WEBPACK_IMPORTED_MODULE_0__.Fancybox.bind('[data-fancybox]', {});
  });
});

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Carousel: () => (/* binding */ J),
/* harmony export */   Fancybox: () => (/* binding */ Ce),
/* harmony export */   Panzoom: () => (/* binding */ k)
/* harmony export */ });
const t = (t, e = 1e4) => (t = parseFloat(t + "") || 0, Math.round((t + Number.EPSILON) * e) / e),
  e = function (t) {
    if (!(t && t instanceof Element && t.offsetParent)) return !1;
    const e = t.scrollHeight > t.clientHeight,
      i = window.getComputedStyle(t).overflowY,
      n = -1 !== i.indexOf("hidden"),
      s = -1 !== i.indexOf("visible");
    return e && !n && !s;
  },
  i = function (t, n = void 0) {
    return !(!t || t === document.body || n && t === n) && (e(t) ? t : i(t.parentElement, n));
  },
  n = function (t) {
    var e = new DOMParser().parseFromString(t, "text/html").body;
    if (e.childElementCount > 1) {
      for (var i = document.createElement("div"); e.firstChild;) i.appendChild(e.firstChild);
      return i;
    }
    return e.firstChild;
  },
  s = t => `${t || ""}`.split(" ").filter(t => !!t),
  o = (t, e, i) => {
    t && s(e).forEach(e => {
      t.classList.toggle(e, i || !1);
    });
  };
class a {
  constructor(t) {
    Object.defineProperty(this, "pageX", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "pageY", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "clientX", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "clientY", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "id", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "time", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "nativePointer", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), this.nativePointer = t, this.pageX = t.pageX, this.pageY = t.pageY, this.clientX = t.clientX, this.clientY = t.clientY, this.id = self.Touch && t instanceof Touch ? t.identifier : -1, this.time = Date.now();
  }
}
const r = {
  passive: !1
};
class l {
  constructor(t, {
    start: e = () => !0,
    move: i = () => {},
    end: n = () => {}
  }) {
    Object.defineProperty(this, "element", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "startCallback", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "moveCallback", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "endCallback", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "currentPointers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "startPointers", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), this.element = t, this.startCallback = e, this.moveCallback = i, this.endCallback = n;
    for (const t of ["onPointerStart", "onTouchStart", "onMove", "onTouchEnd", "onPointerEnd", "onWindowBlur"]) this[t] = this[t].bind(this);
    this.element.addEventListener("mousedown", this.onPointerStart, r), this.element.addEventListener("touchstart", this.onTouchStart, r), this.element.addEventListener("touchmove", this.onMove, r), this.element.addEventListener("touchend", this.onTouchEnd), this.element.addEventListener("touchcancel", this.onTouchEnd);
  }
  onPointerStart(t) {
    if (!t.buttons || 0 !== t.button) return;
    const e = new a(t);
    this.currentPointers.some(t => t.id === e.id) || this.triggerPointerStart(e, t) && (window.addEventListener("mousemove", this.onMove), window.addEventListener("mouseup", this.onPointerEnd), window.addEventListener("blur", this.onWindowBlur));
  }
  onTouchStart(t) {
    for (const e of Array.from(t.changedTouches || [])) this.triggerPointerStart(new a(e), t);
    window.addEventListener("blur", this.onWindowBlur);
  }
  onMove(t) {
    const e = this.currentPointers.slice(),
      i = "changedTouches" in t ? Array.from(t.changedTouches || []).map(t => new a(t)) : [new a(t)],
      n = [];
    for (const t of i) {
      const e = this.currentPointers.findIndex(e => e.id === t.id);
      e < 0 || (n.push(t), this.currentPointers[e] = t);
    }
    n.length && this.moveCallback(t, this.currentPointers.slice(), e);
  }
  onPointerEnd(t) {
    t.buttons > 0 && 0 !== t.button || (this.triggerPointerEnd(t, new a(t)), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur));
  }
  onTouchEnd(t) {
    for (const e of Array.from(t.changedTouches || [])) this.triggerPointerEnd(t, new a(e));
  }
  triggerPointerStart(t, e) {
    return !!this.startCallback(e, t, this.currentPointers.slice()) && (this.currentPointers.push(t), this.startPointers.push(t), !0);
  }
  triggerPointerEnd(t, e) {
    const i = this.currentPointers.findIndex(t => t.id === e.id);
    i < 0 || (this.currentPointers.splice(i, 1), this.startPointers.splice(i, 1), this.endCallback(t, e, this.currentPointers.slice()));
  }
  onWindowBlur() {
    this.clear();
  }
  clear() {
    for (; this.currentPointers.length;) {
      const t = this.currentPointers[this.currentPointers.length - 1];
      this.currentPointers.splice(this.currentPointers.length - 1, 1), this.startPointers.splice(this.currentPointers.length - 1, 1), this.endCallback(new Event("touchend", {
        bubbles: !0,
        cancelable: !0,
        clientX: t.clientX,
        clientY: t.clientY
      }), t, this.currentPointers.slice());
    }
  }
  stop() {
    this.element.removeEventListener("mousedown", this.onPointerStart, r), this.element.removeEventListener("touchstart", this.onTouchStart, r), this.element.removeEventListener("touchmove", this.onMove, r), this.element.removeEventListener("touchend", this.onTouchEnd), this.element.removeEventListener("touchcancel", this.onTouchEnd), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur);
  }
}
function c(t, e) {
  return e ? Math.sqrt(Math.pow(e.clientX - t.clientX, 2) + Math.pow(e.clientY - t.clientY, 2)) : 0;
}
function h(t, e) {
  return e ? {
    clientX: (t.clientX + e.clientX) / 2,
    clientY: (t.clientY + e.clientY) / 2
  } : t;
}
const d = t => "object" == typeof t && null !== t && t.constructor === Object && "[object Object]" === Object.prototype.toString.call(t),
  u = (t, ...e) => {
    const i = e.length;
    for (let n = 0; n < i; n++) {
      const i = e[n] || {};
      Object.entries(i).forEach(([e, i]) => {
        const n = Array.isArray(i) ? [] : {};
        t[e] || Object.assign(t, {
          [e]: n
        }), d(i) ? Object.assign(t[e], u(n, i)) : Array.isArray(i) ? Object.assign(t, {
          [e]: [...i]
        }) : Object.assign(t, {
          [e]: i
        });
      });
    }
    return t;
  },
  p = function (t, e) {
    return t.split(".").reduce((t, e) => "object" == typeof t ? t[e] : void 0, e);
  };
class f {
  constructor(t = {}) {
    Object.defineProperty(this, "options", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: t
    }), Object.defineProperty(this, "events", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: new Map()
    }), this.setOptions(t);
    for (const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) t.startsWith("on") && "function" == typeof this[t] && (this[t] = this[t].bind(this));
  }
  setOptions(t) {
    this.options = t ? u({}, this.constructor.defaults, t) : {};
    for (const [t, e] of Object.entries(this.option("on") || {})) this.on(t, e);
  }
  option(t, ...e) {
    let i = p(t, this.options);
    return i && "function" == typeof i && (i = i.call(this, this, ...e)), i;
  }
  optionFor(t, e, i, ...n) {
    let s = p(e, t);
    var o;
    "string" != typeof (o = s) || isNaN(o) || isNaN(parseFloat(o)) || (s = parseFloat(s)), "true" === s && (s = !0), "false" === s && (s = !1), s && "function" == typeof s && (s = s.call(this, this, t, ...n));
    let a = p(e, this.options);
    return a && "function" == typeof a ? s = a.call(this, this, t, ...n, s) : void 0 === s && (s = a), void 0 === s ? i : s;
  }
  cn(t) {
    const e = this.options.classes;
    return e && e[t] || "";
  }
  localize(t, e = []) {
    t = String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, (t, e, i) => {
      let n = "";
      return i ? n = this.option(`${e[0] + e.toLowerCase().substring(1)}.l10n.${i}`) : e && (n = this.option(`l10n.${e}`)), n || (n = t), n;
    });
    for (let i = 0; i < e.length; i++) t = t.split(e[i][0]).join(e[i][1]);
    return t = t.replace(/\{\{(.*?)\}\}/g, (t, e) => e);
  }
  on(t, e) {
    let i = [];
    "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), this.events || (this.events = new Map()), i.forEach(t => {
      let i = this.events.get(t);
      i || (this.events.set(t, []), i = []), i.includes(e) || i.push(e), this.events.set(t, i);
    });
  }
  off(t, e) {
    let i = [];
    "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), i.forEach(t => {
      const i = this.events.get(t);
      if (Array.isArray(i)) {
        const t = i.indexOf(e);
        t > -1 && i.splice(t, 1);
      }
    });
  }
  emit(t, ...e) {
    [...(this.events.get(t) || [])].forEach(t => t(this, ...e)), "*" !== t && this.emit("*", t, ...e);
  }
}
Object.defineProperty(f, "version", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: "5.0.33"
}), Object.defineProperty(f, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {}
});
class g extends f {
  constructor(t = {}) {
    super(t), Object.defineProperty(this, "plugins", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {}
    });
  }
  attachPlugins(t = {}) {
    const e = new Map();
    for (const [i, n] of Object.entries(t)) {
      const t = this.option(i),
        s = this.plugins[i];
      s || !1 === t ? s && !1 === t && (s.detach(), delete this.plugins[i]) : e.set(i, new n(this, t || {}));
    }
    for (const [t, i] of e) this.plugins[t] = i, i.attach();
  }
  detachPlugins(t) {
    t = t || Object.keys(this.plugins);
    for (const e of t) {
      const t = this.plugins[e];
      t && t.detach(), delete this.plugins[e];
    }
    return this.emit("detachPlugins"), this;
  }
}
var m;
!function (t) {
  t[t.Init = 0] = "Init", t[t.Error = 1] = "Error", t[t.Ready = 2] = "Ready", t[t.Panning = 3] = "Panning", t[t.Mousemove = 4] = "Mousemove", t[t.Destroy = 5] = "Destroy";
}(m || (m = {}));
const v = ["a", "b", "c", "d", "e", "f"],
  b = {
    PANUP: "Move up",
    PANDOWN: "Move down",
    PANLEFT: "Move left",
    PANRIGHT: "Move right",
    ZOOMIN: "Zoom in",
    ZOOMOUT: "Zoom out",
    TOGGLEZOOM: "Toggle zoom level",
    TOGGLE1TO1: "Toggle zoom level",
    ITERATEZOOM: "Toggle zoom level",
    ROTATECCW: "Rotate counterclockwise",
    ROTATECW: "Rotate clockwise",
    FLIPX: "Flip horizontally",
    FLIPY: "Flip vertically",
    FITX: "Fit horizontally",
    FITY: "Fit vertically",
    RESET: "Reset",
    TOGGLEFS: "Toggle fullscreen"
  },
  y = {
    content: null,
    width: "auto",
    height: "auto",
    panMode: "drag",
    touch: !0,
    dragMinThreshold: 3,
    lockAxis: !1,
    mouseMoveFactor: 1,
    mouseMoveFriction: .12,
    zoom: !0,
    pinchToZoom: !0,
    panOnlyZoomed: "auto",
    minScale: 1,
    maxScale: 2,
    friction: .25,
    dragFriction: .35,
    decelFriction: .05,
    click: "toggleZoom",
    dblClick: !1,
    wheel: "zoom",
    wheelLimit: 7,
    spinner: !0,
    bounds: "auto",
    infinite: !1,
    rubberband: !0,
    bounce: !0,
    maxVelocity: 75,
    transformParent: !1,
    classes: {
      content: "f-panzoom__content",
      isLoading: "is-loading",
      canZoomIn: "can-zoom_in",
      canZoomOut: "can-zoom_out",
      isDraggable: "is-draggable",
      isDragging: "is-dragging",
      inFullscreen: "in-fullscreen",
      htmlHasFullscreen: "with-panzoom-in-fullscreen"
    },
    l10n: b
  },
  w = '<circle cx="25" cy="25" r="20"></circle>',
  x = '<div class="f-spinner"><svg viewBox="0 0 50 50">' + w + w + "</svg></div>",
  E = t => t && null !== t && t instanceof Element && "nodeType" in t,
  S = (t, e) => {
    t && s(e).forEach(e => {
      t.classList.remove(e);
    });
  },
  P = (t, e) => {
    t && s(e).forEach(e => {
      t.classList.add(e);
    });
  },
  C = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
  },
  T = 1e5,
  M = 1e4,
  O = "mousemove",
  A = "drag",
  L = "content";
let z = null,
  R = null;
class k extends g {
  get fits() {
    return this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1;
  }
  get isTouchDevice() {
    return null === R && (R = window.matchMedia("(hover: none)").matches), R;
  }
  get isMobile() {
    return null === z && (z = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)), z;
  }
  get panMode() {
    return this.options.panMode !== O || this.isTouchDevice ? A : O;
  }
  get panOnlyZoomed() {
    const t = this.options.panOnlyZoomed;
    return "auto" === t ? this.isTouchDevice : t;
  }
  get isInfinite() {
    return this.option("infinite");
  }
  get angle() {
    return 180 * Math.atan2(this.current.b, this.current.a) / Math.PI || 0;
  }
  get targetAngle() {
    return 180 * Math.atan2(this.target.b, this.target.a) / Math.PI || 0;
  }
  get scale() {
    const {
      a: t,
      b: e
    } = this.current;
    return Math.sqrt(t * t + e * e) || 1;
  }
  get targetScale() {
    const {
      a: t,
      b: e
    } = this.target;
    return Math.sqrt(t * t + e * e) || 1;
  }
  get minScale() {
    return this.option("minScale") || 1;
  }
  get fullScale() {
    const {
      contentRect: t
    } = this;
    return t.fullWidth / t.fitWidth || 1;
  }
  get maxScale() {
    return this.fullScale * (this.option("maxScale") || 1) || 1;
  }
  get coverScale() {
    const {
        containerRect: t,
        contentRect: e
      } = this,
      i = Math.max(t.height / e.fitHeight, t.width / e.fitWidth) || 1;
    return Math.min(this.fullScale, i);
  }
  get isScaling() {
    return Math.abs(this.targetScale - this.scale) > 1e-5 && !this.isResting;
  }
  get isContentLoading() {
    const t = this.content;
    return !!(t && t instanceof HTMLImageElement) && !t.complete;
  }
  get isResting() {
    if (this.isBouncingX || this.isBouncingY) return !1;
    for (const t of v) {
      const e = "e" == t || "f" === t ? 1e-4 : 1e-5;
      if (Math.abs(this.target[t] - this.current[t]) > e) return !1;
    }
    return !(!this.ignoreBounds && !this.checkBounds().inBounds);
  }
  constructor(t, e = {}, i = {}) {
    var s;
    if (super(e), Object.defineProperty(this, "pointerTracker", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "resizeObserver", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "updateTimer", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "clickTimer", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "rAF", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "isTicking", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "ignoreBounds", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "isBouncingX", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "isBouncingY", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "clicks", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    }), Object.defineProperty(this, "trackingPoints", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "pwt", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    }), Object.defineProperty(this, "cwd", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    }), Object.defineProperty(this, "pmme", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "friction", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    }), Object.defineProperty(this, "state", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: m.Init
    }), Object.defineProperty(this, "isDragging", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "container", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "content", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "spinner", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "containerRect", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {
        width: 0,
        height: 0,
        innerWidth: 0,
        innerHeight: 0
      }
    }), Object.defineProperty(this, "contentRect", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        fullWidth: 0,
        fullHeight: 0,
        fitWidth: 0,
        fitHeight: 0,
        width: 0,
        height: 0
      }
    }), Object.defineProperty(this, "dragStart", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        time: 0
      }
    }), Object.defineProperty(this, "dragOffset", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {
        x: 0,
        y: 0,
        time: 0
      }
    }), Object.defineProperty(this, "current", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: Object.assign({}, C)
    }), Object.defineProperty(this, "target", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: Object.assign({}, C)
    }), Object.defineProperty(this, "velocity", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {
        a: 0,
        b: 0,
        c: 0,
        d: 0,
        e: 0,
        f: 0
      }
    }), Object.defineProperty(this, "lockedAxis", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), !t) throw new Error("Container Element Not Found");
    this.container = t, this.initContent(), this.attachPlugins(Object.assign(Object.assign({}, k.Plugins), i)), this.emit("attachPlugins"), this.emit("init");
    const o = this.content;
    if (o.addEventListener("load", this.onLoad), o.addEventListener("error", this.onError), this.isContentLoading) {
      if (this.option("spinner")) {
        t.classList.add(this.cn("isLoading"));
        const e = n(x);
        !t.contains(o) || o.parentElement instanceof HTMLPictureElement ? this.spinner = t.appendChild(e) : this.spinner = (null === (s = o.parentElement) || void 0 === s ? void 0 : s.insertBefore(e, o)) || null;
      }
      this.emit("beforeLoad");
    } else queueMicrotask(() => {
      this.enable();
    });
  }
  initContent() {
    const {
        container: t
      } = this,
      e = this.cn(L);
    let i = this.option(L) || t.querySelector(`.${e}`);
    if (i || (i = t.querySelector("img,picture") || t.firstElementChild, i && P(i, e)), i instanceof HTMLPictureElement && (i = i.querySelector("img")), !i) throw new Error("No content found");
    this.content = i;
  }
  onLoad() {
    const {
      spinner: t,
      container: e,
      state: i
    } = this;
    t && (t.remove(), this.spinner = null), this.option("spinner") && e.classList.remove(this.cn("isLoading")), this.emit("afterLoad"), i === m.Init ? this.enable() : this.updateMetrics();
  }
  onError() {
    this.state !== m.Destroy && (this.spinner && (this.spinner.remove(), this.spinner = null), this.stop(), this.detachEvents(), this.state = m.Error, this.emit("error"));
  }
  getNextScale(t) {
    const {
      fullScale: e,
      targetScale: i,
      coverScale: n,
      maxScale: s,
      minScale: o
    } = this;
    let a = o;
    switch (t) {
      case "toggleMax":
        a = i - o < .5 * (s - o) ? s : o;
        break;
      case "toggleCover":
        a = i - o < .5 * (n - o) ? n : o;
        break;
      case "toggleZoom":
        a = i - o < .5 * (e - o) ? e : o;
        break;
      case "iterateZoom":
        let t = [1, e, s].sort((t, e) => t - e),
          r = t.findIndex(t => t > i + 1e-5);
        a = t[r] || 1;
    }
    return a;
  }
  attachObserver() {
    var t;
    const e = () => {
      const {
        container: t,
        containerRect: e
      } = this;
      return Math.abs(e.width - t.getBoundingClientRect().width) > .1 || Math.abs(e.height - t.getBoundingClientRect().height) > .1;
    };
    this.resizeObserver || void 0 === window.ResizeObserver || (this.resizeObserver = new ResizeObserver(() => {
      this.updateTimer || (e() ? (this.onResize(), this.isMobile && (this.updateTimer = setTimeout(() => {
        e() && this.onResize(), this.updateTimer = null;
      }, 500))) : this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null));
    })), null === (t = this.resizeObserver) || void 0 === t || t.observe(this.container);
  }
  detachObserver() {
    var t;
    null === (t = this.resizeObserver) || void 0 === t || t.disconnect();
  }
  attachEvents() {
    const {
      container: t
    } = this;
    t.addEventListener("click", this.onClick, {
      passive: !1,
      capture: !1
    }), t.addEventListener("wheel", this.onWheel, {
      passive: !1
    }), this.pointerTracker = new l(t, {
      start: this.onPointerDown,
      move: this.onPointerMove,
      end: this.onPointerUp
    }), document.addEventListener(O, this.onMouseMove);
  }
  detachEvents() {
    var t;
    const {
      container: e
    } = this;
    e.removeEventListener("click", this.onClick, {
      passive: !1,
      capture: !1
    }), e.removeEventListener("wheel", this.onWheel, {
      passive: !1
    }), null === (t = this.pointerTracker) || void 0 === t || t.stop(), this.pointerTracker = null, document.removeEventListener(O, this.onMouseMove), document.removeEventListener("keydown", this.onKeydown, !0), this.clickTimer && (clearTimeout(this.clickTimer), this.clickTimer = null), this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null);
  }
  animate() {
    this.setTargetForce();
    const t = this.friction,
      e = this.option("maxVelocity");
    for (const i of v) t ? (this.velocity[i] *= 1 - t, e && !this.isScaling && (this.velocity[i] = Math.max(Math.min(this.velocity[i], e), -1 * e)), this.current[i] += this.velocity[i]) : this.current[i] = this.target[i];
    this.setTransform(), this.setEdgeForce(), !this.isResting || this.isDragging ? this.rAF = requestAnimationFrame(() => this.animate()) : this.stop("current");
  }
  setTargetForce() {
    for (const t of v) "e" === t && this.isBouncingX || "f" === t && this.isBouncingY || (this.velocity[t] = (1 / (1 - this.friction) - 1) * (this.target[t] - this.current[t]));
  }
  checkBounds(t = 0, e = 0) {
    const {
        current: i
      } = this,
      n = i.e + t,
      s = i.f + e,
      o = this.getBounds(),
      {
        x: a,
        y: r
      } = o,
      l = a.min,
      c = a.max,
      h = r.min,
      d = r.max;
    let u = 0,
      p = 0;
    return l !== 1 / 0 && n < l ? u = l - n : c !== 1 / 0 && n > c && (u = c - n), h !== 1 / 0 && s < h ? p = h - s : d !== 1 / 0 && s > d && (p = d - s), Math.abs(u) < 1e-4 && (u = 0), Math.abs(p) < 1e-4 && (p = 0), Object.assign(Object.assign({}, o), {
      xDiff: u,
      yDiff: p,
      inBounds: !u && !p
    });
  }
  clampTargetBounds() {
    const {
        target: t
      } = this,
      {
        x: e,
        y: i
      } = this.getBounds();
    e.min !== 1 / 0 && (t.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (t.e = Math.min(t.e, e.max)), i.min !== 1 / 0 && (t.f = Math.max(t.f, i.min)), i.max !== 1 / 0 && (t.f = Math.min(t.f, i.max));
  }
  calculateContentDim(t = this.current) {
    const {
        content: e,
        contentRect: i
      } = this,
      {
        fitWidth: n,
        fitHeight: s,
        fullWidth: o,
        fullHeight: a
      } = i;
    let r = o,
      l = a;
    if (this.option("zoom") || 0 !== this.angle) {
      const i = !(e instanceof HTMLImageElement) && ("none" === window.getComputedStyle(e).maxWidth || "none" === window.getComputedStyle(e).maxHeight),
        c = i ? o : n,
        h = i ? a : s,
        d = this.getMatrix(t),
        u = new DOMPoint(0, 0).matrixTransform(d),
        p = new DOMPoint(0 + c, 0).matrixTransform(d),
        f = new DOMPoint(0 + c, 0 + h).matrixTransform(d),
        g = new DOMPoint(0, 0 + h).matrixTransform(d),
        m = Math.abs(f.x - u.x),
        v = Math.abs(f.y - u.y),
        b = Math.abs(g.x - p.x),
        y = Math.abs(g.y - p.y);
      r = Math.max(m, b), l = Math.max(v, y);
    }
    return {
      contentWidth: r,
      contentHeight: l
    };
  }
  setEdgeForce() {
    if (this.ignoreBounds || this.isDragging || this.panMode === O || this.targetScale < this.scale) return this.isBouncingX = !1, void (this.isBouncingY = !1);
    const {
        target: t
      } = this,
      {
        x: e,
        y: i,
        xDiff: n,
        yDiff: s
      } = this.checkBounds();
    const o = this.option("maxVelocity");
    let a = this.velocity.e,
      r = this.velocity.f;
    0 !== n ? (this.isBouncingX = !0, n * a <= 0 ? a += .14 * n : (a = .14 * n, e.min !== 1 / 0 && (this.target.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (this.target.e = Math.min(t.e, e.max))), o && (a = Math.max(Math.min(a, o), -1 * o))) : this.isBouncingX = !1, 0 !== s ? (this.isBouncingY = !0, s * r <= 0 ? r += .14 * s : (r = .14 * s, i.min !== 1 / 0 && (this.target.f = Math.max(t.f, i.min)), i.max !== 1 / 0 && (this.target.f = Math.min(t.f, i.max))), o && (r = Math.max(Math.min(r, o), -1 * o))) : this.isBouncingY = !1, this.isBouncingX && (this.velocity.e = a), this.isBouncingY && (this.velocity.f = r);
  }
  enable() {
    const {
        content: t
      } = this,
      e = new DOMMatrixReadOnly(window.getComputedStyle(t).transform);
    for (const t of v) this.current[t] = this.target[t] = e[t];
    this.updateMetrics(), this.attachObserver(), this.attachEvents(), this.state = m.Ready, this.emit("ready");
  }
  onClick(t) {
    var e;
    "click" === t.type && 0 === t.detail && (this.dragOffset.x = 0, this.dragOffset.y = 0), this.isDragging && (null === (e = this.pointerTracker) || void 0 === e || e.clear(), this.trackingPoints = [], this.startDecelAnim());
    const i = t.target;
    if (!i || t.defaultPrevented) return;
    if (i.hasAttribute("disabled")) return t.preventDefault(), void t.stopPropagation();
    if ((() => {
      const t = window.getSelection();
      return t && "Range" === t.type;
    })() && !i.closest("button")) return;
    const n = i.closest("[data-panzoom-action]"),
      s = i.closest("[data-panzoom-change]"),
      o = n || s,
      a = o && E(o) ? o.dataset : null;
    if (a) {
      const e = a.panzoomChange,
        i = a.panzoomAction;
      if ((e || i) && t.preventDefault(), e) {
        let t = {};
        try {
          t = JSON.parse(e);
        } catch (t) {
          console && console.warn("The given data was not valid JSON");
        }
        return void this.applyChange(t);
      }
      if (i) return void (this[i] && this[i]());
    }
    if (Math.abs(this.dragOffset.x) > 3 || Math.abs(this.dragOffset.y) > 3) return t.preventDefault(), void t.stopPropagation();
    if (i.closest("[data-fancybox]")) return;
    const r = this.content.getBoundingClientRect(),
      l = this.dragStart;
    if (l.time && !this.canZoomOut() && (Math.abs(r.x - l.x) > 2 || Math.abs(r.y - l.y) > 2)) return;
    this.dragStart.time = 0;
    const c = e => {
        this.option("zoom", t) && e && "string" == typeof e && /(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(e) && "function" == typeof this[e] && (t.preventDefault(), this[e]({
          event: t
        }));
      },
      h = this.option("click", t),
      d = this.option("dblClick", t);
    d ? (this.clicks++, 1 == this.clicks && (this.clickTimer = setTimeout(() => {
      1 === this.clicks ? (this.emit("click", t), !t.defaultPrevented && h && c(h)) : (this.emit("dblClick", t), t.defaultPrevented || c(d)), this.clicks = 0, this.clickTimer = null;
    }, 350))) : (this.emit("click", t), !t.defaultPrevented && h && c(h));
  }
  addTrackingPoint(t) {
    const e = this.trackingPoints.filter(t => t.time > Date.now() - 100);
    e.push(t), this.trackingPoints = e;
  }
  onPointerDown(t, e, i) {
    var n;
    if (!1 === this.option("touch", t)) return !1;
    this.pwt = 0, this.dragOffset = {
      x: 0,
      y: 0,
      time: 0
    }, this.trackingPoints = [];
    const s = this.content.getBoundingClientRect();
    if (this.dragStart = {
      x: s.x,
      y: s.y,
      top: s.top,
      left: s.left,
      time: Date.now()
    }, this.clickTimer) return !1;
    if (this.panMode === O && this.targetScale > 1) return t.preventDefault(), t.stopPropagation(), !1;
    const o = t.composedPath()[0];
    if (!i.length) {
      if (["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO", "IFRAME"].includes(o.nodeName) || o.closest("[contenteditable],[data-selectable],[data-draggable],[data-clickable],[data-panzoom-change],[data-panzoom-action]")) return !1;
      null === (n = window.getSelection()) || void 0 === n || n.removeAllRanges();
    }
    if ("mousedown" === t.type) ["A", "BUTTON"].includes(o.nodeName) || t.preventDefault();else if (Math.abs(this.velocity.a) > .3) return !1;
    return this.target.e = this.current.e, this.target.f = this.current.f, this.stop(), this.isDragging || (this.isDragging = !0, this.addTrackingPoint(e), this.emit("touchStart", t)), !0;
  }
  onPointerMove(e, n, s) {
    if (!1 === this.option("touch", e)) return;
    if (!this.isDragging) return;
    if (n.length < 2 && this.panOnlyZoomed && t(this.targetScale) <= t(this.minScale)) return;
    if (this.emit("touchMove", e), e.defaultPrevented) return;
    this.addTrackingPoint(n[0]);
    const {
        content: o
      } = this,
      a = h(s[0], s[1]),
      r = h(n[0], n[1]);
    let l = 0,
      d = 0;
    if (n.length > 1) {
      const t = o.getBoundingClientRect();
      l = a.clientX - t.left - .5 * t.width, d = a.clientY - t.top - .5 * t.height;
    }
    const u = c(s[0], s[1]),
      p = c(n[0], n[1]);
    let f = u ? p / u : 1,
      g = r.clientX - a.clientX,
      m = r.clientY - a.clientY;
    this.dragOffset.x += g, this.dragOffset.y += m, this.dragOffset.time = Date.now() - this.dragStart.time;
    let v = t(this.targetScale) === t(this.minScale) && this.option("lockAxis");
    if (v && !this.lockedAxis) if ("xy" === v || "y" === v || "touchmove" === e.type) {
      if (Math.abs(this.dragOffset.x) < 6 && Math.abs(this.dragOffset.y) < 6) return void e.preventDefault();
      const t = Math.abs(180 * Math.atan2(this.dragOffset.y, this.dragOffset.x) / Math.PI);
      this.lockedAxis = t > 45 && t < 135 ? "y" : "x", this.dragOffset.x = 0, this.dragOffset.y = 0, g = 0, m = 0;
    } else this.lockedAxis = v;
    if (i(e.target, this.content) && (v = "x", this.dragOffset.y = 0), v && "xy" !== v && this.lockedAxis !== v && t(this.targetScale) === t(this.minScale)) return;
    e.cancelable && e.preventDefault(), this.container.classList.add(this.cn("isDragging"));
    const b = this.checkBounds(g, m);
    this.option("rubberband") ? ("x" !== this.isInfinite && (b.xDiff > 0 && g < 0 || b.xDiff < 0 && g > 0) && (g *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitWidth * b.xDiff))), "y" !== this.isInfinite && (b.yDiff > 0 && m < 0 || b.yDiff < 0 && m > 0) && (m *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitHeight * b.yDiff)))) : (b.xDiff && (g = 0), b.yDiff && (m = 0));
    const y = this.targetScale,
      w = this.minScale,
      x = this.maxScale;
    y < .5 * w && (f = Math.max(f, w)), y > 1.5 * x && (f = Math.min(f, x)), "y" === this.lockedAxis && t(y) === t(w) && (g = 0), "x" === this.lockedAxis && t(y) === t(w) && (m = 0), this.applyChange({
      originX: l,
      originY: d,
      panX: g,
      panY: m,
      scale: f,
      friction: this.option("dragFriction"),
      ignoreBounds: !0
    });
  }
  onPointerUp(t, e, n) {
    if (n.length) return this.dragOffset.x = 0, this.dragOffset.y = 0, void (this.trackingPoints = []);
    this.container.classList.remove(this.cn("isDragging")), this.isDragging && (this.addTrackingPoint(e), this.panOnlyZoomed && this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1 && (this.trackingPoints = []), i(t.target, this.content) && "y" === this.lockedAxis && (this.trackingPoints = []), this.emit("touchEnd", t), this.isDragging = !1, this.lockedAxis = !1, this.state !== m.Destroy && (t.defaultPrevented || this.startDecelAnim()));
  }
  startDecelAnim() {
    var e;
    const i = this.isScaling;
    this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, this.isBouncingY = !1;
    for (const t of v) this.velocity[t] = 0;
    this.target.e = this.current.e, this.target.f = this.current.f, S(this.container, "is-scaling"), S(this.container, "is-animating"), this.isTicking = !1;
    const {
        trackingPoints: n
      } = this,
      s = n[0],
      o = n[n.length - 1];
    let a = 0,
      r = 0,
      l = 0;
    o && s && (a = o.clientX - s.clientX, r = o.clientY - s.clientY, l = o.time - s.time);
    const c = (null === (e = window.visualViewport) || void 0 === e ? void 0 : e.scale) || 1;
    1 !== c && (a *= c, r *= c);
    let h = 0,
      d = 0,
      u = 0,
      p = 0,
      f = this.option("decelFriction");
    const g = this.targetScale;
    if (l > 0) {
      u = Math.abs(a) > 3 ? a / (l / 30) : 0, p = Math.abs(r) > 3 ? r / (l / 30) : 0;
      const t = this.option("maxVelocity");
      t && (u = Math.max(Math.min(u, t), -1 * t), p = Math.max(Math.min(p, t), -1 * t));
    }
    u && (h = u / (1 / (1 - f) - 1)), p && (d = p / (1 / (1 - f) - 1)), ("y" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "y" === this.lockedAxis && t(g) === this.minScale) && (h = u = 0), ("x" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "x" === this.lockedAxis && t(g) === this.minScale) && (d = p = 0);
    const m = this.dragOffset.x,
      b = this.dragOffset.y,
      y = this.option("dragMinThreshold") || 0;
    Math.abs(m) < y && Math.abs(b) < y && (h = d = 0, u = p = 0), (this.option("zoom") && (g < this.minScale - 1e-5 || g > this.maxScale + 1e-5) || i && !h && !d) && (f = .35), this.applyChange({
      panX: h,
      panY: d,
      friction: f
    }), this.emit("decel", u, p, m, b);
  }
  onWheel(t) {
    var e = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce(function (t, e) {
      return Math.abs(e) > Math.abs(t) ? e : t;
    });
    const i = Math.max(-1, Math.min(1, e));
    if (this.emit("wheel", t, i), this.panMode === O) return;
    if (t.defaultPrevented) return;
    const n = this.option("wheel");
    "pan" === n ? (t.preventDefault(), this.panOnlyZoomed && !this.canZoomOut() || this.applyChange({
      panX: 2 * -t.deltaX,
      panY: 2 * -t.deltaY,
      bounce: !1
    })) : "zoom" === n && !1 !== this.option("zoom") && this.zoomWithWheel(t);
  }
  onMouseMove(t) {
    this.panWithMouse(t);
  }
  onKeydown(t) {
    "Escape" === t.key && this.toggleFS();
  }
  onResize() {
    this.updateMetrics(), this.checkBounds().inBounds || this.requestTick();
  }
  setTransform() {
    this.emit("beforeTransform");
    const {
        current: e,
        target: i,
        content: n,
        contentRect: s
      } = this,
      o = Object.assign({}, C);
    for (const n of v) {
      const s = "e" == n || "f" === n ? M : T;
      o[n] = t(e[n], s), Math.abs(i[n] - e[n]) < ("e" == n || "f" === n ? .51 : .001) && (e[n] = i[n]);
    }
    let {
        a: a,
        b: r,
        c: l,
        d: c,
        e: h,
        f: d
      } = o,
      u = `matrix(${a}, ${r}, ${l}, ${c}, ${h}, ${d})`,
      p = n.parentElement instanceof HTMLPictureElement ? n.parentElement : n;
    if (this.option("transformParent") && (p = p.parentElement || p), p.style.transform === u) return;
    p.style.transform = u;
    const {
      contentWidth: f,
      contentHeight: g
    } = this.calculateContentDim();
    s.width = f, s.height = g, this.emit("afterTransform");
  }
  updateMetrics(e = !1) {
    var i;
    if (!this || this.state === m.Destroy) return;
    if (this.isContentLoading) return;
    const n = Math.max(1, (null === (i = window.visualViewport) || void 0 === i ? void 0 : i.scale) || 1),
      {
        container: s,
        content: o
      } = this,
      a = o instanceof HTMLImageElement,
      r = s.getBoundingClientRect(),
      l = getComputedStyle(this.container);
    let c = r.width * n,
      h = r.height * n;
    const d = parseFloat(l.paddingTop) + parseFloat(l.paddingBottom),
      u = c - (parseFloat(l.paddingLeft) + parseFloat(l.paddingRight)),
      p = h - d;
    this.containerRect = {
      width: c,
      height: h,
      innerWidth: u,
      innerHeight: p
    };
    let f = this.option("width") || "auto",
      g = this.option("height") || "auto";
    "auto" === f && (f = parseFloat(o.dataset.width || "") || (t => {
      let e = 0;
      return e = t instanceof HTMLImageElement ? t.naturalWidth : t instanceof SVGElement ? t.width.baseVal.value : Math.max(t.offsetWidth, t.scrollWidth), e || 0;
    })(o)), "auto" === g && (g = parseFloat(o.dataset.height || "") || (t => {
      let e = 0;
      return e = t instanceof HTMLImageElement ? t.naturalHeight : t instanceof SVGElement ? t.height.baseVal.value : Math.max(t.offsetHeight, t.scrollHeight), e || 0;
    })(o));
    let v = o.parentElement instanceof HTMLPictureElement ? o.parentElement : o;
    this.option("transformParent") && (v = v.parentElement || v);
    const b = v.getAttribute("style") || "";
    v.style.setProperty("transform", "none", "important"), a && (v.style.width = "", v.style.height = ""), v.offsetHeight;
    const y = o.getBoundingClientRect();
    let w = y.width * n,
      x = y.height * n,
      E = 0,
      S = 0;
    a && (Math.abs(f - w) > 1 || Math.abs(g - x) > 1) && ({
      width: w,
      height: x,
      top: E,
      left: S
    } = ((t, e, i, n) => {
      const s = i / n;
      return s > t / e ? (i = t, n = t / s) : (i = e * s, n = e), {
        width: i,
        height: n,
        top: .5 * (e - n),
        left: .5 * (t - i)
      };
    })(w, x, f, g)), this.contentRect = Object.assign(Object.assign({}, this.contentRect), {
      top: y.top - r.top + E,
      bottom: r.bottom - y.bottom + E,
      left: y.left - r.left + S,
      right: r.right - y.right + S,
      fitWidth: w,
      fitHeight: x,
      width: w,
      height: x,
      fullWidth: f,
      fullHeight: g
    }), v.style.cssText = b, a && (v.style.width = `${w}px`, v.style.height = `${x}px`), this.setTransform(), !0 !== e && this.emit("refresh"), this.ignoreBounds || (t(this.targetScale) < t(this.minScale) ? this.zoomTo(this.minScale, {
      friction: 0
    }) : this.targetScale > this.maxScale ? this.zoomTo(this.maxScale, {
      friction: 0
    }) : this.state === m.Init || this.checkBounds().inBounds || this.requestTick()), this.updateControls();
  }
  calculateBounds() {
    const {
        contentWidth: e,
        contentHeight: i
      } = this.calculateContentDim(this.target),
      {
        targetScale: n,
        lockedAxis: s
      } = this,
      {
        fitWidth: o,
        fitHeight: a
      } = this.contentRect;
    let r = 0,
      l = 0,
      c = 0,
      h = 0;
    const d = this.option("infinite");
    if (!0 === d || s && d === s) r = -1 / 0, c = 1 / 0, l = -1 / 0, h = 1 / 0;else {
      let {
          containerRect: s,
          contentRect: d
        } = this,
        u = t(o * n, M),
        p = t(a * n, M),
        {
          innerWidth: f,
          innerHeight: g
        } = s;
      if (s.width === u && (f = s.width), s.width === p && (g = s.height), e > f) {
        c = .5 * (e - f), r = -1 * c;
        let t = .5 * (d.right - d.left);
        r += t, c += t;
      }
      if (o > f && e < f && (r -= .5 * (o - f), c -= .5 * (o - f)), i > g) {
        h = .5 * (i - g), l = -1 * h;
        let t = .5 * (d.bottom - d.top);
        l += t, h += t;
      }
      a > g && i < g && (r -= .5 * (a - g), c -= .5 * (a - g));
    }
    return {
      x: {
        min: r,
        max: c
      },
      y: {
        min: l,
        max: h
      }
    };
  }
  getBounds() {
    const t = this.option("bounds");
    return "auto" !== t ? t : this.calculateBounds();
  }
  updateControls() {
    const e = this,
      i = e.container,
      {
        panMode: n,
        contentRect: s,
        targetScale: a,
        minScale: r
      } = e;
    let l = r,
      c = e.option("click") || !1;
    c && (l = e.getNextScale(c));
    let h = e.canZoomIn(),
      d = e.canZoomOut(),
      u = n === A && !!this.option("touch"),
      p = d && u;
    if (u && (t(a) < t(r) && !this.panOnlyZoomed && (p = !0), (t(s.width, 1) > t(s.fitWidth, 1) || t(s.height, 1) > t(s.fitHeight, 1)) && (p = !0)), t(s.width * a, 1) < t(s.fitWidth, 1) && (p = !1), n === O && (p = !1), o(i, this.cn("isDraggable"), p), !this.option("zoom")) return;
    let f = h && t(l) > t(a),
      g = !f && !p && d && t(l) < t(a);
    o(i, this.cn("canZoomIn"), f), o(i, this.cn("canZoomOut"), g);
    for (const t of i.querySelectorAll("[data-panzoom-action]")) {
      let e = !1,
        i = !1;
      switch (t.dataset.panzoomAction) {
        case "zoomIn":
          h ? e = !0 : i = !0;
          break;
        case "zoomOut":
          d ? e = !0 : i = !0;
          break;
        case "toggleZoom":
        case "iterateZoom":
          h || d ? e = !0 : i = !0;
          const n = t.querySelector("g");
          n && (n.style.display = h ? "" : "none");
      }
      e ? (t.removeAttribute("disabled"), t.removeAttribute("tabindex")) : i && (t.setAttribute("disabled", ""), t.setAttribute("tabindex", "-1"));
    }
  }
  panTo({
    x: t = this.target.e,
    y: e = this.target.f,
    scale: i = this.targetScale,
    friction: n = this.option("friction"),
    angle: s = 0,
    originX: o = 0,
    originY: a = 0,
    flipX: r = !1,
    flipY: l = !1,
    ignoreBounds: c = !1
  }) {
    this.state !== m.Destroy && this.applyChange({
      panX: t - this.target.e,
      panY: e - this.target.f,
      scale: i / this.targetScale,
      angle: s,
      originX: o,
      originY: a,
      friction: n,
      flipX: r,
      flipY: l,
      ignoreBounds: c
    });
  }
  applyChange({
    panX: e = 0,
    panY: i = 0,
    scale: n = 1,
    angle: s = 0,
    originX: o = -this.current.e,
    originY: a = -this.current.f,
    friction: r = this.option("friction"),
    flipX: l = !1,
    flipY: c = !1,
    ignoreBounds: h = !1,
    bounce: d = this.option("bounce")
  }) {
    const u = this.state;
    if (u === m.Destroy) return;
    this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.friction = r || 0, this.ignoreBounds = h;
    const {
        current: p
      } = this,
      f = p.e,
      g = p.f,
      b = this.getMatrix(this.target);
    let y = new DOMMatrix().translate(f, g).translate(o, a).translate(e, i);
    if (this.option("zoom")) {
      if (!h) {
        const t = this.targetScale,
          e = this.minScale,
          i = this.maxScale;
        t * n < e && (n = e / t), t * n > i && (n = i / t);
      }
      y = y.scale(n);
    }
    y = y.translate(-o, -a).translate(-f, -g).multiply(b), s && (y = y.rotate(s)), l && (y = y.scale(-1, 1)), c && (y = y.scale(1, -1));
    for (const e of v) "e" !== e && "f" !== e && (y[e] > this.minScale + 1e-5 || y[e] < this.minScale - 1e-5) ? this.target[e] = y[e] : this.target[e] = t(y[e], M);
    (this.targetScale < this.scale || Math.abs(n - 1) > .1 || this.panMode === O || !1 === d) && !h && this.clampTargetBounds(), u === m.Init ? this.animate() : this.isResting || (this.state = m.Panning, this.requestTick());
  }
  stop(t = !1) {
    if (this.state === m.Init || this.state === m.Destroy) return;
    const e = this.isTicking;
    this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, this.isBouncingY = !1;
    for (const e of v) this.velocity[e] = 0, "current" === t ? this.current[e] = this.target[e] : "target" === t && (this.target[e] = this.current[e]);
    this.setTransform(), S(this.container, "is-scaling"), S(this.container, "is-animating"), this.isTicking = !1, this.state = m.Ready, e && (this.emit("endAnimation"), this.updateControls());
  }
  requestTick() {
    this.isTicking || (this.emit("startAnimation"), this.updateControls(), P(this.container, "is-animating"), this.isScaling && P(this.container, "is-scaling")), this.isTicking = !0, this.rAF || (this.rAF = requestAnimationFrame(() => this.animate()));
  }
  panWithMouse(e, i = this.option("mouseMoveFriction")) {
    if (this.pmme = e, this.panMode !== O || !e) return;
    if (t(this.targetScale) <= t(this.minScale)) return;
    this.emit("mouseMove", e);
    const {
        container: n,
        containerRect: s,
        contentRect: o
      } = this,
      a = s.width,
      r = s.height,
      l = n.getBoundingClientRect(),
      c = (e.clientX || 0) - l.left,
      h = (e.clientY || 0) - l.top;
    let {
      contentWidth: d,
      contentHeight: u
    } = this.calculateContentDim(this.target);
    const p = this.option("mouseMoveFactor");
    p > 1 && (d !== a && (d *= p), u !== r && (u *= p));
    let f = .5 * (d - a) - c / a * 100 / 100 * (d - a);
    f += .5 * (o.right - o.left);
    let g = .5 * (u - r) - h / r * 100 / 100 * (u - r);
    g += .5 * (o.bottom - o.top), this.applyChange({
      panX: f - this.target.e,
      panY: g - this.target.f,
      friction: i
    });
  }
  zoomWithWheel(e) {
    if (this.state === m.Destroy || this.state === m.Init) return;
    const i = Date.now();
    if (i - this.pwt < 45) return void e.preventDefault();
    this.pwt = i;
    var n = [-e.deltaX || 0, -e.deltaY || 0, -e.detail || 0].reduce(function (t, e) {
      return Math.abs(e) > Math.abs(t) ? e : t;
    });
    const s = Math.max(-1, Math.min(1, n)),
      {
        targetScale: o,
        maxScale: a,
        minScale: r
      } = this;
    let l = o * (100 + 45 * s) / 100;
    t(l) < t(r) && t(o) <= t(r) ? (this.cwd += Math.abs(s), l = r) : t(l) > t(a) && t(o) >= t(a) ? (this.cwd += Math.abs(s), l = a) : (this.cwd = 0, l = Math.max(Math.min(l, a), r)), this.cwd > this.option("wheelLimit") || (e.preventDefault(), t(l) !== t(o) && this.zoomTo(l, {
      event: e
    }));
  }
  canZoomIn() {
    return this.option("zoom") && (t(this.contentRect.width, 1) < t(this.contentRect.fitWidth, 1) || t(this.targetScale) < t(this.maxScale));
  }
  canZoomOut() {
    return this.option("zoom") && t(this.targetScale) > t(this.minScale);
  }
  zoomIn(t = 1.25, e) {
    this.zoomTo(this.targetScale * t, e);
  }
  zoomOut(t = .8, e) {
    this.zoomTo(this.targetScale * t, e);
  }
  zoomToFit(t) {
    this.zoomTo("fit", t);
  }
  zoomToCover(t) {
    this.zoomTo("cover", t);
  }
  zoomToFull(t) {
    this.zoomTo("full", t);
  }
  zoomToMax(t) {
    this.zoomTo("max", t);
  }
  toggleZoom(t) {
    this.zoomTo(this.getNextScale("toggleZoom"), t);
  }
  toggleMax(t) {
    this.zoomTo(this.getNextScale("toggleMax"), t);
  }
  toggleCover(t) {
    this.zoomTo(this.getNextScale("toggleCover"), t);
  }
  iterateZoom(t) {
    this.zoomTo("next", t);
  }
  zoomTo(t = 1, {
    friction: e = "auto",
    originX: i = "auto",
    originY: n = "auto",
    event: s
  } = {}) {
    if (this.isContentLoading || this.state === m.Destroy) return;
    const {
      targetScale: o,
      fullScale: a,
      maxScale: r,
      coverScale: l
    } = this;
    if (this.stop(), this.panMode === O && (s = this.pmme || s), s || "auto" === i || "auto" === n) {
      const t = this.content.getBoundingClientRect(),
        e = this.container.getBoundingClientRect(),
        o = s ? s.clientX : e.left + .5 * e.width,
        a = s ? s.clientY : e.top + .5 * e.height;
      i = o - t.left - .5 * t.width, n = a - t.top - .5 * t.height;
    }
    let c = 1;
    "number" == typeof t ? c = t : "full" === t ? c = a : "cover" === t ? c = l : "max" === t ? c = r : "fit" === t ? c = 1 : "next" === t && (c = this.getNextScale("iterateZoom")), c = c / o || 1, e = "auto" === e ? c > 1 ? .15 : .25 : e, this.applyChange({
      scale: c,
      originX: i,
      originY: n,
      friction: e
    }), s && this.panMode === O && this.panWithMouse(s, e);
  }
  rotateCCW() {
    this.applyChange({
      angle: -90
    });
  }
  rotateCW() {
    this.applyChange({
      angle: 90
    });
  }
  flipX() {
    this.applyChange({
      flipX: !0
    });
  }
  flipY() {
    this.applyChange({
      flipY: !0
    });
  }
  fitX() {
    this.stop("target");
    const {
      containerRect: t,
      contentRect: e,
      target: i
    } = this;
    this.applyChange({
      panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
      panY: .5 * t.height - (e.top + .5 * e.fitHeight) - i.f,
      scale: t.width / e.fitWidth / this.targetScale,
      originX: 0,
      originY: 0,
      ignoreBounds: !0
    });
  }
  fitY() {
    this.stop("target");
    const {
      containerRect: t,
      contentRect: e,
      target: i
    } = this;
    this.applyChange({
      panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
      panY: .5 * t.innerHeight - (e.top + .5 * e.fitHeight) - i.f,
      scale: t.height / e.fitHeight / this.targetScale,
      originX: 0,
      originY: 0,
      ignoreBounds: !0
    });
  }
  toggleFS() {
    const {
        container: t
      } = this,
      e = this.cn("inFullscreen"),
      i = this.cn("htmlHasFullscreen");
    t.classList.toggle(e);
    const n = t.classList.contains(e);
    n ? (document.documentElement.classList.add(i), document.addEventListener("keydown", this.onKeydown, !0)) : (document.documentElement.classList.remove(i), document.removeEventListener("keydown", this.onKeydown, !0)), this.updateMetrics(), this.emit(n ? "enterFS" : "exitFS");
  }
  getMatrix(t = this.current) {
    const {
      a: e,
      b: i,
      c: n,
      d: s,
      e: o,
      f: a
    } = t;
    return new DOMMatrix([e, i, n, s, o, a]);
  }
  reset(t) {
    if (this.state !== m.Init && this.state !== m.Destroy) {
      this.stop("current");
      for (const t of v) this.target[t] = C[t];
      this.target.a = this.minScale, this.target.d = this.minScale, this.clampTargetBounds(), this.isResting || (this.friction = void 0 === t ? this.option("friction") : t, this.state = m.Panning, this.requestTick());
    }
  }
  destroy() {
    this.stop(), this.state = m.Destroy, this.detachEvents(), this.detachObserver();
    const {
        container: t,
        content: e
      } = this,
      i = this.option("classes") || {};
    for (const e of Object.values(i)) t.classList.remove(e + "");
    e && (e.removeEventListener("load", this.onLoad), e.removeEventListener("error", this.onError)), this.detachPlugins();
  }
}
Object.defineProperty(k, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: y
}), Object.defineProperty(k, "Plugins", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {}
});
const I = function (t, e) {
    let i = !0;
    return (...n) => {
      i && (i = !1, t(...n), setTimeout(() => {
        i = !0;
      }, e));
    };
  },
  D = (t, e) => {
    let i = [];
    return t.childNodes.forEach(t => {
      t.nodeType !== Node.ELEMENT_NODE || e && !t.matches(e) || i.push(t);
    }), i;
  },
  F = {
    viewport: null,
    track: null,
    enabled: !0,
    slides: [],
    axis: "x",
    transition: "fade",
    preload: 1,
    slidesPerPage: "auto",
    initialPage: 0,
    friction: .12,
    Panzoom: {
      decelFriction: .12
    },
    center: !0,
    infinite: !0,
    fill: !0,
    dragFree: !1,
    adaptiveHeight: !1,
    direction: "ltr",
    classes: {
      container: "f-carousel",
      viewport: "f-carousel__viewport",
      track: "f-carousel__track",
      slide: "f-carousel__slide",
      isLTR: "is-ltr",
      isRTL: "is-rtl",
      isHorizontal: "is-horizontal",
      isVertical: "is-vertical",
      inTransition: "in-transition",
      isSelected: "is-selected"
    },
    l10n: {
      NEXT: "Next slide",
      PREV: "Previous slide",
      GOTO: "Go to slide #%d"
    }
  };
var j;
!function (t) {
  t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Destroy = 2] = "Destroy";
}(j || (j = {}));
const B = t => {
    if ("string" == typeof t || t instanceof HTMLElement) t = {
      html: t
    };else {
      const e = t.thumb;
      void 0 !== e && ("string" == typeof e && (t.thumbSrc = e), e instanceof HTMLImageElement && (t.thumbEl = e, t.thumbElSrc = e.src, t.thumbSrc = e.src), delete t.thumb);
    }
    return Object.assign({
      html: "",
      el: null,
      isDom: !1,
      class: "",
      customClass: "",
      index: -1,
      dim: 0,
      gap: 0,
      pos: 0,
      transition: !1
    }, t);
  },
  H = (t = {}) => Object.assign({
    index: -1,
    slides: [],
    dim: 0,
    pos: -1
  }, t);
class N extends f {
  constructor(t, e) {
    super(e), Object.defineProperty(this, "instance", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: t
    });
  }
  attach() {}
  detach() {}
}
const _ = {
  classes: {
    list: "f-carousel__dots",
    isDynamic: "is-dynamic",
    hasDots: "has-dots",
    dot: "f-carousel__dot",
    isBeforePrev: "is-before-prev",
    isPrev: "is-prev",
    isCurrent: "is-current",
    isNext: "is-next",
    isAfterNext: "is-after-next"
  },
  dotTpl: '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',
  dynamicFrom: 11,
  maxCount: 1 / 0,
  minCount: 2
};
class $ extends N {
  constructor() {
    super(...arguments), Object.defineProperty(this, "isDynamic", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "list", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    });
  }
  onRefresh() {
    this.refresh();
  }
  build() {
    let t = this.list;
    if (!t) {
      t = document.createElement("ul"), P(t, this.cn("list")), t.setAttribute("role", "tablist");
      const e = this.instance.container;
      e.appendChild(t), P(e, this.cn("hasDots")), this.list = t;
    }
    return t;
  }
  refresh() {
    var t;
    const e = this.instance.pages.length,
      i = Math.min(2, this.option("minCount")),
      n = Math.max(2e3, this.option("maxCount")),
      s = this.option("dynamicFrom");
    if (e < i || e > n) return void this.cleanup();
    const a = "number" == typeof s && e > 5 && e >= s,
      r = !this.list || this.isDynamic !== a || this.list.children.length !== e;
    r && this.cleanup();
    const l = this.build();
    if (o(l, this.cn("isDynamic"), !!a), r) for (let t = 0; t < e; t++) l.append(this.createItem(t));
    let c,
      h = 0;
    for (const e of [...l.children]) {
      const i = h === this.instance.page;
      i && (c = e), o(e, this.cn("isCurrent"), i), null === (t = e.children[0]) || void 0 === t || t.setAttribute("aria-selected", i ? "true" : "false");
      for (const t of ["isBeforePrev", "isPrev", "isNext", "isAfterNext"]) S(e, this.cn(t));
      h++;
    }
    if (c = c || l.firstChild, a && c) {
      const t = c.previousElementSibling,
        e = t && t.previousElementSibling;
      P(t, this.cn("isPrev")), P(e, this.cn("isBeforePrev"));
      const i = c.nextElementSibling,
        n = i && i.nextElementSibling;
      P(i, this.cn("isNext")), P(n, this.cn("isAfterNext"));
    }
    this.isDynamic = a;
  }
  createItem(t = 0) {
    var e;
    const i = document.createElement("li");
    i.setAttribute("role", "presentation");
    const s = n(this.instance.localize(this.option("dotTpl"), [["%d", t + 1]]).replace(/\%i/g, t + ""));
    return i.appendChild(s), null === (e = i.children[0]) || void 0 === e || e.setAttribute("role", "tab"), i;
  }
  cleanup() {
    this.list && (this.list.remove(), this.list = null), this.isDynamic = !1, S(this.instance.container, this.cn("hasDots"));
  }
  attach() {
    this.instance.on(["refresh", "change"], this.onRefresh);
  }
  detach() {
    this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup();
  }
}
Object.defineProperty($, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: _
});
const W = "disabled",
  X = "next",
  q = "prev";
class Y extends N {
  constructor() {
    super(...arguments), Object.defineProperty(this, "container", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "prev", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "next", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "isDom", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    });
  }
  onRefresh() {
    const t = this.instance,
      e = t.pages.length,
      i = t.page;
    if (e < 2) return void this.cleanup();
    this.build();
    let n = this.prev,
      s = this.next;
    n && s && (n.removeAttribute(W), s.removeAttribute(W), t.isInfinite || (i <= 0 && n.setAttribute(W, ""), i >= e - 1 && s.setAttribute(W, "")));
  }
  addBtn(t) {
    var e;
    const i = this.instance,
      n = document.createElement("button");
    n.setAttribute("tabindex", "0"), n.setAttribute("title", i.localize(`{{${t.toUpperCase()}}}`)), P(n, this.cn("button") + " " + this.cn(t === X ? "isNext" : "isPrev"));
    const s = i.isRTL ? t === X ? q : X : t;
    var o;
    return n.innerHTML = i.localize(this.option(`${s}Tpl`)), n.dataset[`carousel${(o = t, o ? o.match("^[a-z]") ? o.charAt(0).toUpperCase() + o.substring(1) : o : "")}`] = "true", null === (e = this.container) || void 0 === e || e.appendChild(n), n;
  }
  build() {
    const t = this.instance.container,
      e = this.cn("container");
    let {
      container: i,
      prev: n,
      next: s
    } = this;
    i || (i = t.querySelector("." + e), this.isDom = !!i), i || (i = document.createElement("div"), P(i, e), t.appendChild(i)), this.container = i, s || (s = i.querySelector("[data-carousel-next]")), s || (s = this.addBtn(X)), this.next = s, n || (n = i.querySelector("[data-carousel-prev]")), n || (n = this.addBtn(q)), this.prev = n;
  }
  cleanup() {
    this.isDom || (this.prev && this.prev.remove(), this.next && this.next.remove(), this.container && this.container.remove()), this.prev = null, this.next = null, this.container = null, this.isDom = !1;
  }
  attach() {
    this.instance.on(["refresh", "change"], this.onRefresh);
  }
  detach() {
    this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup();
  }
}
Object.defineProperty(Y, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {
    classes: {
      container: "f-carousel__nav",
      button: "f-button",
      isNext: "is-next",
      isPrev: "is-prev"
    },
    nextTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
    prevTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>'
  }
});
class V extends N {
  constructor() {
    super(...arguments), Object.defineProperty(this, "selectedIndex", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "target", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "nav", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    });
  }
  addAsTargetFor(t) {
    this.target = this.instance, this.nav = t, this.attachEvents();
  }
  addAsNavFor(t) {
    this.nav = this.instance, this.target = t, this.attachEvents();
  }
  attachEvents() {
    const {
      nav: t,
      target: e
    } = this;
    t && e && (t.options.initialSlide = e.options.initialPage, t.state === j.Ready ? this.onNavReady(t) : t.on("ready", this.onNavReady), e.state === j.Ready ? this.onTargetReady(e) : e.on("ready", this.onTargetReady));
  }
  onNavReady(t) {
    t.on("createSlide", this.onNavCreateSlide), t.on("Panzoom.click", this.onNavClick), t.on("Panzoom.touchEnd", this.onNavTouch), this.onTargetChange();
  }
  onTargetReady(t) {
    t.on("change", this.onTargetChange), t.on("Panzoom.refresh", this.onTargetChange), this.onTargetChange();
  }
  onNavClick(t, e, i) {
    this.onNavTouch(t, t.panzoom, i);
  }
  onNavTouch(t, e, i) {
    var n, s;
    if (Math.abs(e.dragOffset.x) > 3 || Math.abs(e.dragOffset.y) > 3) return;
    const o = i.target,
      {
        nav: a,
        target: r
      } = this;
    if (!a || !r || !o) return;
    const l = o.closest("[data-index]");
    if (i.stopPropagation(), i.preventDefault(), !l) return;
    const c = parseInt(l.dataset.index || "", 10) || 0,
      h = r.getPageForSlide(c),
      d = a.getPageForSlide(c);
    a.slideTo(d), r.slideTo(h, {
      friction: (null === (s = null === (n = this.nav) || void 0 === n ? void 0 : n.plugins) || void 0 === s ? void 0 : s.Sync.option("friction")) || 0
    }), this.markSelectedSlide(c);
  }
  onNavCreateSlide(t, e) {
    e.index === this.selectedIndex && this.markSelectedSlide(e.index);
  }
  onTargetChange() {
    var t, e;
    const {
      target: i,
      nav: n
    } = this;
    if (!i || !n) return;
    if (n.state !== j.Ready || i.state !== j.Ready) return;
    const s = null === (e = null === (t = i.pages[i.page]) || void 0 === t ? void 0 : t.slides[0]) || void 0 === e ? void 0 : e.index,
      o = n.getPageForSlide(s);
    this.markSelectedSlide(s), n.slideTo(o, null === n.prevPage && null === i.prevPage ? {
      friction: 0
    } : void 0);
  }
  markSelectedSlide(t) {
    const e = this.nav;
    e && e.state === j.Ready && (this.selectedIndex = t, [...e.slides].map(e => {
      e.el && e.el.classList[e.index === t ? "add" : "remove"]("is-nav-selected");
    }));
  }
  attach() {
    const t = this;
    let e = t.options.target,
      i = t.options.nav;
    e ? t.addAsNavFor(e) : i && t.addAsTargetFor(i);
  }
  detach() {
    const t = this,
      e = t.nav,
      i = t.target;
    e && (e.off("ready", t.onNavReady), e.off("createSlide", t.onNavCreateSlide), e.off("Panzoom.click", t.onNavClick), e.off("Panzoom.touchEnd", t.onNavTouch)), t.nav = null, i && (i.off("ready", t.onTargetReady), i.off("refresh", t.onTargetChange), i.off("change", t.onTargetChange)), t.target = null;
  }
}
Object.defineProperty(V, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {
    friction: .35
  }
});
const Z = {
    Navigation: Y,
    Dots: $,
    Sync: V
  },
  U = "animationend",
  G = "isSelected",
  K = "slide";
class J extends g {
  get axis() {
    return this.isHorizontal ? "e" : "f";
  }
  get isEnabled() {
    return this.state === j.Ready;
  }
  get isInfinite() {
    let t = !1;
    const {
        contentDim: e,
        viewportDim: i,
        pages: n,
        slides: s
      } = this,
      o = s[0];
    return n.length >= 2 && o && e + o.dim >= i && (t = this.option("infinite")), t;
  }
  get isRTL() {
    return "rtl" === this.option("direction");
  }
  get isHorizontal() {
    return "x" === this.option("axis");
  }
  constructor(t, e = {}, i = {}) {
    if (super(), Object.defineProperty(this, "bp", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: ""
    }), Object.defineProperty(this, "lp", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    }), Object.defineProperty(this, "userOptions", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {}
    }), Object.defineProperty(this, "userPlugins", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {}
    }), Object.defineProperty(this, "state", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: j.Init
    }), Object.defineProperty(this, "page", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    }), Object.defineProperty(this, "prevPage", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "container", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, "viewport", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "track", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "slides", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "pages", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "panzoom", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "inTransition", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: new Set()
    }), Object.defineProperty(this, "contentDim", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    }), Object.defineProperty(this, "viewportDim", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    }), "string" == typeof t && (t = document.querySelector(t)), !t || !E(t)) throw new Error("No Element found");
    this.container = t, this.slideNext = I(this.slideNext.bind(this), 150), this.slidePrev = I(this.slidePrev.bind(this), 150), this.userOptions = e, this.userPlugins = i, queueMicrotask(() => {
      this.processOptions();
    });
  }
  processOptions() {
    var t, e;
    const i = u({}, J.defaults, this.userOptions);
    let n = "";
    const s = i.breakpoints;
    if (s && d(s)) for (const [t, e] of Object.entries(s)) window.matchMedia(t).matches && d(e) && (n += t, u(i, e));
    n === this.bp && this.state !== j.Init || (this.bp = n, this.state === j.Ready && (i.initialSlide = (null === (e = null === (t = this.pages[this.page]) || void 0 === t ? void 0 : t.slides[0]) || void 0 === e ? void 0 : e.index) || 0), this.state !== j.Init && this.destroy(), super.setOptions(i), !1 === this.option("enabled") ? this.attachEvents() : setTimeout(() => {
      this.init();
    }, 0));
  }
  init() {
    this.state = j.Init, this.emit("init"), this.attachPlugins(Object.assign(Object.assign({}, J.Plugins), this.userPlugins)), this.emit("attachPlugins"), this.initLayout(), this.initSlides(), this.updateMetrics(), this.setInitialPosition(), this.initPanzoom(), this.attachEvents(), this.state = j.Ready, this.emit("ready");
  }
  initLayout() {
    const {
        container: t
      } = this,
      e = this.option("classes");
    P(t, this.cn("container")), o(t, e.isLTR, !this.isRTL), o(t, e.isRTL, this.isRTL), o(t, e.isVertical, !this.isHorizontal), o(t, e.isHorizontal, this.isHorizontal);
    let i = this.option("viewport") || t.querySelector(`.${e.viewport}`);
    i || (i = document.createElement("div"), P(i, e.viewport), i.append(...D(t, `.${e.slide}`)), t.prepend(i)), i.addEventListener("scroll", this.onScroll);
    let n = this.option("track") || t.querySelector(`.${e.track}`);
    n || (n = document.createElement("div"), P(n, e.track), n.append(...Array.from(i.childNodes))), n.setAttribute("aria-live", "polite"), i.contains(n) || i.prepend(n), this.viewport = i, this.track = n, this.emit("initLayout");
  }
  initSlides() {
    const {
      track: t
    } = this;
    if (!t) return;
    const e = [...this.slides],
      i = [];
    [...D(t, `.${this.cn(K)}`)].forEach(t => {
      if (E(t)) {
        const e = B({
          el: t,
          isDom: !0,
          index: this.slides.length
        });
        i.push(e);
      }
    });
    for (let t of [...(this.option("slides", []) || []), ...e]) i.push(B(t));
    this.slides = i;
    for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
    for (const t of i) this.emit("beforeInitSlide", t, t.index), this.emit("initSlide", t, t.index);
    this.emit("initSlides");
  }
  setInitialPage() {
    const t = this.option("initialSlide");
    this.page = "number" == typeof t ? this.getPageForSlide(t) : parseInt(this.option("initialPage", 0) + "", 10) || 0;
  }
  setInitialPosition() {
    const {
      track: t,
      pages: e,
      isHorizontal: i
    } = this;
    if (!t || !e.length) return;
    let n = this.page;
    e[n] || (this.page = n = 0);
    const s = (e[n].pos || 0) * (this.isRTL && i ? 1 : -1),
      o = i ? `${s}px` : "0",
      a = i ? "0" : `${s}px`;
    t.style.transform = `translate3d(${o}, ${a}, 0) scale(1)`, this.option("adaptiveHeight") && this.setViewportHeight();
  }
  initPanzoom() {
    this.panzoom && (this.panzoom.destroy(), this.panzoom = null);
    const t = this.option("Panzoom") || {};
    this.panzoom = new k(this.viewport, u({}, {
      content: this.track,
      zoom: !1,
      panOnlyZoomed: !1,
      lockAxis: this.isHorizontal ? "x" : "y",
      infinite: this.isInfinite,
      click: !1,
      dblClick: !1,
      touch: t => !(this.pages.length < 2 && !t.options.infinite),
      bounds: () => this.getBounds(),
      maxVelocity: t => Math.abs(t.target[this.axis] - t.current[this.axis]) < 2 * this.viewportDim ? 100 : 0
    }, t)), this.panzoom.on("*", (t, e, ...i) => {
      this.emit(`Panzoom.${e}`, t, ...i);
    }), this.panzoom.on("decel", this.onDecel), this.panzoom.on("refresh", this.onRefresh), this.panzoom.on("beforeTransform", this.onBeforeTransform), this.panzoom.on("endAnimation", this.onEndAnimation);
  }
  attachEvents() {
    const t = this.container;
    t && (t.addEventListener("click", this.onClick, {
      passive: !1,
      capture: !1
    }), t.addEventListener("slideTo", this.onSlideTo)), window.addEventListener("resize", this.onResize);
  }
  createPages() {
    let t = [];
    const {
      contentDim: e,
      viewportDim: i
    } = this;
    let n = this.option("slidesPerPage");
    n = ("auto" === n || e <= i) && !1 !== this.option("fill") ? 1 / 0 : parseFloat(n + "");
    let s = 0,
      o = 0,
      a = 0;
    for (const e of this.slides) (!t.length || o + e.dim - i > .05 || a >= n) && (t.push(H()), s = t.length - 1, o = 0, a = 0), t[s].slides.push(e), o += e.dim + e.gap, a++;
    return t;
  }
  processPages() {
    const e = this.pages,
      {
        contentDim: i,
        viewportDim: n,
        isInfinite: s
      } = this,
      o = this.option("center"),
      a = this.option("fill"),
      r = a && o && i > n && !s;
    if (e.forEach((t, e) => {
      var s;
      t.index = e, t.pos = (null === (s = t.slides[0]) || void 0 === s ? void 0 : s.pos) || 0, t.dim = 0;
      for (const [e, i] of t.slides.entries()) t.dim += i.dim, e < t.slides.length - 1 && (t.dim += i.gap);
      r && t.pos + .5 * t.dim < .5 * n ? t.pos = 0 : r && t.pos + .5 * t.dim >= i - .5 * n ? t.pos = i - n : o && (t.pos += -.5 * (n - t.dim));
    }), e.forEach(e => {
      a && !s && i > n && (e.pos = Math.max(e.pos, 0), e.pos = Math.min(e.pos, i - n)), e.pos = t(e.pos, 1e3), e.dim = t(e.dim, 1e3), Math.abs(e.pos) <= .1 && (e.pos = 0);
    }), s) return e;
    const l = [];
    let c;
    return e.forEach(t => {
      const e = Object.assign({}, t);
      c && e.pos === c.pos ? (c.dim += e.dim, c.slides = [...c.slides, ...e.slides]) : (e.index = l.length, c = e, l.push(e));
    }), l;
  }
  getPageFromIndex(t = 0) {
    const e = this.pages.length;
    let i;
    return t = parseInt((t || 0).toString()) || 0, i = this.isInfinite ? (t % e + e) % e : Math.max(Math.min(t, e - 1), 0), i;
  }
  getSlideMetrics(e) {
    var i, n;
    const s = this.isHorizontal ? "width" : "height";
    let o = 0,
      a = 0,
      r = e.el;
    const l = !(!r || r.parentNode);
    if (r ? o = parseFloat(r.dataset[s] || "") || 0 : (r = document.createElement("div"), r.style.visibility = "hidden", (this.track || document.body).prepend(r)), P(r, this.cn(K) + " " + e.class + " " + e.customClass), o) r.style[s] = `${o}px`, r.style["width" === s ? "height" : "width"] = "";else {
      l && (this.track || document.body).prepend(r), o = r.getBoundingClientRect()[s] * Math.max(1, (null === (i = window.visualViewport) || void 0 === i ? void 0 : i.scale) || 1);
      let t = r[this.isHorizontal ? "offsetWidth" : "offsetHeight"];
      t - 1 > o && (o = t);
    }
    const c = getComputedStyle(r);
    return "content-box" === c.boxSizing && (this.isHorizontal ? (o += parseFloat(c.paddingLeft) || 0, o += parseFloat(c.paddingRight) || 0) : (o += parseFloat(c.paddingTop) || 0, o += parseFloat(c.paddingBottom) || 0)), a = parseFloat(c[this.isHorizontal ? "marginRight" : "marginBottom"]) || 0, l ? null === (n = r.parentElement) || void 0 === n || n.removeChild(r) : e.el || r.remove(), {
      dim: t(o, 1e3),
      gap: t(a, 1e3)
    };
  }
  getBounds() {
    const {
      isInfinite: t,
      isRTL: e,
      isHorizontal: i,
      pages: n
    } = this;
    let s = {
      min: 0,
      max: 0
    };
    if (t) s = {
      min: -1 / 0,
      max: 1 / 0
    };else if (n.length) {
      const t = n[0].pos,
        o = n[n.length - 1].pos;
      s = e && i ? {
        min: t,
        max: o
      } : {
        min: -1 * o,
        max: -1 * t
      };
    }
    return {
      x: i ? s : {
        min: 0,
        max: 0
      },
      y: i ? {
        min: 0,
        max: 0
      } : s
    };
  }
  repositionSlides() {
    let e,
      {
        isHorizontal: i,
        isRTL: n,
        isInfinite: s,
        viewport: o,
        viewportDim: a,
        contentDim: r,
        page: l,
        pages: c,
        slides: h,
        panzoom: d
      } = this,
      u = 0,
      p = 0,
      f = 0,
      g = 0;
    d ? g = -1 * d.current[this.axis] : c[l] && (g = c[l].pos || 0), e = i ? n ? "right" : "left" : "top", n && i && (g *= -1);
    for (const i of h) {
      const n = i.el;
      n ? ("top" === e ? (n.style.right = "", n.style.left = "") : n.style.top = "", i.index !== u ? n.style[e] = 0 === p ? "" : `${t(p, 1e3)}px` : n.style[e] = "", f += i.dim + i.gap, u++) : p += i.dim + i.gap;
    }
    if (s && f && o) {
      let n = getComputedStyle(o),
        s = "padding",
        l = i ? "Right" : "Bottom",
        c = parseFloat(n[s + (i ? "Left" : "Top")]);
      g -= c, a += c, a += parseFloat(n[s + l]);
      for (const i of h) i.el && (t(i.pos) < t(a) && t(i.pos + i.dim + i.gap) < t(g) && t(g) > t(r - a) && (i.el.style[e] = `${t(p + f, 1e3)}px`), t(i.pos + i.gap) >= t(r - a) && t(i.pos) > t(g + a) && t(g) < t(a) && (i.el.style[e] = `-${t(f, 1e3)}px`));
    }
    let m,
      v,
      b = [...this.inTransition];
    if (b.length > 1 && (m = c[b[0]], v = c[b[1]]), m && v) {
      let i = 0;
      for (const n of h) n.el ? this.inTransition.has(n.index) && m.slides.indexOf(n) < 0 && (n.el.style[e] = `${t(i + (m.pos - v.pos), 1e3)}px`) : i += n.dim + n.gap;
    }
  }
  createSlideEl(t) {
    const {
      track: e,
      slides: i
    } = this;
    if (!e || !t) return;
    if (t.el && t.el.parentNode) return;
    const n = t.el || document.createElement("div");
    P(n, this.cn(K)), P(n, t.class), P(n, t.customClass);
    const s = t.html;
    s && (s instanceof HTMLElement ? n.appendChild(s) : n.innerHTML = t.html + "");
    const o = [];
    i.forEach((t, e) => {
      t.el && o.push(e);
    });
    const a = t.index;
    let r = null;
    if (o.length) {
      r = i[o.reduce((t, e) => Math.abs(e - a) < Math.abs(t - a) ? e : t)];
    }
    const l = r && r.el && r.el.parentNode ? r.index < t.index ? r.el.nextSibling : r.el : null;
    e.insertBefore(n, e.contains(l) ? l : null), t.el = n, this.emit("createSlide", t);
  }
  removeSlideEl(t, e = !1) {
    const i = null == t ? void 0 : t.el;
    if (!i || !i.parentNode) return;
    const n = this.cn(G);
    if (i.classList.contains(n) && (S(i, n), this.emit("unselectSlide", t)), t.isDom && !e) return i.removeAttribute("aria-hidden"), i.removeAttribute("data-index"), void (i.style.left = "");
    this.emit("removeSlide", t);
    const s = new CustomEvent(U);
    i.dispatchEvent(s), t.el && (t.el.remove(), t.el = null);
  }
  transitionTo(t = 0, e = this.option("transition")) {
    var i, n, s, o;
    if (!e) return !1;
    const a = this.page,
      {
        pages: r,
        panzoom: l
      } = this;
    t = parseInt((t || 0).toString()) || 0;
    const c = this.getPageFromIndex(t);
    if (!l || !r[c] || r.length < 2 || Math.abs(((null === (n = null === (i = r[a]) || void 0 === i ? void 0 : i.slides[0]) || void 0 === n ? void 0 : n.dim) || 0) - this.viewportDim) > 1) return !1;
    const h = t > a ? 1 : -1,
      d = r[c].pos * (this.isRTL ? 1 : -1);
    if (a === c && Math.abs(d - l.target[this.axis]) < 1) return !1;
    this.clearTransitions();
    const u = l.isResting;
    P(this.container, this.cn("inTransition"));
    const p = (null === (s = r[a]) || void 0 === s ? void 0 : s.slides[0]) || null,
      f = (null === (o = r[c]) || void 0 === o ? void 0 : o.slides[0]) || null;
    this.inTransition.add(f.index), this.createSlideEl(f);
    let g = p.el,
      m = f.el;
    u || e === K || (e = "fadeFast", g = null);
    const v = this.isRTL ? "next" : "prev",
      b = this.isRTL ? "prev" : "next";
    return g && (this.inTransition.add(p.index), p.transition = e, g.addEventListener(U, this.onAnimationEnd), g.classList.add(`f-${e}Out`, `to-${h > 0 ? b : v}`)), m && (f.transition = e, m.addEventListener(U, this.onAnimationEnd), m.classList.add(`f-${e}In`, `from-${h > 0 ? v : b}`)), l.current[this.axis] = d, l.target[this.axis] = d, l.requestTick(), this.onChange(c), !0;
  }
  manageSlideVisiblity() {
    const t = new Set(),
      e = new Set(),
      i = this.getVisibleSlides(parseFloat(this.option("preload", 0) + "") || 0);
    for (const n of this.slides) i.has(n) ? t.add(n) : e.add(n);
    for (const e of this.inTransition) t.add(this.slides[e]);
    for (const e of t) this.createSlideEl(e), this.lazyLoadSlide(e);
    for (const i of e) t.has(i) || this.removeSlideEl(i);
    this.markSelectedSlides(), this.repositionSlides();
  }
  markSelectedSlides() {
    if (!this.pages[this.page] || !this.pages[this.page].slides) return;
    const t = "aria-hidden";
    let e = this.cn(G);
    if (e) for (const i of this.slides) {
      const n = i.el;
      n && (n.dataset.index = `${i.index}`, n.classList.contains("f-thumbs__slide") ? this.getVisibleSlides(0).has(i) ? n.removeAttribute(t) : n.setAttribute(t, "true") : this.pages[this.page].slides.includes(i) ? (n.classList.contains(e) || (P(n, e), this.emit("selectSlide", i)), n.removeAttribute(t)) : (n.classList.contains(e) && (S(n, e), this.emit("unselectSlide", i)), n.setAttribute(t, "true")));
    }
  }
  flipInfiniteTrack() {
    const {
        axis: t,
        isHorizontal: e,
        isInfinite: i,
        isRTL: n,
        viewportDim: s,
        contentDim: o
      } = this,
      a = this.panzoom;
    if (!a || !i) return;
    let r = a.current[t],
      l = a.target[t] - r,
      c = 0,
      h = .5 * s;
    n && e ? (r < -h && (c = -1, r += o), r > o - h && (c = 1, r -= o)) : (r > h && (c = 1, r -= o), r < -o + h && (c = -1, r += o)), c && (a.current[t] = r, a.target[t] = r + l);
  }
  lazyLoadImg(t, e) {
    const i = this,
      s = "f-fadeIn",
      o = "is-preloading";
    let a = !1,
      r = null;
    const l = () => {
      a || (a = !0, r && (r.remove(), r = null), S(e, o), e.complete && (P(e, s), setTimeout(() => {
        S(e, s);
      }, 350)), this.option("adaptiveHeight") && t.el && this.pages[this.page].slides.indexOf(t) > -1 && (i.updateMetrics(), i.setViewportHeight()), this.emit("load", t));
    };
    P(e, o), e.src = e.dataset.lazySrcset || e.dataset.lazySrc || "", delete e.dataset.lazySrc, delete e.dataset.lazySrcset, e.addEventListener("error", () => {
      l();
    }), e.addEventListener("load", () => {
      l();
    }), setTimeout(() => {
      const i = e.parentNode;
      i && t.el && (e.complete ? l() : a || (r = n(x), i.insertBefore(r, e)));
    }, 300);
  }
  lazyLoadSlide(t) {
    const e = t && t.el;
    if (!e) return;
    const i = new Set();
    let n = Array.from(e.querySelectorAll("[data-lazy-src],[data-lazy-srcset]"));
    e.dataset.lazySrc && n.push(e), n.map(t => {
      t instanceof HTMLImageElement ? i.add(t) : t instanceof HTMLElement && t.dataset.lazySrc && (t.style.backgroundImage = `url('${t.dataset.lazySrc}')`, delete t.dataset.lazySrc);
    });
    for (const e of i) this.lazyLoadImg(t, e);
  }
  onAnimationEnd(t) {
    var e;
    const i = t.target,
      n = i ? parseInt(i.dataset.index || "", 10) || 0 : -1,
      s = this.slides[n],
      o = t.animationName;
    if (!i || !s || !o) return;
    const a = !!this.inTransition.has(n) && s.transition;
    a && o.substring(0, a.length + 2) === `f-${a}` && this.inTransition.delete(n), this.inTransition.size || this.clearTransitions(), n === this.page && (null === (e = this.panzoom) || void 0 === e ? void 0 : e.isResting) && this.emit("settle");
  }
  onDecel(t, e = 0, i = 0, n = 0, s = 0) {
    if (this.option("dragFree")) return void this.setPageFromPosition();
    const {
        isRTL: o,
        isHorizontal: a,
        axis: r,
        pages: l
      } = this,
      c = l.length,
      h = Math.abs(Math.atan2(i, e) / (Math.PI / 180));
    let d = 0;
    if (d = h > 45 && h < 135 ? a ? 0 : i : a ? e : 0, !c) return;
    let u = this.page,
      p = o && a ? 1 : -1;
    const f = t.current[r] * p;
    let {
      pageIndex: g
    } = this.getPageFromPosition(f);
    Math.abs(d) > 5 ? (l[u].dim < document.documentElement["client" + (this.isHorizontal ? "Width" : "Height")] - 1 && (u = g), u = o && a ? d < 0 ? u - 1 : u + 1 : d < 0 ? u + 1 : u - 1) : u = 0 === n && 0 === s ? u : g, this.slideTo(u, {
      transition: !1,
      friction: t.option("decelFriction")
    });
  }
  onClick(t) {
    const e = t.target,
      i = e && E(e) ? e.dataset : null;
    let n, s;
    i && (void 0 !== i.carouselPage ? (s = "slideTo", n = i.carouselPage) : void 0 !== i.carouselNext ? s = "slideNext" : void 0 !== i.carouselPrev && (s = "slidePrev")), s ? (t.preventDefault(), t.stopPropagation(), e && !e.hasAttribute("disabled") && this[s](n)) : this.emit("click", t);
  }
  onSlideTo(t) {
    const e = t.detail || 0;
    this.slideTo(this.getPageForSlide(e), {
      friction: 0
    });
  }
  onChange(t, e = 0) {
    const i = this.page;
    this.prevPage = i, this.page = t, this.option("adaptiveHeight") && this.setViewportHeight(), t !== i && (this.markSelectedSlides(), this.emit("change", t, i, e));
  }
  onRefresh() {
    let t = this.contentDim,
      e = this.viewportDim;
    this.updateMetrics(), this.contentDim === t && this.viewportDim === e || this.slideTo(this.page, {
      friction: 0,
      transition: !1
    });
  }
  onScroll() {
    var t;
    null === (t = this.viewport) || void 0 === t || t.scroll(0, 0);
  }
  onResize() {
    this.option("breakpoints") && this.processOptions();
  }
  onBeforeTransform(t) {
    this.lp !== t.current[this.axis] && (this.flipInfiniteTrack(), this.manageSlideVisiblity()), this.lp = t.current.e;
  }
  onEndAnimation() {
    this.inTransition.size || this.emit("settle");
  }
  reInit(t = null, e = null) {
    this.destroy(), this.state = j.Init, this.prevPage = null, this.userOptions = t || this.userOptions, this.userPlugins = e || this.userPlugins, this.processOptions();
  }
  slideTo(t = 0, {
    friction: e = this.option("friction"),
    transition: i = this.option("transition")
  } = {}) {
    if (this.state === j.Destroy) return;
    t = parseInt((t || 0).toString()) || 0;
    const n = this.getPageFromIndex(t),
      {
        axis: s,
        isHorizontal: o,
        isRTL: a,
        pages: r,
        panzoom: l
      } = this,
      c = r.length,
      h = a && o ? 1 : -1;
    if (!l || !c) return;
    if (this.page !== n) {
      const e = new Event("beforeChange", {
        bubbles: !0,
        cancelable: !0
      });
      if (this.emit("beforeChange", e, t), e.defaultPrevented) return;
    }
    if (this.transitionTo(t, i)) return;
    let d = r[n].pos;
    if (this.isInfinite) {
      const e = this.contentDim,
        i = l.target[s] * h;
      if (2 === c) d += e * Math.floor(parseFloat(t + "") / 2);else {
        d = [d, d - e, d + e].reduce(function (t, e) {
          return Math.abs(e - i) < Math.abs(t - i) ? e : t;
        });
      }
    }
    d *= h, Math.abs(l.target[s] - d) < 1 || (l.panTo({
      x: o ? d : 0,
      y: o ? 0 : d,
      friction: e
    }), this.onChange(n));
  }
  slideToClosest(t) {
    if (this.panzoom) {
      const {
        pageIndex: e
      } = this.getPageFromPosition();
      this.slideTo(e, t);
    }
  }
  slideNext() {
    this.slideTo(this.page + 1);
  }
  slidePrev() {
    this.slideTo(this.page - 1);
  }
  clearTransitions() {
    this.inTransition.clear(), S(this.container, this.cn("inTransition"));
    const t = ["to-prev", "to-next", "from-prev", "from-next"];
    for (const e of this.slides) {
      const i = e.el;
      if (i) {
        i.removeEventListener(U, this.onAnimationEnd), i.classList.remove(...t);
        const n = e.transition;
        n && i.classList.remove(`f-${n}Out`, `f-${n}In`);
      }
    }
    this.manageSlideVisiblity();
  }
  addSlide(t, e) {
    var i, n, s, o;
    const a = this.panzoom,
      r = (null === (i = this.pages[this.page]) || void 0 === i ? void 0 : i.pos) || 0,
      l = (null === (n = this.pages[this.page]) || void 0 === n ? void 0 : n.dim) || 0,
      c = this.contentDim < this.viewportDim;
    let h = Array.isArray(e) ? e : [e];
    const d = [];
    for (const t of h) d.push(B(t));
    this.slides.splice(t, 0, ...d);
    for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
    for (const t of d) this.emit("beforeInitSlide", t, t.index);
    if (this.page >= t && (this.page += d.length), this.updateMetrics(), a) {
      const e = (null === (s = this.pages[this.page]) || void 0 === s ? void 0 : s.pos) || 0,
        i = (null === (o = this.pages[this.page]) || void 0 === o ? void 0 : o.dim) || 0,
        n = this.pages.length || 1,
        h = this.isRTL ? l - i : i - l,
        d = this.isRTL ? r - e : e - r;
      c && 1 === n ? (t <= this.page && (a.current[this.axis] -= h, a.target[this.axis] -= h), a.panTo({
        [this.isHorizontal ? "x" : "y"]: -1 * e
      })) : d && t <= this.page && (a.target[this.axis] -= d, a.current[this.axis] -= d, a.requestTick());
    }
    for (const t of d) this.emit("initSlide", t, t.index);
  }
  prependSlide(t) {
    this.addSlide(0, t);
  }
  appendSlide(t) {
    this.addSlide(this.slides.length, t);
  }
  removeSlide(t) {
    const e = this.slides.length;
    t = (t % e + e) % e;
    const i = this.slides[t];
    if (i) {
      this.removeSlideEl(i, !0), this.slides.splice(t, 1);
      for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
      this.updateMetrics(), this.slideTo(this.page, {
        friction: 0,
        transition: !1
      }), this.emit("destroySlide", i);
    }
  }
  updateMetrics() {
    const {
      panzoom: e,
      viewport: i,
      track: n,
      slides: s,
      isHorizontal: o,
      isInfinite: a
    } = this;
    if (!n) return;
    const r = o ? "width" : "height",
      l = o ? "offsetWidth" : "offsetHeight";
    if (i) {
      let e = Math.max(i[l], t(i.getBoundingClientRect()[r], 1e3)),
        n = getComputedStyle(i),
        s = "padding",
        a = o ? "Right" : "Bottom";
      e -= parseFloat(n[s + (o ? "Left" : "Top")]) + parseFloat(n[s + a]), this.viewportDim = e;
    }
    let c,
      h = 0;
    for (const [e, i] of s.entries()) {
      let n = 0,
        o = 0;
      !i.el && c ? (n = c.dim, o = c.gap) : (({
        dim: n,
        gap: o
      } = this.getSlideMetrics(i)), c = i), n = t(n, 1e3), o = t(o, 1e3), i.dim = n, i.gap = o, i.pos = h, h += n, (a || e < s.length - 1) && (h += o);
    }
    h = t(h, 1e3), this.contentDim = h, e && (e.contentRect[r] = h, e.contentRect[o ? "fullWidth" : "fullHeight"] = h), this.pages = this.createPages(), this.pages = this.processPages(), this.state === j.Init && this.setInitialPage(), this.page = Math.max(0, Math.min(this.page, this.pages.length - 1)), this.manageSlideVisiblity(), this.emit("refresh");
  }
  getProgress(e, i = !1, n = !1) {
    void 0 === e && (e = this.page);
    const s = this,
      o = s.panzoom,
      a = s.contentDim,
      r = s.pages[e] || 0;
    if (!r || !o) return e > this.page ? -1 : 1;
    let l = -1 * o.current.e,
      c = t((l - r.pos) / (1 * r.dim), 1e3),
      h = c,
      d = c;
    this.isInfinite && !0 !== n && (h = t((l - r.pos + a) / (1 * r.dim), 1e3), d = t((l - r.pos - a) / (1 * r.dim), 1e3));
    let u = [c, h, d].reduce(function (t, e) {
      return Math.abs(e) < Math.abs(t) ? e : t;
    });
    return i ? u : u > 1 ? 1 : u < -1 ? -1 : u;
  }
  setViewportHeight() {
    const {
      page: t,
      pages: e,
      viewport: i,
      isHorizontal: n
    } = this;
    if (!i || !e[t]) return;
    let s = 0;
    n && this.track && (this.track.style.height = "auto", e[t].slides.forEach(t => {
      t.el && (s = Math.max(s, t.el.offsetHeight));
    })), i.style.height = s ? `${s}px` : "";
  }
  getPageForSlide(t) {
    for (const e of this.pages) for (const i of e.slides) if (i.index === t) return e.index;
    return -1;
  }
  getVisibleSlides(t = 0) {
    var e;
    const i = new Set();
    let {
      panzoom: n,
      contentDim: s,
      viewportDim: o,
      pages: a,
      page: r
    } = this;
    if (o) {
      s = s + (null === (e = this.slides[this.slides.length - 1]) || void 0 === e ? void 0 : e.gap) || 0;
      let l = 0;
      l = n && n.state !== m.Init && n.state !== m.Destroy ? -1 * n.current[this.axis] : a[r] && a[r].pos || 0, this.isInfinite && (l -= Math.floor(l / s) * s), this.isRTL && this.isHorizontal && (l *= -1);
      const c = l - o * t,
        h = l + o * (t + 1),
        d = this.isInfinite ? [-1, 0, 1] : [0];
      for (const t of this.slides) for (const e of d) {
        const n = t.pos + e * s,
          o = n + t.dim + t.gap;
        n < h && o > c && i.add(t);
      }
    }
    return i;
  }
  getPageFromPosition(t) {
    const {
        viewportDim: e,
        contentDim: i,
        slides: n,
        pages: s,
        panzoom: o
      } = this,
      a = s.length,
      r = n.length,
      l = n[0],
      c = n[r - 1],
      h = this.option("center");
    let d = 0,
      u = 0,
      p = 0,
      f = void 0 === t ? -1 * ((null == o ? void 0 : o.target[this.axis]) || 0) : t;
    h && (f += .5 * e), this.isInfinite ? (f < l.pos - .5 * c.gap && (f -= i, p = -1), f > c.pos + c.dim + .5 * c.gap && (f -= i, p = 1)) : f = Math.max(l.pos || 0, Math.min(f, c.pos));
    let g = c,
      m = n.find(t => {
        const e = t.pos - .5 * g.gap,
          i = t.pos + t.dim + .5 * t.gap;
        return g = t, f >= e && f < i;
      });
    return m || (m = c), u = this.getPageForSlide(m.index), d = u + p * a, {
      page: d,
      pageIndex: u
    };
  }
  setPageFromPosition() {
    const {
      pageIndex: t
    } = this.getPageFromPosition();
    this.onChange(t);
  }
  destroy() {
    if ([j.Destroy].includes(this.state)) return;
    this.state = j.Destroy;
    const {
        container: t,
        viewport: e,
        track: i,
        slides: n,
        panzoom: s
      } = this,
      o = this.option("classes");
    t.removeEventListener("click", this.onClick, {
      passive: !1,
      capture: !1
    }), t.removeEventListener("slideTo", this.onSlideTo), window.removeEventListener("resize", this.onResize), s && (s.destroy(), this.panzoom = null), n && n.forEach(t => {
      this.removeSlideEl(t);
    }), this.detachPlugins(), e && (e.removeEventListener("scroll", this.onScroll), e.offsetParent && i && i.offsetParent && e.replaceWith(...i.childNodes));
    for (const [e, i] of Object.entries(o)) "container" !== e && i && t.classList.remove(i);
    this.track = null, this.viewport = null, this.page = 0, this.slides = [];
    const a = this.events.get("ready");
    this.events = new Map(), a && this.events.set("ready", a);
  }
}
Object.defineProperty(J, "Panzoom", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: k
}), Object.defineProperty(J, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: F
}), Object.defineProperty(J, "Plugins", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: Z
});
const Q = function (t) {
    if (!E(t)) return 0;
    const e = window.scrollY,
      i = window.innerHeight,
      n = e + i,
      s = t.getBoundingClientRect(),
      o = s.y + e,
      a = s.height,
      r = o + a;
    if (e > r || n < o) return 0;
    if (e < o && n > r) return 100;
    if (o < e && r > n) return 100;
    let l = a;
    o < e && (l -= e - o), r > n && (l -= r - n);
    const c = l / i * 100;
    return Math.round(c);
  },
  tt = !("undefined" == typeof window || !window.document || !window.document.createElement);
let et;
const it = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden]):not(.fancybox-focus-guard)", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])'].join(","),
  nt = t => {
    if (t && tt) {
      void 0 === et && document.createElement("div").focus({
        get preventScroll() {
          return et = !0, !1;
        }
      });
      try {
        if (et) t.focus({
          preventScroll: !0
        });else {
          const e = window.scrollY || document.body.scrollTop,
            i = window.scrollX || document.body.scrollLeft;
          t.focus(), document.body.scrollTo({
            top: e,
            left: i,
            behavior: "auto"
          });
        }
      } catch (t) {}
    }
  },
  st = () => {
    const t = document;
    let e,
      i = "",
      n = "",
      s = "";
    return t.fullscreenEnabled ? (i = "requestFullscreen", n = "exitFullscreen", s = "fullscreenElement") : t.webkitFullscreenEnabled && (i = "webkitRequestFullscreen", n = "webkitExitFullscreen", s = "webkitFullscreenElement"), i && (e = {
      request: function (e = t.documentElement) {
        return "webkitRequestFullscreen" === i ? e[i](Element.ALLOW_KEYBOARD_INPUT) : e[i]();
      },
      exit: function () {
        return t[s] && t[n]();
      },
      isFullscreen: function () {
        return t[s];
      }
    }), e;
  },
  ot = {
    dragToClose: !0,
    hideScrollbar: !0,
    Carousel: {
      classes: {
        container: "fancybox__carousel",
        viewport: "fancybox__viewport",
        track: "fancybox__track",
        slide: "fancybox__slide"
      }
    },
    contentClick: "toggleZoom",
    contentDblClick: !1,
    backdropClick: "close",
    animated: !0,
    idle: 3500,
    showClass: "f-zoomInUp",
    hideClass: "f-fadeOut",
    commonCaption: !1,
    parentEl: null,
    startIndex: 0,
    l10n: Object.assign(Object.assign({}, b), {
      CLOSE: "Close",
      NEXT: "Next",
      PREV: "Previous",
      MODAL: "You can close this modal content with the ESC key",
      ERROR: "Something Went Wrong, Please Try Again Later",
      IMAGE_ERROR: "Image Not Found",
      ELEMENT_NOT_FOUND: "HTML Element Not Found",
      AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
      AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
      IFRAME_ERROR: "Error Loading Page",
      TOGGLE_ZOOM: "Toggle zoom level",
      TOGGLE_THUMBS: "Toggle thumbnails",
      TOGGLE_SLIDESHOW: "Toggle slideshow",
      TOGGLE_FULLSCREEN: "Toggle full-screen mode",
      DOWNLOAD: "Download"
    }),
    tpl: {
      closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>',
      main: '<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">\n    <div class="fancybox__backdrop"></div>\n    <div class="fancybox__carousel"></div>\n    <div class="fancybox__footer"></div>\n  </div>'
    },
    groupAll: !1,
    groupAttr: "data-fancybox",
    defaultType: "image",
    defaultDisplay: "block",
    autoFocus: !0,
    trapFocus: !0,
    placeFocusBack: !0,
    closeButton: "auto",
    keyboard: {
      Escape: "close",
      Delete: "close",
      Backspace: "close",
      PageUp: "next",
      PageDown: "prev",
      ArrowUp: "prev",
      ArrowDown: "next",
      ArrowRight: "next",
      ArrowLeft: "prev"
    },
    Fullscreen: {
      autoStart: !1
    },
    compact: () => window.matchMedia("(max-width: 578px), (max-height: 578px)").matches,
    wheel: "zoom"
  };
var at, rt;
!function (t) {
  t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Closing = 2] = "Closing", t[t.CustomClosing = 3] = "CustomClosing", t[t.Destroy = 4] = "Destroy";
}(at || (at = {})), function (t) {
  t[t.Loading = 0] = "Loading", t[t.Opening = 1] = "Opening", t[t.Ready = 2] = "Ready", t[t.Closing = 3] = "Closing";
}(rt || (rt = {}));
let lt = "",
  ct = !1,
  ht = !1,
  dt = null;
const ut = () => {
    let t = "",
      e = "";
    const i = Ce.getInstance();
    if (i) {
      const n = i.carousel,
        s = i.getSlide();
      if (n && s) {
        let o = s.slug || void 0,
          a = s.triggerEl || void 0;
        e = o || i.option("slug") || "", !e && a && a.dataset && (e = a.dataset.fancybox || ""), e && "true" !== e && (t = "#" + e + (!o && n.slides.length > 1 ? "-" + (s.index + 1) : ""));
      }
    }
    return {
      hash: t,
      slug: e,
      index: 1
    };
  },
  pt = () => {
    const t = new URL(document.URL).hash,
      e = t.slice(1).split("-"),
      i = e[e.length - 1],
      n = i && /^\+?\d+$/.test(i) && parseInt(e.pop() || "1", 10) || 1;
    return {
      hash: t,
      slug: e.join("-"),
      index: n
    };
  },
  ft = () => {
    const {
      slug: t,
      index: e
    } = pt();
    if (!t) return;
    let i = document.querySelector(`[data-slug="${t}"]`);
    if (i && i.dispatchEvent(new CustomEvent("click", {
      bubbles: !0,
      cancelable: !0
    })), Ce.getInstance()) return;
    const n = document.querySelectorAll(`[data-fancybox="${t}"]`);
    n.length && (i = n[e - 1], i && i.dispatchEvent(new CustomEvent("click", {
      bubbles: !0,
      cancelable: !0
    })));
  },
  gt = () => {
    if (!1 === Ce.defaults.Hash) return;
    const t = Ce.getInstance();
    if (!1 === (null == t ? void 0 : t.options.Hash)) return;
    const {
        slug: e,
        index: i
      } = pt(),
      {
        slug: n
      } = ut();
    t && (e === n ? t.jumpTo(i - 1) : (ct = !0, t.close())), ft();
  },
  mt = () => {
    dt && clearTimeout(dt), queueMicrotask(() => {
      gt();
    });
  },
  vt = () => {
    window.addEventListener("hashchange", mt, !1), setTimeout(() => {
      gt();
    }, 500);
  };
tt && (/complete|interactive|loaded/.test(document.readyState) ? vt() : document.addEventListener("DOMContentLoaded", vt));
const bt = "is-zooming-in";
class yt extends N {
  onCreateSlide(t, e, i) {
    const n = this.instance.optionFor(i, "src") || "";
    i.el && "image" === i.type && "string" == typeof n && this.setImage(i, n);
  }
  onRemoveSlide(t, e, i) {
    i.panzoom && i.panzoom.destroy(), i.panzoom = void 0, i.imageEl = void 0;
  }
  onChange(t, e, i, n) {
    S(this.instance.container, bt);
    for (const t of e.slides) {
      const e = t.panzoom;
      e && t.index !== i && e.reset(.35);
    }
  }
  onClose() {
    var t;
    const e = this.instance,
      i = e.container,
      n = e.getSlide();
    if (!i || !i.parentElement || !n) return;
    const {
      el: s,
      contentEl: o,
      panzoom: a,
      thumbElSrc: r
    } = n;
    if (!s || !r || !o || !a || a.isContentLoading || a.state === m.Init || a.state === m.Destroy) return;
    a.updateMetrics();
    let l = this.getZoomInfo(n);
    if (!l) return;
    this.instance.state = at.CustomClosing, i.classList.remove(bt), i.classList.add("is-zooming-out"), o.style.backgroundImage = `url('${r}')`;
    const c = i.getBoundingClientRect();
    1 === ((null === (t = window.visualViewport) || void 0 === t ? void 0 : t.scale) || 1) && Object.assign(i.style, {
      position: "absolute",
      top: `${i.offsetTop + window.scrollY}px`,
      left: `${i.offsetLeft + window.scrollX}px`,
      bottom: "auto",
      right: "auto",
      width: `${c.width}px`,
      height: `${c.height}px`,
      overflow: "hidden"
    });
    const {
      x: h,
      y: d,
      scale: u,
      opacity: p
    } = l;
    if (p) {
      const t = ((t, e, i, n) => {
        const s = e - t,
          o = n - i;
        return e => i + ((e - t) / s * o || 0);
      })(a.scale, u, 1, 0);
      a.on("afterTransform", () => {
        o.style.opacity = t(a.scale) + "";
      });
    }
    a.on("endAnimation", () => {
      e.destroy();
    }), a.target.a = u, a.target.b = 0, a.target.c = 0, a.target.d = u, a.panTo({
      x: h,
      y: d,
      scale: u,
      friction: p ? .2 : .33,
      ignoreBounds: !0
    }), a.isResting && e.destroy();
  }
  setImage(t, e) {
    const i = this.instance;
    t.src = e, this.process(t, e).then(e => {
      const {
        contentEl: n,
        imageEl: s,
        thumbElSrc: o,
        el: a
      } = t;
      if (i.isClosing() || !n || !s) return;
      n.offsetHeight;
      const r = !!i.isOpeningSlide(t) && this.getZoomInfo(t);
      if (this.option("protected") && a) {
        a.addEventListener("contextmenu", t => {
          t.preventDefault();
        });
        const t = document.createElement("div");
        P(t, "fancybox-protected"), n.appendChild(t);
      }
      if (o && r) {
        const s = e.contentRect,
          a = Math.max(s.fullWidth, s.fullHeight);
        let c = null;
        !r.opacity && a > 1200 && (c = document.createElement("img"), P(c, "fancybox-ghost"), c.src = o, n.appendChild(c));
        const h = () => {
          c && (P(c, "f-fadeFastOut"), setTimeout(() => {
            c && (c.remove(), c = null);
          }, 200));
        };
        (l = o, new Promise((t, e) => {
          const i = new Image();
          i.onload = t, i.onerror = e, i.src = l;
        })).then(() => {
          i.hideLoading(t), t.state = rt.Opening, this.instance.emit("reveal", t), this.zoomIn(t).then(() => {
            h(), this.instance.done(t);
          }, () => {}), c && setTimeout(() => {
            h();
          }, a > 2500 ? 800 : 200);
        }, () => {
          i.hideLoading(t), i.revealContent(t);
        });
      } else {
        const n = this.optionFor(t, "initialSize"),
          s = this.optionFor(t, "zoom"),
          o = {
            event: i.prevMouseMoveEvent || i.options.event,
            friction: s ? .12 : 0
          };
        let a = i.optionFor(t, "showClass") || void 0,
          r = !0;
        i.isOpeningSlide(t) && ("full" === n ? e.zoomToFull(o) : "cover" === n ? e.zoomToCover(o) : "max" === n ? e.zoomToMax(o) : r = !1, e.stop("current")), r && a && (a = e.isDragging ? "f-fadeIn" : ""), i.hideLoading(t), i.revealContent(t, a);
      }
      var l;
    }, () => {
      i.setError(t, "{{IMAGE_ERROR}}");
    });
  }
  process(t, e) {
    return new Promise((i, s) => {
      var o;
      const a = this.instance,
        r = t.el;
      a.clearContent(t), a.showLoading(t);
      let l = this.optionFor(t, "content");
      if ("string" == typeof l && (l = n(l)), !l || !E(l)) {
        if (l = document.createElement("img"), l instanceof HTMLImageElement) {
          let i = "",
            n = t.caption;
          i = "string" == typeof n && n ? n.replace(/<[^>]+>/gi, "").substring(0, 1e3) : `Image ${t.index + 1} of ${(null === (o = a.carousel) || void 0 === o ? void 0 : o.pages.length) || 1}`, l.src = e || "", l.alt = i, l.draggable = !1, t.srcset && l.setAttribute("srcset", t.srcset), this.instance.isOpeningSlide(t) && (l.fetchPriority = "high");
        }
        t.sizes && l.setAttribute("sizes", t.sizes);
      }
      P(l, "fancybox-image"), t.imageEl = l, a.setContent(t, l, !1);
      t.panzoom = new k(r, u({
        transformParent: !0
      }, this.option("Panzoom") || {}, {
        content: l,
        width: a.optionFor(t, "width", "auto"),
        height: a.optionFor(t, "height", "auto"),
        wheel: () => {
          const t = a.option("wheel");
          return ("zoom" === t || "pan" == t) && t;
        },
        click: (e, i) => {
          var n, s;
          if (a.isCompact || a.isClosing()) return !1;
          if (t.index !== (null === (n = a.getSlide()) || void 0 === n ? void 0 : n.index)) return !1;
          if (i) {
            const t = i.composedPath()[0];
            if (["A", "BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].includes(t.nodeName)) return !1;
          }
          let o = !i || i.target && (null === (s = t.contentEl) || void 0 === s ? void 0 : s.contains(i.target));
          return a.option(o ? "contentClick" : "backdropClick") || !1;
        },
        dblClick: () => a.isCompact ? "toggleZoom" : a.option("contentDblClick") || !1,
        spinner: !1,
        panOnlyZoomed: !0,
        wheelLimit: 1 / 0,
        on: {
          ready: t => {
            i(t);
          },
          error: () => {
            s();
          },
          destroy: () => {
            s();
          }
        }
      }));
    });
  }
  zoomIn(t) {
    return new Promise((e, i) => {
      const n = this.instance,
        s = n.container,
        {
          panzoom: o,
          contentEl: a,
          el: r
        } = t;
      o && o.updateMetrics();
      const l = this.getZoomInfo(t);
      if (!(l && r && a && o && s)) return void i();
      const {
          x: c,
          y: h,
          scale: d,
          opacity: u
        } = l,
        p = () => {
          t.state !== rt.Closing && (u && (a.style.opacity = Math.max(Math.min(1, 1 - (1 - o.scale) / (1 - d)), 0) + ""), o.scale >= 1 && o.scale > o.targetScale - .1 && e(o));
        },
        f = t => {
          (t.scale < .99 || t.scale > 1.01) && !t.isDragging || (S(s, bt), a.style.opacity = "", t.off("endAnimation", f), t.off("touchStart", f), t.off("afterTransform", p), e(t));
        };
      o.on("endAnimation", f), o.on("touchStart", f), o.on("afterTransform", p), o.on(["error", "destroy"], () => {
        i();
      }), o.panTo({
        x: c,
        y: h,
        scale: d,
        friction: 0,
        ignoreBounds: !0
      }), o.stop("current");
      const g = {
          event: "mousemove" === o.panMode ? n.prevMouseMoveEvent || n.options.event : void 0
        },
        m = this.optionFor(t, "initialSize");
      P(s, bt), n.hideLoading(t), "full" === m ? o.zoomToFull(g) : "cover" === m ? o.zoomToCover(g) : "max" === m ? o.zoomToMax(g) : o.reset(.172);
    });
  }
  getZoomInfo(t) {
    const {
        el: e,
        imageEl: i,
        thumbEl: n,
        panzoom: s
      } = t,
      o = this.instance,
      a = o.container;
    if (!e || !i || !n || !s || Q(n) < 3 || !this.optionFor(t, "zoom") || !a || o.state === at.Destroy) return !1;
    if ("0" === getComputedStyle(a).getPropertyValue("--f-images-zoom")) return !1;
    const r = window.visualViewport || null;
    if (1 !== (r ? r.scale : 1)) return !1;
    let {
        top: l,
        left: c,
        width: h,
        height: d
      } = n.getBoundingClientRect(),
      {
        top: u,
        left: p,
        fitWidth: f,
        fitHeight: g
      } = s.contentRect;
    if (!(h && d && f && g)) return !1;
    const m = s.container.getBoundingClientRect();
    p += m.left, u += m.top;
    const v = -1 * (p + .5 * f - (c + .5 * h)),
      b = -1 * (u + .5 * g - (l + .5 * d)),
      y = h / f;
    let w = this.option("zoomOpacity") || !1;
    return "auto" === w && (w = Math.abs(h / d - f / g) > .1), {
      x: v,
      y: b,
      scale: y,
      opacity: w
    };
  }
  attach() {
    const t = this,
      e = t.instance;
    e.on("Carousel.change", t.onChange), e.on("Carousel.createSlide", t.onCreateSlide), e.on("Carousel.removeSlide", t.onRemoveSlide), e.on("close", t.onClose);
  }
  detach() {
    const t = this,
      e = t.instance;
    e.off("Carousel.change", t.onChange), e.off("Carousel.createSlide", t.onCreateSlide), e.off("Carousel.removeSlide", t.onRemoveSlide), e.off("close", t.onClose);
  }
}
Object.defineProperty(yt, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {
    initialSize: "fit",
    Panzoom: {
      maxScale: 1
    },
    protected: !1,
    zoom: !0,
    zoomOpacity: "auto"
  }
}), "function" == typeof SuppressedError && SuppressedError;
const wt = "html",
  xt = "image",
  Et = "map",
  St = "youtube",
  Pt = "vimeo",
  Ct = "html5video",
  Tt = (t, e = {}) => {
    const i = new URL(t),
      n = new URLSearchParams(i.search),
      s = new URLSearchParams();
    for (const [t, i] of [...n, ...Object.entries(e)]) {
      let e = i + "";
      if ("t" === t) {
        let t = e.match(/((\d*)m)?(\d*)s?/);
        t && s.set("start", 60 * parseInt(t[2] || "0") + parseInt(t[3] || "0") + "");
      } else s.set(t, e);
    }
    let o = s + "",
      a = t.match(/#t=((.*)?\d+s)/);
    return a && (o += `#t=${a[1]}`), o;
  },
  Mt = {
    ajax: null,
    autoSize: !0,
    iframeAttr: {
      allow: "autoplay; fullscreen",
      scrolling: "auto"
    },
    preload: !0,
    videoAutoplay: !0,
    videoRatio: 16 / 9,
    videoTpl: '<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos.</video>',
    videoFormat: "",
    vimeo: {
      byline: 1,
      color: "00adef",
      controls: 1,
      dnt: 1,
      muted: 0
    },
    youtube: {
      controls: 1,
      enablejsapi: 1,
      nocookie: 1,
      rel: 0,
      fs: 1
    }
  },
  Ot = ["image", "html", "ajax", "inline", "clone", "iframe", "map", "pdf", "html5video", "youtube", "vimeo"];
class At extends N {
  onBeforeInitSlide(t, e, i) {
    this.processType(i);
  }
  onCreateSlide(t, e, i) {
    this.setContent(i);
  }
  onClearContent(t, e) {
    e.xhr && (e.xhr.abort(), e.xhr = null);
    const i = e.iframeEl;
    i && (i.onload = i.onerror = null, i.src = "//about:blank", e.iframeEl = null);
    const n = e.contentEl,
      s = e.placeholderEl;
    if ("inline" === e.type && n && s) n.classList.remove("fancybox__content"), "none" !== n.style.display && (n.style.display = "none"), s.parentNode && s.parentNode.insertBefore(n, s), s.remove(), e.contentEl = void 0, e.placeholderEl = void 0;else for (; e.el && e.el.firstChild;) e.el.removeChild(e.el.firstChild);
  }
  onSelectSlide(t, e, i) {
    i.state === rt.Ready && this.playVideo();
  }
  onUnselectSlide(t, e, i) {
    var n, s;
    if (i.type === Ct) {
      try {
        null === (s = null === (n = i.el) || void 0 === n ? void 0 : n.querySelector("video")) || void 0 === s || s.pause();
      } catch (t) {}
      return;
    }
    let o;
    i.type === Pt ? o = {
      method: "pause",
      value: "true"
    } : i.type === St && (o = {
      event: "command",
      func: "pauseVideo"
    }), o && i.iframeEl && i.iframeEl.contentWindow && i.iframeEl.contentWindow.postMessage(JSON.stringify(o), "*"), i.poller && clearTimeout(i.poller);
  }
  onDone(t, e) {
    t.isCurrentSlide(e) && !t.isClosing() && this.playVideo();
  }
  onRefresh(t, e) {
    e.slides.forEach(t => {
      t.el && (this.resizeIframe(t), this.setAspectRatio(t));
    });
  }
  onMessage(t) {
    try {
      let e = JSON.parse(t.data);
      if ("https://player.vimeo.com" === t.origin) {
        if ("ready" === e.event) for (let e of Array.from(document.getElementsByClassName("fancybox__iframe"))) e instanceof HTMLIFrameElement && e.contentWindow === t.source && (e.dataset.ready = "true");
      } else if (t.origin.match(/^https:\/\/(www.)?youtube(-nocookie)?.com$/) && "onReady" === e.event) {
        const t = document.getElementById(e.id);
        t && (t.dataset.ready = "true");
      }
    } catch (t) {}
  }
  loadAjaxContent(t) {
    const e = this.instance.optionFor(t, "src") || "";
    this.instance.showLoading(t);
    const i = this.instance,
      n = new XMLHttpRequest();
    i.showLoading(t), n.onreadystatechange = function () {
      n.readyState === XMLHttpRequest.DONE && i.state === at.Ready && (i.hideLoading(t), 200 === n.status ? i.setContent(t, n.responseText) : i.setError(t, 404 === n.status ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"));
    };
    const s = t.ajax || null;
    n.open(s ? "POST" : "GET", e + ""), n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), n.setRequestHeader("X-Requested-With", "XMLHttpRequest"), n.send(s), t.xhr = n;
  }
  setInlineContent(t) {
    let e = null;
    if (E(t.src)) e = t.src;else if ("string" == typeof t.src) {
      const i = t.src.split("#", 2).pop();
      e = i ? document.getElementById(i) : null;
    }
    if (e) {
      if ("clone" === t.type || e.closest(".fancybox__slide")) {
        e = e.cloneNode(!0);
        const i = e.dataset.animationName;
        i && (e.classList.remove(i), delete e.dataset.animationName);
        let n = e.getAttribute("id");
        n = n ? `${n}--clone` : `clone-${this.instance.id}-${t.index}`, e.setAttribute("id", n);
      } else if (e.parentNode) {
        const i = document.createElement("div");
        i.classList.add("fancybox-placeholder"), e.parentNode.insertBefore(i, e), t.placeholderEl = i;
      }
      this.instance.setContent(t, e);
    } else this.instance.setError(t, "{{ELEMENT_NOT_FOUND}}");
  }
  setIframeContent(t) {
    const {
      src: e,
      el: i
    } = t;
    if (!e || "string" != typeof e || !i) return;
    i.classList.add("is-loading");
    const n = this.instance,
      s = document.createElement("iframe");
    s.className = "fancybox__iframe", s.setAttribute("id", `fancybox__iframe_${n.id}_${t.index}`);
    for (const [e, i] of Object.entries(this.optionFor(t, "iframeAttr") || {})) s.setAttribute(e, i);
    s.onerror = () => {
      n.setError(t, "{{IFRAME_ERROR}}");
    }, t.iframeEl = s;
    const o = this.optionFor(t, "preload");
    if ("iframe" !== t.type || !1 === o) return s.setAttribute("src", t.src + ""), n.setContent(t, s, !1), this.resizeIframe(t), void n.revealContent(t);
    n.showLoading(t), s.onload = () => {
      if (!s.src.length) return;
      const e = "true" !== s.dataset.ready;
      s.dataset.ready = "true", this.resizeIframe(t), e ? n.revealContent(t) : n.hideLoading(t);
    }, s.setAttribute("src", e), n.setContent(t, s, !1);
  }
  resizeIframe(t) {
    const {
      type: e,
      iframeEl: i
    } = t;
    if (e === St || e === Pt) return;
    const n = null == i ? void 0 : i.parentElement;
    if (!i || !n) return;
    let s = t.autoSize;
    void 0 === s && (s = this.optionFor(t, "autoSize"));
    let o = t.width || 0,
      a = t.height || 0;
    o && a && (s = !1);
    const r = n && n.style;
    if (!1 !== t.preload && !1 !== s && r) try {
      const t = window.getComputedStyle(n),
        e = parseFloat(t.paddingLeft) + parseFloat(t.paddingRight),
        s = parseFloat(t.paddingTop) + parseFloat(t.paddingBottom),
        l = i.contentWindow;
      if (l) {
        const t = l.document,
          i = t.getElementsByTagName(wt)[0],
          n = t.body;
        r.width = "", n.style.overflow = "hidden", o = o || i.scrollWidth + e, r.width = `${o}px`, n.style.overflow = "", r.flex = "0 0 auto", r.height = `${n.scrollHeight}px`, a = i.scrollHeight + s;
      }
    } catch (t) {}
    if (o || a) {
      const t = {
        flex: "0 1 auto",
        width: "",
        height: ""
      };
      o && "auto" !== o && (t.width = `${o}px`), a && "auto" !== a && (t.height = `${a}px`), Object.assign(r, t);
    }
  }
  playVideo() {
    const t = this.instance.getSlide();
    if (!t) return;
    const {
      el: e
    } = t;
    if (!e || !e.offsetParent) return;
    if (!this.optionFor(t, "videoAutoplay")) return;
    if (t.type === Ct) try {
      const t = e.querySelector("video");
      if (t) {
        const e = t.play();
        void 0 !== e && e.then(() => {}).catch(e => {
          t.muted = !0, t.play();
        });
      }
    } catch (t) {}
    if (t.type !== St && t.type !== Pt) return;
    const i = () => {
      if (t.iframeEl && t.iframeEl.contentWindow) {
        let e;
        if ("true" === t.iframeEl.dataset.ready) return e = t.type === St ? {
          event: "command",
          func: "playVideo"
        } : {
          method: "play",
          value: "true"
        }, e && t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"), void (t.poller = void 0);
        t.type === St && (e = {
          event: "listening",
          id: t.iframeEl.getAttribute("id")
        }, t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"));
      }
      t.poller = setTimeout(i, 250);
    };
    i();
  }
  processType(t) {
    if (t.html) return t.type = wt, t.src = t.html, void (t.html = "");
    const e = this.instance.optionFor(t, "src", "");
    if (!e || "string" != typeof e) return;
    let i = t.type,
      n = null;
    if (n = e.match(/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|shorts\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i)) {
      const s = this.optionFor(t, St),
        {
          nocookie: o
        } = s,
        a = function (t, e) {
          var i = {};
          for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && e.indexOf(n) < 0 && (i[n] = t[n]);
          if (null != t && "function" == typeof Object.getOwnPropertySymbols) {
            var s = 0;
            for (n = Object.getOwnPropertySymbols(t); s < n.length; s++) e.indexOf(n[s]) < 0 && Object.prototype.propertyIsEnumerable.call(t, n[s]) && (i[n[s]] = t[n[s]]);
          }
          return i;
        }(s, ["nocookie"]),
        r = `www.youtube${o ? "-nocookie" : ""}.com`,
        l = Tt(e, a),
        c = encodeURIComponent(n[2]);
      t.videoId = c, t.src = `https://${r}/embed/${c}?${l}`, t.thumbSrc = t.thumbSrc || `https://i.ytimg.com/vi/${c}/mqdefault.jpg`, i = St;
    } else if (n = e.match(/^.+vimeo.com\/(?:\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/)) {
      const s = Tt(e, this.optionFor(t, Pt)),
        o = encodeURIComponent(n[1]),
        a = n[4] || "";
      t.videoId = o, t.src = `https://player.vimeo.com/video/${o}?${a ? `h=${a}${s ? "&" : ""}` : ""}${s}`, i = Pt;
    }
    if (!i && t.triggerEl) {
      const e = t.triggerEl.dataset.type;
      Ot.includes(e) && (i = e);
    }
    i || "string" == typeof e && ("#" === e.charAt(0) ? i = "inline" : (n = e.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (i = Ct, t.videoFormat = t.videoFormat || "video/" + ("ogv" === n[1] ? "ogg" : n[1])) : e.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? i = xt : e.match(/\.(pdf)((\?|#).*)?$/i) && (i = "pdf")), (n = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i)) ? (t.src = `https://maps.google.${n[1]}/?ll=${(n[2] ? n[2] + "&z=" + Math.floor(parseFloat(n[3])) + (n[4] ? n[4].replace(/^\//, "&") : "") : n[4] + "").replace(/\?/, "&")}&output=${n[4] && n[4].indexOf("layer=c") > 0 ? "svembed" : "embed"}`, i = Et) : (n = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i)) && (t.src = `https://maps.google.${n[1]}/maps?q=${n[2].replace("query=", "q=").replace("api=1", "")}&output=embed`, i = Et), i = i || this.instance.option("defaultType"), t.type = i, i === xt && (t.thumbSrc = t.thumbSrc || t.src);
  }
  setContent(t) {
    const e = this.instance.optionFor(t, "src") || "";
    if (t && t.type && e) {
      switch (t.type) {
        case wt:
          this.instance.setContent(t, e);
          break;
        case Ct:
          const i = this.option("videoTpl");
          i && this.instance.setContent(t, i.replace(/\{\{src\}\}/gi, e + "").replace(/\{\{format\}\}/gi, this.optionFor(t, "videoFormat") || "").replace(/\{\{poster\}\}/gi, t.poster || t.thumbSrc || ""));
          break;
        case "inline":
        case "clone":
          this.setInlineContent(t);
          break;
        case "ajax":
          this.loadAjaxContent(t);
          break;
        case "pdf":
        case Et:
        case St:
        case Pt:
          t.preload = !1;
        case "iframe":
          this.setIframeContent(t);
      }
      this.setAspectRatio(t);
    }
  }
  setAspectRatio(t) {
    const e = t.contentEl;
    if (!(t.el && e && t.type && [St, Pt, Ct].includes(t.type))) return;
    let i,
      n = t.width || "auto",
      s = t.height || "auto";
    if ("auto" === n || "auto" === s) {
      i = this.optionFor(t, "videoRatio");
      const e = (i + "").match(/(\d+)\s*\/\s?(\d+)/);
      i = e && e.length > 2 ? parseFloat(e[1]) / parseFloat(e[2]) : parseFloat(i + "");
    } else n && s && (i = n / s);
    if (!i) return;
    e.style.aspectRatio = "", e.style.width = "", e.style.height = "", e.offsetHeight;
    const o = e.getBoundingClientRect(),
      a = o.width || 1,
      r = o.height || 1;
    e.style.aspectRatio = i + "", i < a / r ? (s = "auto" === s ? r : Math.min(r, s), e.style.width = "auto", e.style.height = `${s}px`) : (n = "auto" === n ? a : Math.min(a, n), e.style.width = `${n}px`, e.style.height = "auto");
  }
  attach() {
    const t = this,
      e = t.instance;
    e.on("Carousel.beforeInitSlide", t.onBeforeInitSlide), e.on("Carousel.createSlide", t.onCreateSlide), e.on("Carousel.selectSlide", t.onSelectSlide), e.on("Carousel.unselectSlide", t.onUnselectSlide), e.on("Carousel.Panzoom.refresh", t.onRefresh), e.on("done", t.onDone), e.on("clearContent", t.onClearContent), window.addEventListener("message", t.onMessage);
  }
  detach() {
    const t = this,
      e = t.instance;
    e.off("Carousel.beforeInitSlide", t.onBeforeInitSlide), e.off("Carousel.createSlide", t.onCreateSlide), e.off("Carousel.selectSlide", t.onSelectSlide), e.off("Carousel.unselectSlide", t.onUnselectSlide), e.off("Carousel.Panzoom.refresh", t.onRefresh), e.off("done", t.onDone), e.off("clearContent", t.onClearContent), window.removeEventListener("message", t.onMessage);
  }
}
Object.defineProperty(At, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: Mt
});
const Lt = "play",
  zt = "pause",
  Rt = "ready";
class kt extends N {
  constructor() {
    super(...arguments), Object.defineProperty(this, "state", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: Rt
    }), Object.defineProperty(this, "inHover", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "timer", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "progressBar", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    });
  }
  get isActive() {
    return this.state !== Rt;
  }
  onReady(t) {
    this.option("autoStart") && (t.isInfinite || t.page < t.pages.length - 1) && this.start();
  }
  onChange() {
    this.removeProgressBar(), this.pause();
  }
  onSettle() {
    this.resume();
  }
  onVisibilityChange() {
    "visible" === document.visibilityState ? this.resume() : this.pause();
  }
  onMouseEnter() {
    this.inHover = !0, this.pause();
  }
  onMouseLeave() {
    var t;
    this.inHover = !1, (null === (t = this.instance.panzoom) || void 0 === t ? void 0 : t.isResting) && this.resume();
  }
  onTimerEnd() {
    const t = this.instance;
    "play" === this.state && (t.isInfinite || t.page !== t.pages.length - 1 ? t.slideNext() : t.slideTo(0));
  }
  removeProgressBar() {
    this.progressBar && (this.progressBar.remove(), this.progressBar = null);
  }
  createProgressBar() {
    var t;
    if (!this.option("showProgress")) return null;
    this.removeProgressBar();
    const e = this.instance,
      i = (null === (t = e.pages[e.page]) || void 0 === t ? void 0 : t.slides) || [];
    let n = this.option("progressParentEl");
    if (n || (n = (1 === i.length ? i[0].el : null) || e.viewport), !n) return null;
    const s = document.createElement("div");
    return P(s, "f-progress"), n.prepend(s), this.progressBar = s, s.offsetHeight, s;
  }
  set() {
    const t = this,
      e = t.instance;
    if (e.pages.length < 2) return;
    if (t.timer) return;
    const i = t.option("timeout");
    t.state = Lt, P(e.container, "has-autoplay");
    let n = t.createProgressBar();
    n && (n.style.transitionDuration = `${i}ms`, n.style.transform = "scaleX(1)"), t.timer = setTimeout(() => {
      t.timer = null, t.inHover || t.onTimerEnd();
    }, i), t.emit("set");
  }
  clear() {
    const t = this;
    t.timer && (clearTimeout(t.timer), t.timer = null), t.removeProgressBar();
  }
  start() {
    const t = this;
    if (t.set(), t.state !== Rt) {
      if (t.option("pauseOnHover")) {
        const e = t.instance.container;
        e.addEventListener("mouseenter", t.onMouseEnter, !1), e.addEventListener("mouseleave", t.onMouseLeave, !1);
      }
      document.addEventListener("visibilitychange", t.onVisibilityChange, !1), t.emit("start");
    }
  }
  stop() {
    const t = this,
      e = t.state,
      i = t.instance.container;
    t.clear(), t.state = Rt, i.removeEventListener("mouseenter", t.onMouseEnter, !1), i.removeEventListener("mouseleave", t.onMouseLeave, !1), document.removeEventListener("visibilitychange", t.onVisibilityChange, !1), S(i, "has-autoplay"), e !== Rt && t.emit("stop");
  }
  pause() {
    const t = this;
    t.state === Lt && (t.state = zt, t.clear(), t.emit(zt));
  }
  resume() {
    const t = this,
      e = t.instance;
    if (e.isInfinite || e.page !== e.pages.length - 1) {
      if (t.state !== Lt) {
        if (t.state === zt && !t.inHover) {
          const e = new Event("resume", {
            bubbles: !0,
            cancelable: !0
          });
          t.emit("resume", e), e.defaultPrevented || t.set();
        }
      } else t.set();
    } else t.stop();
  }
  toggle() {
    this.state === Lt || this.state === zt ? this.stop() : this.start();
  }
  attach() {
    const t = this,
      e = t.instance;
    e.on("ready", t.onReady), e.on("Panzoom.startAnimation", t.onChange), e.on("Panzoom.endAnimation", t.onSettle), e.on("Panzoom.touchMove", t.onChange);
  }
  detach() {
    const t = this,
      e = t.instance;
    e.off("ready", t.onReady), e.off("Panzoom.startAnimation", t.onChange), e.off("Panzoom.endAnimation", t.onSettle), e.off("Panzoom.touchMove", t.onChange), t.stop();
  }
}
Object.defineProperty(kt, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {
    autoStart: !0,
    pauseOnHover: !0,
    progressParentEl: null,
    showProgress: !0,
    timeout: 3e3
  }
});
class It extends N {
  constructor() {
    super(...arguments), Object.defineProperty(this, "ref", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    });
  }
  onPrepare(t) {
    const e = t.carousel;
    if (!e) return;
    const i = t.container;
    i && (e.options.Autoplay = u({
      autoStart: !1
    }, this.option("Autoplay") || {}, {
      pauseOnHover: !1,
      timeout: this.option("timeout"),
      progressParentEl: () => this.option("progressParentEl") || null,
      on: {
        start: () => {
          t.emit("startSlideshow");
        },
        set: e => {
          var n;
          i.classList.add("has-slideshow"), (null === (n = t.getSlide()) || void 0 === n ? void 0 : n.state) !== rt.Ready && e.pause();
        },
        stop: () => {
          i.classList.remove("has-slideshow"), t.isCompact || t.endIdle(), t.emit("endSlideshow");
        },
        resume: (e, i) => {
          var n, s, o;
          !i || !i.cancelable || (null === (n = t.getSlide()) || void 0 === n ? void 0 : n.state) === rt.Ready && (null === (o = null === (s = t.carousel) || void 0 === s ? void 0 : s.panzoom) || void 0 === o ? void 0 : o.isResting) || i.preventDefault();
        }
      }
    }), e.attachPlugins({
      Autoplay: kt
    }), this.ref = e.plugins.Autoplay);
  }
  onReady(t) {
    const e = t.carousel,
      i = this.ref;
    i && e && this.option("playOnStart") && (e.isInfinite || e.page < e.pages.length - 1) && i.start();
  }
  onDone(t, e) {
    const i = this.ref,
      n = t.carousel;
    if (!i || !n) return;
    const s = e.panzoom;
    s && s.on("startAnimation", () => {
      t.isCurrentSlide(e) && i.stop();
    }), t.isCurrentSlide(e) && i.resume();
  }
  onKeydown(t, e) {
    var i;
    const n = this.ref;
    n && e === this.option("key") && "BUTTON" !== (null === (i = document.activeElement) || void 0 === i ? void 0 : i.nodeName) && n.toggle();
  }
  attach() {
    const t = this,
      e = t.instance;
    e.on("Carousel.init", t.onPrepare), e.on("Carousel.ready", t.onReady), e.on("done", t.onDone), e.on("keydown", t.onKeydown);
  }
  detach() {
    const t = this,
      e = t.instance;
    e.off("Carousel.init", t.onPrepare), e.off("Carousel.ready", t.onReady), e.off("done", t.onDone), e.off("keydown", t.onKeydown);
  }
}
Object.defineProperty(It, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: {
    key: " ",
    playOnStart: !1,
    progressParentEl: t => {
      var e;
      return (null === (e = t.instance.container) || void 0 === e ? void 0 : e.querySelector(".fancybox__toolbar [data-fancybox-toggle-slideshow]")) || t.instance.container;
    },
    timeout: 3e3
  }
});
const Dt = {
  classes: {
    container: "f-thumbs f-carousel__thumbs",
    viewport: "f-thumbs__viewport",
    track: "f-thumbs__track",
    slide: "f-thumbs__slide",
    isResting: "is-resting",
    isSelected: "is-selected",
    isLoading: "is-loading",
    hasThumbs: "has-thumbs"
  },
  minCount: 2,
  parentEl: null,
  thumbTpl: '<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',
  type: "modern"
};
var Ft;
!function (t) {
  t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Hidden = 2] = "Hidden";
}(Ft || (Ft = {}));
const jt = "isResting",
  Bt = "thumbWidth",
  Ht = "thumbHeight",
  Nt = "thumbClipWidth";
let _t = class extends N {
  constructor() {
    super(...arguments), Object.defineProperty(this, "type", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: "modern"
    }), Object.defineProperty(this, "container", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "track", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "carousel", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "thumbWidth", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    }), Object.defineProperty(this, "thumbClipWidth", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    }), Object.defineProperty(this, "thumbHeight", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    }), Object.defineProperty(this, "thumbGap", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    }), Object.defineProperty(this, "thumbExtraGap", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    }), Object.defineProperty(this, "state", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: Ft.Init
    });
  }
  get isModern() {
    return "modern" === this.type;
  }
  onInitSlide(t, e) {
    const i = e.el ? e.el.dataset : void 0;
    i && (e.thumbSrc = i.thumbSrc || e.thumbSrc || "", e[Nt] = parseFloat(i[Nt] || "") || e[Nt] || 0, e[Ht] = parseFloat(i.thumbHeight || "") || e[Ht] || 0), this.addSlide(e);
  }
  onInitSlides() {
    this.build();
  }
  onChange() {
    var t;
    if (!this.isModern) return;
    const e = this.container,
      i = this.instance,
      n = i.panzoom,
      s = this.carousel,
      a = s ? s.panzoom : null,
      r = i.page;
    if (n && s && a) {
      if (n.isDragging) {
        S(e, this.cn(jt));
        let n = (null === (t = s.pages[r]) || void 0 === t ? void 0 : t.pos) || 0;
        n += i.getProgress(r) * (this[Nt] + this.thumbGap);
        let o = a.getBounds();
        -1 * n > o.x.min && -1 * n < o.x.max && a.panTo({
          x: -1 * n,
          friction: .12
        });
      } else o(e, this.cn(jt), n.isResting);
      this.shiftModern();
    }
  }
  onRefresh() {
    this.updateProps();
    for (const t of this.instance.slides || []) this.resizeModernSlide(t);
    this.shiftModern();
  }
  isDisabled() {
    const t = this.option("minCount") || 0;
    if (t) {
      const e = this.instance;
      let i = 0;
      for (const t of e.slides || []) t.thumbSrc && i++;
      if (i < t) return !0;
    }
    const e = this.option("type");
    return ["modern", "classic"].indexOf(e) < 0;
  }
  getThumb(t) {
    const e = this.option("thumbTpl") || "";
    return {
      html: this.instance.localize(e, [["%i", t.index], ["%d", t.index + 1], ["%s", t.thumbSrc || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"]])
    };
  }
  addSlide(t) {
    const e = this.carousel;
    e && e.addSlide(t.index, this.getThumb(t));
  }
  getSlides() {
    const t = [];
    for (const e of this.instance.slides || []) t.push(this.getThumb(e));
    return t;
  }
  resizeModernSlide(t) {
    this.isModern && (t[Bt] = t[Nt] && t[Ht] ? Math.round(this[Ht] * (t[Nt] / t[Ht])) : this[Bt]);
  }
  updateProps() {
    const t = this.container;
    if (!t) return;
    const e = e => parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-" + e)) || 0;
    this.thumbGap = e("gap"), this.thumbExtraGap = e("extra-gap"), this[Bt] = e("width") || 40, this[Nt] = e("clip-width") || 40, this[Ht] = e("height") || 40;
  }
  build() {
    const t = this;
    if (t.state !== Ft.Init) return;
    if (t.isDisabled()) return void t.emit("disabled");
    const e = t.instance,
      i = e.container,
      n = t.getSlides(),
      s = t.option("type");
    t.type = s;
    const o = t.option("parentEl"),
      a = t.cn("container"),
      r = t.cn("track");
    let l = null == o ? void 0 : o.querySelector("." + a);
    l || (l = document.createElement("div"), P(l, a), o ? o.appendChild(l) : i.after(l)), P(l, `is-${s}`), P(i, t.cn("hasThumbs")), t.container = l, t.updateProps();
    let c = l.querySelector("." + r);
    c || (c = document.createElement("div"), P(c, t.cn("track")), l.appendChild(c)), t.track = c;
    const h = u({}, {
        track: c,
        infinite: !1,
        center: !0,
        fill: "classic" === s,
        dragFree: !0,
        slidesPerPage: 1,
        transition: !1,
        preload: .25,
        friction: .12,
        Panzoom: {
          maxVelocity: 0
        },
        Dots: !1,
        Navigation: !1,
        classes: {
          container: "f-thumbs",
          viewport: "f-thumbs__viewport",
          track: "f-thumbs__track",
          slide: "f-thumbs__slide"
        }
      }, t.option("Carousel") || {}, {
        Sync: {
          target: e
        },
        slides: n
      }),
      d = new e.constructor(l, h);
    d.on("createSlide", (e, i) => {
      t.setProps(i.index), t.emit("createSlide", i, i.el);
    }), d.on("ready", () => {
      t.shiftModern(), t.emit("ready");
    }), d.on("refresh", () => {
      t.shiftModern();
    }), d.on("Panzoom.click", (e, i, n) => {
      t.onClick(n);
    }), t.carousel = d, t.state = Ft.Ready;
  }
  onClick(t) {
    t.preventDefault(), t.stopPropagation();
    const e = this.instance,
      {
        pages: i,
        page: n
      } = e,
      s = t => {
        if (t) {
          const e = t.closest("[data-carousel-index]");
          if (e) return [parseInt(e.dataset.carouselIndex || "", 10) || 0, e];
        }
        return [-1, void 0];
      },
      o = (t, e) => {
        const i = document.elementFromPoint(t, e);
        return i ? s(i) : [-1, void 0];
      };
    let [a, r] = s(t.target);
    if (a > -1) return;
    const l = this[Nt],
      c = t.clientX,
      h = t.clientY;
    let [d, u] = o(c - l, h),
      [p, f] = o(c + l, h);
    u && f ? (a = Math.abs(c - u.getBoundingClientRect().right) < Math.abs(c - f.getBoundingClientRect().left) ? d : p, a === n && (a = a === d ? p : d)) : u ? a = d : f && (a = p), a > -1 && i[a] && e.slideTo(a);
  }
  getShift(t) {
    var e;
    const i = this,
      {
        instance: n
      } = i,
      s = i.carousel;
    if (!n || !s) return 0;
    const o = i[Bt],
      a = i[Nt],
      r = i.thumbGap,
      l = i.thumbExtraGap;
    if (!(null === (e = s.slides[t]) || void 0 === e ? void 0 : e.el)) return 0;
    const c = .5 * (o - a),
      h = n.pages.length - 1;
    let d = n.getProgress(0),
      u = n.getProgress(h),
      p = n.getProgress(t, !1, !0),
      f = 0,
      g = c + l + r;
    const m = d < 0 && d > -1,
      v = u > 0 && u < 1;
    return 0 === t ? (f = g * Math.abs(d), v && 1 === d && (f -= g * Math.abs(u))) : t === h ? (f = g * Math.abs(u) * -1, m && -1 === u && (f += g * Math.abs(d))) : m || v ? (f = -1 * g, f += g * Math.abs(d), f += g * (1 - Math.abs(u))) : f = g * p, f;
  }
  setProps(e) {
    var i;
    const n = this;
    if (!n.isModern) return;
    const {
        instance: s
      } = n,
      o = n.carousel;
    if (s && o) {
      const a = null === (i = o.slides[e]) || void 0 === i ? void 0 : i.el;
      if (a && a.childNodes.length) {
        let i = t(1 - Math.abs(s.getProgress(e))),
          o = t(n.getShift(e));
        a.style.setProperty("--progress", i ? i + "" : ""), a.style.setProperty("--shift", o + "");
      }
    }
  }
  shiftModern() {
    const t = this;
    if (!t.isModern) return;
    const {
        instance: e,
        track: i
      } = t,
      n = e.panzoom,
      s = t.carousel;
    if (!(e && i && n && s)) return;
    if (n.state === m.Init || n.state === m.Destroy) return;
    for (const i of e.slides) t.setProps(i.index);
    let o = (t[Nt] + t.thumbGap) * (s.slides.length || 0);
    i.style.setProperty("--width", o + "");
  }
  cleanup() {
    const t = this;
    t.carousel && t.carousel.destroy(), t.carousel = null, t.container && t.container.remove(), t.container = null, t.track && t.track.remove(), t.track = null, t.state = Ft.Init, S(t.instance.container, t.cn("hasThumbs"));
  }
  attach() {
    const t = this,
      e = t.instance;
    e.on("initSlide", t.onInitSlide), e.state === j.Init ? e.on("initSlides", t.onInitSlides) : t.onInitSlides(), e.on(["change", "Panzoom.afterTransform"], t.onChange), e.on("Panzoom.refresh", t.onRefresh);
  }
  detach() {
    const t = this,
      e = t.instance;
    e.off("initSlide", t.onInitSlide), e.off("initSlides", t.onInitSlides), e.off(["change", "Panzoom.afterTransform"], t.onChange), e.off("Panzoom.refresh", t.onRefresh), t.cleanup();
  }
};
Object.defineProperty(_t, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: Dt
});
const $t = Object.assign(Object.assign({}, Dt), {
    key: "t",
    showOnStart: !0,
    parentEl: null
  }),
  Wt = "is-masked",
  Xt = "aria-hidden";
class qt extends N {
  constructor() {
    super(...arguments), Object.defineProperty(this, "ref", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "hidden", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    });
  }
  get isEnabled() {
    const t = this.ref;
    return t && !t.isDisabled();
  }
  get isHidden() {
    return this.hidden;
  }
  onClick(t, e) {
    e.stopPropagation();
  }
  onCreateSlide(t, e) {
    var i, n, s;
    const o = (null === (s = null === (n = null === (i = this.instance) || void 0 === i ? void 0 : i.carousel) || void 0 === n ? void 0 : n.slides[e.index]) || void 0 === s ? void 0 : s.type) || "",
      a = e.el;
    if (a && o) {
      let t = `for-${o}`;
      ["video", "youtube", "vimeo", "html5video"].includes(o) && (t += " for-video"), P(a, t);
    }
  }
  onInit() {
    var t;
    const e = this,
      i = e.instance,
      n = i.carousel;
    if (e.ref || !n) return;
    const s = e.option("parentEl") || i.footer || i.container;
    if (!s) return;
    const o = u({}, e.options, {
      parentEl: s,
      classes: {
        container: "f-thumbs fancybox__thumbs"
      },
      Carousel: {
        Sync: {
          friction: i.option("Carousel.friction") || 0
        }
      },
      on: {
        ready: t => {
          const i = t.container;
          i && this.hidden && (e.refresh(), i.style.transition = "none", e.hide(), i.offsetHeight, queueMicrotask(() => {
            i.style.transition = "", e.show();
          }));
        }
      }
    });
    o.Carousel = o.Carousel || {}, o.Carousel.on = u((null === (t = e.options.Carousel) || void 0 === t ? void 0 : t.on) || {}, {
      click: this.onClick,
      createSlide: this.onCreateSlide
    }), n.options.Thumbs = o, n.attachPlugins({
      Thumbs: _t
    }), e.ref = n.plugins.Thumbs, e.option("showOnStart") || (e.ref.state = Ft.Hidden, e.hidden = !0);
  }
  onResize() {
    var t;
    const e = null === (t = this.ref) || void 0 === t ? void 0 : t.container;
    e && (e.style.maxHeight = "");
  }
  onKeydown(t, e) {
    const i = this.option("key");
    i && i === e && this.toggle();
  }
  toggle() {
    const t = this.ref;
    if (t && !t.isDisabled()) return t.state === Ft.Hidden ? (t.state = Ft.Init, void t.build()) : void (this.hidden ? this.show() : this.hide());
  }
  show() {
    const t = this.ref;
    if (!t || t.isDisabled()) return;
    const e = t.container;
    e && (this.refresh(), e.offsetHeight, e.removeAttribute(Xt), e.classList.remove(Wt), this.hidden = !1);
  }
  hide() {
    const t = this.ref,
      e = t && t.container;
    e && (this.refresh(), e.offsetHeight, e.classList.add(Wt), e.setAttribute(Xt, "true")), this.hidden = !0;
  }
  refresh() {
    const t = this.ref;
    if (!t || !t.state) return;
    const e = t.container,
      i = (null == e ? void 0 : e.firstChild) || null;
    e && i && i.childNodes.length && (e.style.maxHeight = `${i.getBoundingClientRect().height}px`);
  }
  attach() {
    const t = this,
      e = t.instance;
    e.state === at.Init ? e.on("Carousel.init", t.onInit) : t.onInit(), e.on("resize", t.onResize), e.on("keydown", t.onKeydown);
  }
  detach() {
    var t;
    const e = this,
      i = e.instance;
    i.off("Carousel.init", e.onInit), i.off("resize", e.onResize), i.off("keydown", e.onKeydown), null === (t = i.carousel) || void 0 === t || t.detachPlugins(["Thumbs"]), e.ref = null;
  }
}
Object.defineProperty(qt, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: $t
});
const Yt = {
  panLeft: {
    icon: '<svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>',
    change: {
      panX: -100
    }
  },
  panRight: {
    icon: '<svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg>',
    change: {
      panX: 100
    }
  },
  panUp: {
    icon: '<svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg>',
    change: {
      panY: -100
    }
  },
  panDown: {
    icon: '<svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg>',
    change: {
      panY: 100
    }
  },
  zoomIn: {
    icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>',
    action: "zoomIn"
  },
  zoomOut: {
    icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
    action: "zoomOut"
  },
  toggle1to1: {
    icon: '<svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg>',
    action: "toggleZoom"
  },
  toggleZoom: {
    icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
    action: "toggleZoom"
  },
  iterateZoom: {
    icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
    action: "iterateZoom"
  },
  rotateCCW: {
    icon: '<svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg>',
    action: "rotateCCW"
  },
  rotateCW: {
    icon: '<svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg>',
    action: "rotateCW"
  },
  flipX: {
    icon: '<svg style="stroke-width: 1.3"><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg>',
    action: "flipX"
  },
  flipY: {
    icon: '<svg style="stroke-width: 1.3"><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg>',
    action: "flipY"
  },
  fitX: {
    icon: '<svg><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3"/></svg>',
    action: "fitX"
  },
  fitY: {
    icon: '<svg><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6M18 14v7M18 3v7M15 18l3 3 3-3M15 6l3-3 3 3"/></svg>',
    action: "fitY"
  },
  reset: {
    icon: '<svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>',
    action: "reset"
  },
  toggleFS: {
    icon: '<svg><g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g></svg>',
    action: "toggleFS"
  }
};
var Vt;
!function (t) {
  t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Disabled = 2] = "Disabled";
}(Vt || (Vt = {}));
const Zt = {
    absolute: "auto",
    display: {
      left: ["infobar"],
      middle: [],
      right: ["iterateZoom", "slideshow", "fullscreen", "thumbs", "close"]
    },
    enabled: "auto",
    items: {
      infobar: {
        tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>'
      },
      download: {
        tpl: '<a class="f-button" title="{{DOWNLOAD}}" data-fancybox-download href="javasript:;"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></a>'
      },
      prev: {
        tpl: '<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg><path d="m15 6-6 6 6 6"/></svg></button>'
      },
      next: {
        tpl: '<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg><path d="m9 6 6 6-6 6"/></svg></button>'
      },
      slideshow: {
        tpl: '<button class="f-button" title="{{TOGGLE_SLIDESHOW}}" data-fancybox-toggle-slideshow><svg><g><path d="M8 4v16l13 -8z"></path></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>'
      },
      fullscreen: {
        tpl: '<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg><g><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>'
      },
      thumbs: {
        tpl: '<button class="f-button" title="{{TOGGLE_THUMBS}}" data-fancybox-toggle-thumbs><svg><circle cx="5.5" cy="5.5" r="1"/><circle cx="12" cy="5.5" r="1"/><circle cx="18.5" cy="5.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><circle cx="5.5" cy="18.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="18.5" cy="18.5" r="1"/></svg></button>'
      },
      close: {
        tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="m19.5 4.5-15 15M4.5 4.5l15 15"/></svg></button>'
      }
    },
    parentEl: null
  },
  Ut = {
    tabindex: "-1",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    xmlns: "http://www.w3.org/2000/svg"
  },
  Gt = "has-toolbar",
  Kt = "fancybox__toolbar";
class Jt extends N {
  constructor() {
    super(...arguments), Object.defineProperty(this, "state", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: Vt.Init
    }), Object.defineProperty(this, "container", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    });
  }
  onReady(t) {
    var e;
    if (!t.carousel) return;
    let i = this.option("display"),
      n = this.option("absolute"),
      s = this.option("enabled");
    if ("auto" === s) {
      const t = this.instance.carousel;
      let e = 0;
      if (t) for (const i of t.slides) (i.panzoom || "image" === i.type) && e++;
      e || (s = !1);
    }
    s || (i = void 0);
    let o = 0;
    const a = {
      left: [],
      middle: [],
      right: []
    };
    if (i) for (const t of ["left", "middle", "right"]) for (const n of i[t]) {
      const i = this.createEl(n);
      i && (null === (e = a[t]) || void 0 === e || e.push(i), o++);
    }
    let r = null;
    if (o && (r = this.createContainer()), r) {
      for (const [t, e] of Object.entries(a)) {
        const i = document.createElement("div");
        P(i, Kt + "__column is-" + t);
        for (const t of e) i.appendChild(t);
        "auto" !== n || "middle" !== t || e.length || (n = !0), r.appendChild(i);
      }
      !0 === n && P(r, "is-absolute"), this.state = Vt.Ready, this.onRefresh();
    } else this.state = Vt.Disabled;
  }
  onClick(t) {
    var e, i;
    const n = this.instance,
      s = n.getSlide(),
      o = null == s ? void 0 : s.panzoom,
      a = t.target,
      r = a && E(a) ? a.dataset : null;
    if (!r) return;
    if (void 0 !== r.fancyboxToggleThumbs) return t.preventDefault(), t.stopPropagation(), void (null === (e = n.plugins.Thumbs) || void 0 === e || e.toggle());
    if (void 0 !== r.fancyboxToggleFullscreen) return t.preventDefault(), t.stopPropagation(), void this.instance.toggleFullscreen();
    if (void 0 !== r.fancyboxToggleSlideshow) {
      t.preventDefault(), t.stopPropagation();
      const e = null === (i = n.carousel) || void 0 === i ? void 0 : i.plugins.Autoplay;
      let s = e.isActive;
      return o && "mousemove" === o.panMode && !s && o.reset(), void (s ? e.stop() : e.start());
    }
    const l = r.panzoomAction,
      c = r.panzoomChange;
    if ((c || l) && (t.preventDefault(), t.stopPropagation()), c) {
      let t = {};
      try {
        t = JSON.parse(c);
      } catch (t) {}
      o && o.applyChange(t);
    } else l && o && o[l] && o[l]();
  }
  onChange() {
    this.onRefresh();
  }
  onRefresh() {
    if (this.instance.isClosing()) return;
    const t = this.container;
    if (!t) return;
    const e = this.instance.getSlide();
    if (!e || e.state !== rt.Ready) return;
    const i = e && !e.error && e.panzoom;
    for (const e of t.querySelectorAll("[data-panzoom-action]")) i ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
    let n = i && i.canZoomIn(),
      s = i && i.canZoomOut();
    for (const e of t.querySelectorAll('[data-panzoom-action="zoomIn"]')) n ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
    for (const e of t.querySelectorAll('[data-panzoom-action="zoomOut"]')) s ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
    for (const e of t.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
      s || n ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
      const t = e.querySelector("g");
      t && (t.style.display = n ? "" : "none");
    }
  }
  onDone(t, e) {
    var i;
    null === (i = e.panzoom) || void 0 === i || i.on("afterTransform", () => {
      this.instance.isCurrentSlide(e) && this.onRefresh();
    }), this.instance.isCurrentSlide(e) && this.onRefresh();
  }
  createContainer() {
    const t = this.instance.container;
    if (!t) return null;
    const e = this.option("parentEl") || t;
    let i = e.querySelector("." + Kt);
    return i || (i = document.createElement("div"), P(i, Kt), e.prepend(i)), i.addEventListener("click", this.onClick, {
      passive: !1,
      capture: !0
    }), t && P(t, Gt), this.container = i, i;
  }
  createEl(t) {
    const e = this.instance,
      i = e.carousel;
    if (!i) return null;
    if ("toggleFS" === t) return null;
    if ("fullscreen" === t && !st()) return null;
    let s = null;
    const o = i.slides.length || 0;
    let a = 0,
      r = 0;
    for (const t of i.slides) (t.panzoom || "image" === t.type) && a++, ("image" === t.type || t.downloadSrc) && r++;
    if (o < 2 && ["infobar", "prev", "next"].includes(t)) return s;
    if (void 0 !== Yt[t] && !a) return null;
    if ("download" === t && !r) return null;
    if ("thumbs" === t) {
      const t = e.plugins.Thumbs;
      if (!t || !t.isEnabled) return null;
    }
    if ("slideshow" === t) {
      if (!i.plugins.Autoplay || o < 2) return null;
    }
    if (void 0 !== Yt[t]) {
      const e = Yt[t];
      s = document.createElement("button"), s.setAttribute("title", this.instance.localize(`{{${t.toUpperCase()}}}`)), P(s, "f-button"), e.action && (s.dataset.panzoomAction = e.action), e.change && (s.dataset.panzoomChange = JSON.stringify(e.change)), s.appendChild(n(this.instance.localize(e.icon)));
    } else {
      const e = (this.option("items") || [])[t];
      e && (s = n(this.instance.localize(e.tpl)), "function" == typeof e.click && s.addEventListener("click", t => {
        t.preventDefault(), t.stopPropagation(), "function" == typeof e.click && e.click.call(this, this, t);
      }));
    }
    const l = null == s ? void 0 : s.querySelector("svg");
    if (l) for (const [t, e] of Object.entries(Ut)) l.getAttribute(t) || l.setAttribute(t, String(e));
    return s;
  }
  removeContainer() {
    const t = this.container;
    t && t.remove(), this.container = null, this.state = Vt.Disabled;
    const e = this.instance.container;
    e && S(e, Gt);
  }
  attach() {
    const t = this,
      e = t.instance;
    e.on("Carousel.initSlides", t.onReady), e.on("done", t.onDone), e.on(["reveal", "Carousel.change"], t.onChange), t.onReady(t.instance);
  }
  detach() {
    const t = this,
      e = t.instance;
    e.off("Carousel.initSlides", t.onReady), e.off("done", t.onDone), e.off(["reveal", "Carousel.change"], t.onChange), t.removeContainer();
  }
}
Object.defineProperty(Jt, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: Zt
});
const Qt = {
    Hash: class extends N {
      onReady() {
        ct = !1;
      }
      onChange(t) {
        dt && clearTimeout(dt);
        const {
            hash: e
          } = ut(),
          {
            hash: i
          } = pt(),
          n = t.isOpeningSlide(t.getSlide());
        n && (lt = i === e ? "" : i), e && e !== i && (dt = setTimeout(() => {
          try {
            if (t.state === at.Ready) {
              let t = "replaceState";
              n && !ht && (t = "pushState", ht = !0), window.history[t]({}, document.title, window.location.pathname + window.location.search + e);
            }
          } catch (t) {}
        }, 300));
      }
      onClose(t) {
        if (dt && clearTimeout(dt), !ct && ht) return ht = !1, ct = !1, void window.history.back();
        if (!ct) try {
          window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (lt || ""));
        } catch (t) {}
      }
      attach() {
        const t = this.instance;
        t.on("ready", this.onReady), t.on(["Carousel.ready", "Carousel.change"], this.onChange), t.on("close", this.onClose);
      }
      detach() {
        const t = this.instance;
        t.off("ready", this.onReady), t.off(["Carousel.ready", "Carousel.change"], this.onChange), t.off("close", this.onClose);
      }
      static parseURL() {
        return pt();
      }
      static startFromUrl() {
        ft();
      }
      static destroy() {
        window.removeEventListener("hashchange", mt, !1);
      }
    },
    Html: At,
    Images: yt,
    Slideshow: It,
    Thumbs: qt,
    Toolbar: Jt
  },
  te = "with-fancybox",
  ee = "hide-scrollbar",
  ie = "--fancybox-scrollbar-compensate",
  ne = "--fancybox-body-margin",
  se = "aria-hidden",
  oe = "is-using-tab",
  ae = "is-animated",
  re = "is-compact",
  le = "is-loading",
  ce = "is-opening",
  he = "has-caption",
  de = "disabled",
  ue = "tabindex",
  pe = "download",
  fe = "href",
  ge = "src",
  me = t => "string" == typeof t,
  ve = function () {
    var t = window.getSelection();
    return !!t && "Range" === t.type;
  };
let be,
  ye = null,
  we = null,
  xe = 0,
  Ee = 0;
const Se = new Map();
let Pe = 0;
class Ce extends g {
  get isIdle() {
    return this.idle;
  }
  get isCompact() {
    return this.option("compact");
  }
  constructor(t = [], e = {}, i = {}) {
    super(e), Object.defineProperty(this, "userSlides", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: []
    }), Object.defineProperty(this, "userPlugins", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: {}
    }), Object.defineProperty(this, "idle", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "idleTimer", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "clickTimer", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "pwt", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    }), Object.defineProperty(this, "ignoreFocusChange", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "startedFs", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: !1
    }), Object.defineProperty(this, "state", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: at.Init
    }), Object.defineProperty(this, "id", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: 0
    }), Object.defineProperty(this, "container", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "caption", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "footer", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "carousel", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "lastFocus", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: null
    }), Object.defineProperty(this, "prevMouseMoveEvent", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: void 0
    }), be || (be = st()), this.id = e.id || ++Pe, Se.set(this.id, this), this.userSlides = t, this.userPlugins = i, queueMicrotask(() => {
      this.init();
    });
  }
  init() {
    if (this.state === at.Destroy) return;
    this.state = at.Init, this.attachPlugins(Object.assign(Object.assign({}, Ce.Plugins), this.userPlugins)), this.emit("init"), this.emit("attachPlugins"), !0 === this.option("hideScrollbar") && (() => {
      if (!tt) return;
      const t = document,
        e = t.body,
        i = t.documentElement;
      if (e.classList.contains(ee)) return;
      let n = window.innerWidth - i.getBoundingClientRect().width;
      const s = parseFloat(window.getComputedStyle(e).marginRight);
      n < 0 && (n = 0), i.style.setProperty(ie, `${n}px`), s && e.style.setProperty(ne, `${s}px`), e.classList.add(ee);
    })(), this.initLayout(), this.scale();
    const t = () => {
      this.initCarousel(this.userSlides), this.state = at.Ready, this.attachEvents(), this.emit("ready"), setTimeout(() => {
        this.container && this.container.setAttribute(se, "false");
      }, 16);
    };
    this.option("Fullscreen.autoStart") && be && !be.isFullscreen() ? be.request().then(() => {
      this.startedFs = !0, t();
    }).catch(() => t()) : t();
  }
  initLayout() {
    var t, e;
    const i = this.option("parentEl") || document.body,
      s = n(this.localize(this.option("tpl.main") || ""));
    s && (s.setAttribute("id", `fancybox-${this.id}`), s.setAttribute("aria-label", this.localize("{{MODAL}}")), s.classList.toggle(re, this.isCompact), P(s, this.option("mainClass") || ""), P(s, ce), this.container = s, this.footer = s.querySelector(".fancybox__footer"), i.appendChild(s), P(document.documentElement, te), ye && we || (ye = document.createElement("span"), P(ye, "fancybox-focus-guard"), ye.setAttribute(ue, "0"), ye.setAttribute(se, "true"), ye.setAttribute("aria-label", "Focus guard"), we = ye.cloneNode(), null === (t = s.parentElement) || void 0 === t || t.insertBefore(ye, s), null === (e = s.parentElement) || void 0 === e || e.append(we)), s.addEventListener("mousedown", t => {
      xe = t.pageX, Ee = t.pageY, S(s, oe);
    }), this.option("animated") && (P(s, ae), setTimeout(() => {
      this.isClosing() || S(s, ae);
    }, 350)), this.emit("initLayout"));
  }
  initCarousel(t) {
    const i = this.container;
    if (!i) return;
    const n = i.querySelector(".fancybox__carousel");
    if (!n) return;
    const s = this.carousel = new J(n, u({}, {
      slides: t,
      transition: "fade",
      Panzoom: {
        lockAxis: this.option("dragToClose") ? "xy" : "x",
        infinite: !!this.option("dragToClose") && "y"
      },
      Dots: !1,
      Navigation: {
        classes: {
          container: "fancybox__nav",
          button: "f-button",
          isNext: "is-next",
          isPrev: "is-prev"
        }
      },
      initialPage: this.option("startIndex"),
      l10n: this.option("l10n")
    }, this.option("Carousel") || {}));
    s.on("*", (t, e, ...i) => {
      this.emit(`Carousel.${e}`, t, ...i);
    }), s.on(["ready", "change"], () => {
      this.manageCaption();
    }), this.on("Carousel.removeSlide", (t, e, i) => {
      this.clearContent(i), i.state = void 0;
    }), s.on("Panzoom.touchStart", () => {
      var t, e;
      this.isCompact || this.endIdle(), (null === (t = document.activeElement) || void 0 === t ? void 0 : t.closest(".f-thumbs")) && (null === (e = this.container) || void 0 === e || e.focus());
    }), s.on("settle", () => {
      this.idleTimer || this.isCompact || !this.option("idle") || this.setIdle(), this.option("autoFocus") && !this.isClosing && this.checkFocus();
    }), this.option("dragToClose") && (s.on("Panzoom.afterTransform", (t, i) => {
      const n = this.getSlide();
      if (n && e(n.el)) return;
      const s = this.container;
      if (s) {
        const t = Math.abs(i.current.f),
          e = t < 1 ? "" : Math.max(.5, Math.min(1, 1 - t / i.contentRect.fitHeight * 1.5));
        s.style.setProperty("--fancybox-ts", e ? "0s" : ""), s.style.setProperty("--fancybox-opacity", e + "");
      }
    }), s.on("Panzoom.touchEnd", (t, i, n) => {
      var s;
      const o = this.getSlide();
      if (o && e(o.el)) return;
      if (i.isMobile && document.activeElement && -1 !== ["TEXTAREA", "INPUT"].indexOf(null === (s = document.activeElement) || void 0 === s ? void 0 : s.nodeName)) return;
      const a = Math.abs(i.dragOffset.y);
      "y" === i.lockedAxis && (a >= 200 || a >= 50 && i.dragOffset.time < 300) && (n && n.cancelable && n.preventDefault(), this.close(n, "f-throwOut" + (i.current.f < 0 ? "Up" : "Down")));
    })), s.on("change", t => {
      var e;
      let i = null === (e = this.getSlide()) || void 0 === e ? void 0 : e.triggerEl;
      if (i) {
        const e = new CustomEvent("slideTo", {
          bubbles: !0,
          cancelable: !0,
          detail: t.page
        });
        i.dispatchEvent(e);
      }
    }), s.on(["refresh", "change"], t => {
      const e = this.container;
      if (!e) return;
      for (const i of e.querySelectorAll("[data-fancybox-current-index]")) i.innerHTML = t.page + 1;
      for (const i of e.querySelectorAll("[data-fancybox-count]")) i.innerHTML = t.pages.length;
      if (!t.isInfinite) {
        for (const i of e.querySelectorAll("[data-fancybox-next]")) t.page < t.pages.length - 1 ? (i.removeAttribute(de), i.removeAttribute(ue)) : (i.setAttribute(de, ""), i.setAttribute(ue, "-1"));
        for (const i of e.querySelectorAll("[data-fancybox-prev]")) t.page > 0 ? (i.removeAttribute(de), i.removeAttribute(ue)) : (i.setAttribute(de, ""), i.setAttribute(ue, "-1"));
      }
      const i = this.getSlide();
      if (!i) return;
      let n = i.downloadSrc || "";
      n || "image" !== i.type || i.error || !me(i[ge]) || (n = i[ge]);
      for (const t of e.querySelectorAll("[data-fancybox-download]")) {
        const e = i.downloadFilename;
        n ? (t.removeAttribute(de), t.removeAttribute(ue), t.setAttribute(fe, n), t.setAttribute(pe, e || n), t.setAttribute("target", "_blank")) : (t.setAttribute(de, ""), t.setAttribute(ue, "-1"), t.removeAttribute(fe), t.removeAttribute(pe));
      }
    }), this.emit("initCarousel");
  }
  attachEvents() {
    const t = this,
      e = t.container;
    if (!e) return;
    e.addEventListener("click", t.onClick, {
      passive: !1,
      capture: !1
    }), e.addEventListener("wheel", t.onWheel, {
      passive: !1,
      capture: !1
    }), document.addEventListener("keydown", t.onKeydown, {
      passive: !1,
      capture: !0
    }), document.addEventListener("visibilitychange", t.onVisibilityChange, !1), document.addEventListener("mousemove", t.onMousemove), t.option("trapFocus") && document.addEventListener("focus", t.onFocus, !0), window.addEventListener("resize", t.onResize);
    const i = window.visualViewport;
    i && (i.addEventListener("scroll", t.onResize), i.addEventListener("resize", t.onResize));
  }
  detachEvents() {
    const t = this,
      e = t.container;
    if (!e) return;
    document.removeEventListener("keydown", t.onKeydown, {
      passive: !1,
      capture: !0
    }), e.removeEventListener("wheel", t.onWheel, {
      passive: !1,
      capture: !1
    }), e.removeEventListener("click", t.onClick, {
      passive: !1,
      capture: !1
    }), document.removeEventListener("mousemove", t.onMousemove), window.removeEventListener("resize", t.onResize);
    const i = window.visualViewport;
    i && (i.removeEventListener("resize", t.onResize), i.removeEventListener("scroll", t.onResize)), document.removeEventListener("visibilitychange", t.onVisibilityChange, !1), document.removeEventListener("focus", t.onFocus, !0);
  }
  scale() {
    const t = this.container;
    if (!t) return;
    const e = window.visualViewport,
      i = Math.max(1, (null == e ? void 0 : e.scale) || 1);
    let n = "",
      s = "",
      o = "";
    if (e && i > 1) {
      let t = `${e.offsetLeft}px`,
        a = `${e.offsetTop}px`;
      n = e.width * i + "px", s = e.height * i + "px", o = `translate3d(${t}, ${a}, 0) scale(${1 / i})`;
    }
    t.style.transform = o, t.style.width = n, t.style.height = s;
  }
  onClick(t) {
    var e;
    const {
      container: i,
      isCompact: n
    } = this;
    if (!i || this.isClosing()) return;
    !n && this.option("idle") && this.resetIdle();
    const s = t.composedPath()[0];
    if (s.closest(".fancybox-spinner") || s.closest("[data-fancybox-close]")) return t.preventDefault(), void this.close(t);
    if (s.closest("[data-fancybox-prev]")) return t.preventDefault(), void this.prev();
    if (s.closest("[data-fancybox-next]")) return t.preventDefault(), void this.next();
    if ("click" === t.type && 0 === t.detail) return;
    if (Math.abs(t.pageX - xe) > 30 || Math.abs(t.pageY - Ee) > 30) return;
    const o = document.activeElement;
    if (ve() && o && i.contains(o)) return;
    if (n && "image" === (null === (e = this.getSlide()) || void 0 === e ? void 0 : e.type)) return void (this.clickTimer ? (clearTimeout(this.clickTimer), this.clickTimer = null) : this.clickTimer = setTimeout(() => {
      this.toggleIdle(), this.clickTimer = null;
    }, 350));
    if (this.emit("click", t), t.defaultPrevented) return;
    let a = !1;
    if (s.closest(".fancybox__content")) {
      if (o) {
        if (o.closest("[contenteditable]")) return;
        s.matches(it) || o.blur();
      }
      if (ve()) return;
      a = this.option("contentClick");
    } else s.closest(".fancybox__carousel") && !s.matches(it) && (a = this.option("backdropClick"));
    "close" === a ? (t.preventDefault(), this.close(t)) : "next" === a ? (t.preventDefault(), this.next()) : "prev" === a && (t.preventDefault(), this.prev());
  }
  onWheel(t) {
    const e = t.target;
    let n = this.option("wheel", t);
    e.closest(".fancybox__thumbs") && (n = "slide");
    const s = "slide" === n,
      o = [-t.deltaX || 0, -t.deltaY || 0, -t.detail || 0].reduce(function (t, e) {
        return Math.abs(e) > Math.abs(t) ? e : t;
      }),
      a = Math.max(-1, Math.min(1, o)),
      r = Date.now();
    this.pwt && r - this.pwt < 300 ? s && t.preventDefault() : (this.pwt = r, this.emit("wheel", t, a), t.defaultPrevented || ("close" === n ? (t.preventDefault(), this.close(t)) : "slide" === n && (i(e) || (t.preventDefault(), this[a > 0 ? "prev" : "next"]()))));
  }
  onKeydown(t) {
    if (!this.isTopmost()) return;
    this.isCompact || !this.option("idle") || this.isClosing() || this.resetIdle();
    const e = t.key,
      i = this.option("keyboard");
    if (!i) return;
    const n = t.composedPath()[0],
      s = document.activeElement && document.activeElement.classList,
      o = s && s.contains("f-button") || n.dataset.carouselPage || n.dataset.carouselIndex;
    if ("Escape" !== e && !o && E(n)) {
      if (n.isContentEditable || -1 !== ["TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(n.nodeName)) return;
    }
    if ("Tab" === t.key ? P(this.container, oe) : S(this.container, oe), t.ctrlKey || t.altKey || t.shiftKey) return;
    this.emit("keydown", e, t);
    const a = i[e];
    a && "function" == typeof this[a] && (t.preventDefault(), this[a]());
  }
  onResize() {
    const t = this.container;
    if (!t) return;
    const e = this.isCompact;
    t.classList.toggle(re, e), this.manageCaption(this.getSlide()), this.isCompact ? this.clearIdle() : this.endIdle(), this.scale(), this.emit("resize");
  }
  onFocus(t) {
    this.isTopmost() && this.checkFocus(t);
  }
  onMousemove(t) {
    this.prevMouseMoveEvent = t, !this.isCompact && this.option("idle") && this.resetIdle();
  }
  onVisibilityChange() {
    "visible" === document.visibilityState ? this.checkFocus() : this.endIdle();
  }
  manageCloseBtn(t) {
    const e = this.optionFor(t, "closeButton") || !1;
    if ("auto" === e) {
      const t = this.plugins.Toolbar;
      if (t && t.state === Vt.Ready) return;
    }
    if (!e) return;
    if (!t.contentEl || t.closeBtnEl) return;
    const i = this.option("tpl.closeButton");
    if (i) {
      const e = n(this.localize(i));
      t.closeBtnEl = t.contentEl.appendChild(e), t.el && P(t.el, "has-close-btn");
    }
  }
  manageCaption(t = void 0) {
    var e, i;
    const n = "fancybox__caption",
      s = this.container;
    if (!s) return;
    S(s, he);
    const o = this.isCompact || this.option("commonCaption"),
      a = !o;
    if (this.caption && this.stop(this.caption), a && this.caption && (this.caption.remove(), this.caption = null), o && !this.caption) for (const t of (null === (e = this.carousel) || void 0 === e ? void 0 : e.slides) || []) t.captionEl && (t.captionEl.remove(), t.captionEl = void 0, S(t.el, he), null === (i = t.el) || void 0 === i || i.removeAttribute("aria-labelledby"));
    if (t || (t = this.getSlide()), !t || o && !this.isCurrentSlide(t)) return;
    const r = t.el;
    let l = this.optionFor(t, "caption", "");
    if (!l) return void (o && this.caption && this.animate(this.caption, "f-fadeOut", () => {
      this.caption && (this.caption.innerHTML = "");
    }));
    let c = null;
    if (a) {
      if (c = t.captionEl || null, r && !c) {
        const e = n + `_${this.id}_${t.index}`;
        c = document.createElement("div"), P(c, n), c.setAttribute("id", e), t.captionEl = r.appendChild(c), P(r, he), r.setAttribute("aria-labelledby", e);
      }
    } else {
      if (c = this.caption, c || (c = s.querySelector("." + n)), !c) {
        c = document.createElement("div"), c.dataset.fancyboxCaption = "", P(c, n);
        (this.footer || s).prepend(c);
      }
      P(s, he), this.caption = c;
    }
    c && (c.innerHTML = "", me(l) || "number" == typeof l ? c.innerHTML = l + "" : l instanceof HTMLElement && c.appendChild(l));
  }
  checkFocus(t) {
    this.focus(t);
  }
  focus(t) {
    var e;
    if (this.ignoreFocusChange) return;
    const i = document.activeElement || null,
      n = (null == t ? void 0 : t.target) || null,
      s = this.container,
      o = null === (e = this.carousel) || void 0 === e ? void 0 : e.viewport;
    if (!s || !o) return;
    if (!t && i && s.contains(i)) return;
    const a = this.getSlide(),
      r = a && a.state === rt.Ready ? a.el : null;
    if (!r || r.contains(i) || s === i) return;
    t && t.cancelable && t.preventDefault(), this.ignoreFocusChange = !0;
    const l = Array.from(s.querySelectorAll(it));
    let c = [],
      h = null;
    for (let t of l) {
      const e = !t.offsetParent || !!t.closest('[aria-hidden="true"]'),
        i = r && r.contains(t),
        n = !o.contains(t);
      if (t === s || (i || n) && !e) {
        c.push(t);
        const e = t.dataset.origTabindex;
        void 0 !== e && e && (t.tabIndex = parseFloat(e)), t.removeAttribute("data-orig-tabindex"), !t.hasAttribute("autoFocus") && h || (h = t);
      } else {
        const e = void 0 === t.dataset.origTabindex ? t.getAttribute("tabindex") || "" : t.dataset.origTabindex;
        e && (t.dataset.origTabindex = e), t.tabIndex = -1;
      }
    }
    let d = null;
    t ? (!n || c.indexOf(n) < 0) && (d = h || s, c.length && (i === we ? d = c[0] : this.lastFocus !== s && i !== ye || (d = c[c.length - 1]))) : d = a && "image" === a.type ? s : h || s, d && nt(d), this.lastFocus = document.activeElement, this.ignoreFocusChange = !1;
  }
  next() {
    const t = this.carousel;
    t && t.pages.length > 1 && t.slideNext();
  }
  prev() {
    const t = this.carousel;
    t && t.pages.length > 1 && t.slidePrev();
  }
  jumpTo(...t) {
    this.carousel && this.carousel.slideTo(...t);
  }
  isTopmost() {
    var t;
    return (null === (t = Ce.getInstance()) || void 0 === t ? void 0 : t.id) == this.id;
  }
  animate(t = null, e = "", i) {
    if (!t || !e) return void (i && i());
    this.stop(t);
    const n = s => {
      s.target === t && t.dataset.animationName && (t.removeEventListener("animationend", n), delete t.dataset.animationName, i && i(), S(t, e));
    };
    t.dataset.animationName = e, t.addEventListener("animationend", n), P(t, e);
  }
  stop(t) {
    t && t.dispatchEvent(new CustomEvent("animationend", {
      bubbles: !1,
      cancelable: !0,
      currentTarget: t
    }));
  }
  setContent(t, e = "", i = !0) {
    if (this.isClosing()) return;
    const s = t.el;
    if (!s) return;
    let o = null;
    if (E(e) ? o = e : (o = n(e + ""), E(o) || (o = document.createElement("div"), o.innerHTML = e + "")), ["img", "picture", "iframe", "video", "audio"].includes(o.nodeName.toLowerCase())) {
      const t = document.createElement("div");
      t.appendChild(o), o = t;
    }
    E(o) && t.filter && !t.error && (o = o.querySelector(t.filter)), o && E(o) ? (P(o, "fancybox__content"), t.id && o.setAttribute("id", t.id), "none" !== o.style.display && "none" !== getComputedStyle(o).getPropertyValue("display") || (o.style.display = t.display || this.option("defaultDisplay") || "flex"), s.classList.add(`has-${t.error ? "error" : t.type || "unknown"}`), s.prepend(o), t.contentEl = o, i && this.revealContent(t), this.manageCloseBtn(t), this.manageCaption(t)) : this.setError(t, "{{ELEMENT_NOT_FOUND}}");
  }
  revealContent(t, e) {
    const i = t.el,
      n = t.contentEl;
    i && n && (this.emit("reveal", t), this.hideLoading(t), t.state = rt.Opening, (e = this.isOpeningSlide(t) ? void 0 === e ? this.optionFor(t, "showClass") : e : "f-fadeIn") ? this.animate(n, e, () => {
      this.done(t);
    }) : this.done(t));
  }
  done(t) {
    this.isClosing() || (t.state = rt.Ready, this.emit("done", t), P(t.el, "is-done"), this.isCurrentSlide(t) && this.option("autoFocus") && queueMicrotask(() => {
      var e;
      null === (e = t.panzoom) || void 0 === e || e.updateControls(), this.option("autoFocus") && this.focus();
    }), this.isOpeningSlide(t) && (S(this.container, ce), !this.isCompact && this.option("idle") && this.setIdle()));
  }
  isCurrentSlide(t) {
    const e = this.getSlide();
    return !(!t || !e) && e.index === t.index;
  }
  isOpeningSlide(t) {
    var e, i;
    return null === (null === (e = this.carousel) || void 0 === e ? void 0 : e.prevPage) && t && t.index === (null === (i = this.getSlide()) || void 0 === i ? void 0 : i.index);
  }
  showLoading(t) {
    t.state = rt.Loading;
    const e = t.el;
    if (!e) return;
    P(e, le), this.emit("loading", t), t.spinnerEl || setTimeout(() => {
      if (!this.isClosing() && !t.spinnerEl && t.state === rt.Loading) {
        let i = n(x);
        P(i, "fancybox-spinner"), t.spinnerEl = i, e.prepend(i), this.animate(i, "f-fadeIn");
      }
    }, 250);
  }
  hideLoading(t) {
    const e = t.el;
    if (!e) return;
    const i = t.spinnerEl;
    this.isClosing() ? null == i || i.remove() : (S(e, le), i && this.animate(i, "f-fadeOut", () => {
      i.remove();
    }), t.state === rt.Loading && (this.emit("loaded", t), t.state = rt.Ready));
  }
  setError(t, e) {
    if (this.isClosing()) return;
    const i = new Event("error", {
      bubbles: !0,
      cancelable: !0
    });
    if (this.emit("error", i, t), i.defaultPrevented) return;
    t.error = e, this.hideLoading(t), this.clearContent(t);
    const n = document.createElement("div");
    n.classList.add("fancybox-error"), n.innerHTML = this.localize(e || "<p>{{ERROR}}</p>"), this.setContent(t, n);
  }
  clearContent(t) {
    if (void 0 === t.state) return;
    this.emit("clearContent", t), t.contentEl && (t.contentEl.remove(), t.contentEl = void 0);
    const e = t.el;
    e && (S(e, "has-error"), S(e, "has-unknown"), S(e, `has-${t.type || "unknown"}`)), t.closeBtnEl && t.closeBtnEl.remove(), t.closeBtnEl = void 0, t.captionEl && t.captionEl.remove(), t.captionEl = void 0, t.spinnerEl && t.spinnerEl.remove(), t.spinnerEl = void 0;
  }
  getSlide() {
    var t;
    const e = this.carousel;
    return (null === (t = null == e ? void 0 : e.pages[null == e ? void 0 : e.page]) || void 0 === t ? void 0 : t.slides[0]) || void 0;
  }
  close(t, e) {
    if (this.isClosing()) return;
    const i = new Event("shouldClose", {
      bubbles: !0,
      cancelable: !0
    });
    if (this.emit("shouldClose", i, t), i.defaultPrevented) return;
    t && t.cancelable && (t.preventDefault(), t.stopPropagation());
    const n = () => {
      this.proceedClose(t, e);
    };
    this.startedFs && be && be.isFullscreen() ? Promise.resolve(be.exit()).then(() => n()) : n();
  }
  clearIdle() {
    this.idleTimer && clearTimeout(this.idleTimer), this.idleTimer = null;
  }
  setIdle(t = !1) {
    const e = () => {
      this.clearIdle(), this.idle = !0, P(this.container, "is-idle"), this.emit("setIdle");
    };
    if (this.clearIdle(), !this.isClosing()) if (t) e();else {
      const t = this.option("idle");
      t && (this.idleTimer = setTimeout(e, t));
    }
  }
  endIdle() {
    this.clearIdle(), this.idle && !this.isClosing() && (this.idle = !1, S(this.container, "is-idle"), this.emit("endIdle"));
  }
  resetIdle() {
    this.endIdle(), this.setIdle();
  }
  toggleIdle() {
    this.idle ? this.endIdle() : this.setIdle(!0);
  }
  toggleFullscreen() {
    be && (be.isFullscreen() ? be.exit() : be.request().then(() => {
      this.startedFs = !0;
    }));
  }
  isClosing() {
    return [at.Closing, at.CustomClosing, at.Destroy].includes(this.state);
  }
  proceedClose(t, e) {
    var i, n;
    this.state = at.Closing, this.clearIdle(), this.detachEvents();
    const s = this.container,
      o = this.carousel,
      a = this.getSlide(),
      r = a && this.option("placeFocusBack") ? a.triggerEl || this.option("triggerEl") : null;
    if (r && (Q(r) ? nt(r) : r.focus()), s && (S(s, ce), P(s, "is-closing"), s.setAttribute(se, "true"), this.option("animated") && P(s, ae), s.style.pointerEvents = "none"), o) {
      o.clearTransitions(), null === (i = o.panzoom) || void 0 === i || i.destroy(), null === (n = o.plugins.Navigation) || void 0 === n || n.detach();
      for (const t of o.slides) {
        t.state = rt.Closing, this.hideLoading(t);
        const e = t.contentEl;
        e && this.stop(e);
        const i = null == t ? void 0 : t.panzoom;
        i && (i.stop(), i.detachEvents(), i.detachObserver()), this.isCurrentSlide(t) || o.emit("removeSlide", t);
      }
    }
    this.emit("close", t), this.state !== at.CustomClosing ? (void 0 === e && a && (e = this.optionFor(a, "hideClass")), e && a ? (this.animate(a.contentEl, e, () => {
      o && o.emit("removeSlide", a);
    }), setTimeout(() => {
      this.destroy();
    }, 500)) : this.destroy()) : setTimeout(() => {
      this.destroy();
    }, 500);
  }
  destroy() {
    var t;
    if (this.state === at.Destroy) return;
    this.state = at.Destroy, null === (t = this.carousel) || void 0 === t || t.destroy();
    const e = this.container;
    e && e.remove(), Se.delete(this.id);
    const i = Ce.getInstance();
    i ? i.focus() : (ye && (ye.remove(), ye = null), we && (we.remove(), we = null), S(document.documentElement, te), (() => {
      if (!tt) return;
      const t = document,
        e = t.body;
      e.classList.remove(ee), e.style.setProperty(ne, ""), t.documentElement.style.setProperty(ie, "");
    })(), this.emit("destroy"));
  }
  static bind(t, e, i) {
    if (!tt) return;
    let n,
      s = "",
      o = {};
    if (void 0 === t ? n = document.body : me(t) ? (n = document.body, s = t, "object" == typeof e && (o = e || {})) : (n = t, me(e) && (s = e), "object" == typeof i && (o = i || {})), !n || !E(n)) return;
    s = s || "[data-fancybox]";
    const a = Ce.openers.get(n) || new Map();
    a.set(s, o), Ce.openers.set(n, a), 1 === a.size && n.addEventListener("click", Ce.fromEvent);
  }
  static unbind(t, e) {
    let i,
      n = "";
    if (me(t) ? (i = document.body, n = t) : (i = t, me(e) && (n = e)), !i) return;
    const s = Ce.openers.get(i);
    s && n && s.delete(n), n && s || (Ce.openers.delete(i), i.removeEventListener("click", Ce.fromEvent));
  }
  static destroy() {
    let t;
    for (; t = Ce.getInstance();) t.destroy();
    for (const t of Ce.openers.keys()) t.removeEventListener("click", Ce.fromEvent);
    Ce.openers = new Map();
  }
  static fromEvent(t) {
    if (t.defaultPrevented) return;
    if (t.button && 0 !== t.button) return;
    if (t.ctrlKey || t.metaKey || t.shiftKey) return;
    let e = t.composedPath()[0];
    const i = e.closest("[data-fancybox-trigger]");
    if (i) {
      const t = i.dataset.fancyboxTrigger || "",
        n = document.querySelectorAll(`[data-fancybox="${t}"]`),
        s = parseInt(i.dataset.fancyboxIndex || "", 10) || 0;
      e = n[s] || e;
    }
    if (!(e && e instanceof Element)) return;
    let n, s, o, a;
    if ([...Ce.openers].reverse().find(([t, i]) => !(!t.contains(e) || ![...i].reverse().find(([i, r]) => {
      let l = e.closest(i);
      return !!l && (n = t, s = i, o = l, a = r, !0);
    }))), !n || !s || !o) return;
    a = a || {}, t.preventDefault(), e = o;
    let r = [],
      l = u({}, ot, a);
    l.event = t, l.triggerEl = e, l.delegate = i;
    const c = l.groupAll,
      h = l.groupAttr,
      d = h && e ? e.getAttribute(`${h}`) : "";
    if ((!e || d || c) && (r = [].slice.call(n.querySelectorAll(s))), e && !c && (r = d ? r.filter(t => t.getAttribute(`${h}`) === d) : [e]), !r.length) return;
    const p = Ce.getInstance();
    return p && p.options.triggerEl && r.indexOf(p.options.triggerEl) > -1 ? void 0 : (e && (l.startIndex = r.indexOf(e)), Ce.fromNodes(r, l));
  }
  static fromSelector(t, e, i) {
    let n = null,
      s = "",
      o = {};
    if (me(t) ? (n = document.body, s = t, "object" == typeof e && (o = e || {})) : t instanceof HTMLElement && me(e) && (n = t, s = e, "object" == typeof i && (o = i || {})), !n || !s) return !1;
    const a = Ce.openers.get(n);
    return !!a && (o = u({}, a.get(s) || {}, o), !!o && Ce.fromNodes(Array.from(n.querySelectorAll(s)), o));
  }
  static fromNodes(t, e) {
    e = u({}, ot, e || {});
    const i = [];
    for (const n of t) {
      const t = n.dataset || {},
        s = t[ge] || n.getAttribute(fe) || n.getAttribute("currentSrc") || n.getAttribute(ge) || void 0;
      let o;
      const a = e.delegate;
      let r;
      a && i.length === e.startIndex && (o = a instanceof HTMLImageElement ? a : a.querySelector("img:not([aria-hidden])")), o || (o = n instanceof HTMLImageElement ? n : n.querySelector("img:not([aria-hidden])")), o && (r = o.currentSrc || o[ge] || void 0, !r && o.dataset && (r = o.dataset.lazySrc || o.dataset[ge] || void 0));
      const l = {
        src: s,
        triggerEl: n,
        thumbEl: o,
        thumbElSrc: r,
        thumbSrc: r
      };
      for (const e in t) {
        let i = t[e] + "";
        i = "false" !== i && ("true" === i || i), l[e] = i;
      }
      i.push(l);
    }
    return new Ce(i, e);
  }
  static getInstance(t) {
    if (t) return Se.get(t);
    return Array.from(Se.values()).reverse().find(t => !t.isClosing() && t) || null;
  }
  static getSlide() {
    var t;
    return (null === (t = Ce.getInstance()) || void 0 === t ? void 0 : t.getSlide()) || null;
  }
  static show(t = [], e = {}) {
    return new Ce(t, e);
  }
  static next() {
    const t = Ce.getInstance();
    t && t.next();
  }
  static prev() {
    const t = Ce.getInstance();
    t && t.prev();
  }
  static close(t = !0, ...e) {
    if (t) for (const t of Se.values()) t.close(...e);else {
      const t = Ce.getInstance();
      t && t.close(...e);
    }
  }
}
Object.defineProperty(Ce, "version", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: "5.0.33"
}), Object.defineProperty(Ce, "defaults", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: ot
}), Object.defineProperty(Ce, "Plugins", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: Qt
}), Object.defineProperty(Ce, "openers", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: new Map()
});


/***/ }),
/* 8 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderQuestionsList: () => (/* binding */ renderQuestionsList)
/* harmony export */ });
const questionTemplate = document.querySelector('#question').content.querySelector('.faq__item');
const questionsList = document.querySelector('#faq-list');
const renderQuestionsList = questions => {
  const questionsFragment = document.createDocumentFragment();
  questions.forEach(question => {
    const questionNode = questionTemplate.cloneNode(true);
    questionNode.querySelector('.title-secondary').textContent = question.title;
    questionNode.querySelector('.accordion__text-block').innerHTML = question.answer;
    questionsFragment.appendChild(questionNode);
  });
  questionsList.appendChild(questionsFragment);
};


/***/ }),
/* 9 */
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('[{"title":"Можно ли самому выбрать ТК и терминал?","answer":"<p class=\'text text-main\'>Разумеется. Можно выбрать конкретную транспортную компанию и наиболее удобный для получения терминал. Но при этом необходимо, чтобы транспортная компания являлась федеральной и была представлена на территории Москвы или Санкт-Петербурга, откуда мы осуществим отправку вашего заказа со своих складов.</p>"},{"title":"Доставка на адрес — до подъезда или до квартиры?","answer":"<p class=\'text text-main\'>Доставка до адреса, как правило, осуществляется транспортными компаниями до подъезда или до ближайшего возможного места подъезда автомобиля к адресу. Ряд транспортных компаний дополнительно предоставляют платную услугу заноса заказа в квартиру.</p>"},{"title":"Можно ли проверить качество заказанного оборудования до оплаты?","answer":"<p class=\'text text-main\'>К сожалению, такая опция доступна только для покупателей FitnessLook из Москвы и Санкт-Петербурга, где мы осуществляем доставку и сборку оборудования силами собственной службы.</p><p class=\'text text-main\'>Насколько мы осведомлены, все транспортные компании следует правилу выдачи заказа только после оплаты.</p>"},{"title":"Если ТК разобьет мой заказ, кто несет за это ответственность?","answer":"<p class=\'text text-main\'>За десятилетний опыт работы на рынке спортивного и массажного оборудования мы с подобной историей не сталкивались. Были прецеденты, связанные с небрежной и деструктивной работой сотрудников доставки крупных МаркетПлейсов, но именно  транспортные компании всегда добросовестно и образцово подходили к исполнению своих обязанностей по доставке.</p><p class=\'text text-main\'>Кроме того, мы максимально надежно упаковываем ваш заказ, используя для этого жесткую обрешетку. Затем мы скрупулезно подготавливаем заказ к дальней перевозке и, разумеется, не забываем его застраховать.</p><p class=\'text text-main\'>Тем не менее. Если что-то вдруг пойдет не так, вам все равно не о чем переживать. Испорченные товары из вашего заказа будут заменены на новые!</p>"},{"title":"Как осуществляется официальная гарантия в моем городе?","answer":"<p class=\'text text-main\'>Сервисные центры практически всех брендов спортивного и массажного оборудования расположены в Москве и Санкт-Петербурге.</p><p class=\'text text-main\'></p><p class=\'text text-main\'>Если вы заказали продукцию такого бренда и при этом у вас возникла необходимость гарантийного обращения или ремонта, обычно это происходит так.</p><ul class=\'list-standard\'><li>Сотрудники сервисного отдела бренда-производителя реагируют на ваше обращение и связываются с вами, запрашивают детальное описание проблемы и вспомогательные видео/фото-материалы.</li><li>Если проблема носит локальный характер и устраняется на месте (например, необходим комплекс действий для сброса электронной ошибки), то сервисный сотрудник дистанционно поможет ее решить.</li><li>Если необходимо заменить какую-то часть оборудования, то бренд-производитель отправит ее удобным способом и в большинстве случае оплатит услуги мастера для ее замены.</li></ul><p class=\'text text-main\'>Если же проблема носит более серьезный характер, то в рамках гарантии бренд-производитель организует доставку-перемещение неисправного оборудования в сервисный центр в Москву или Санкт-Петербург и возьмет на себя все расходы.</p><p class=\'text text-main\'>При этом оборудование будет возвращено покупателю в установленный законом срок в исправном виде, либо будет предоставлено аналогичное новое оборудование.</p>"},{"title":"Хочу вернуть товар надлежащего качества, что для этого нужно?","answer":"<p class=\'text text-main\'>Наши покупатели имеют право вернуть товар надлежащего качества в течение 7 дней с момента получения, если он им не подошел или не понравился.</p><p class=\'text text-main\'>Подлежащая возврату позиция должна сохранить: товарный вид, заводскую упаковку и комплект документов, которыми сопровождался заказ.</p><p class=\'text text-main\'>Для возврата товара надлежащего качестве потребуется оплатить услуги по доставке его до места, откуда он был к вам отправлен.</p><p class=\'text text-main\'><span class=\'text text-main text-main--medium\'>Важно!</span> При этом сгорают все бонусы и скидки, сделанные при заказе. То есть, если доставка шла подарком и была бесплатной, то при возврате товара надлежащего качество придется оплатить их стоимость.</p>"},{"title":"Я получу полный комплект документов при любом способе доставки/оплаты?","answer":"<p class=\'text text-main\'>Да.Полный пакет документов, включающий: чек, товарный чек, гарантийный талон производителя и талон расширенной гарантии +1 год лично от FitnessLook (опционально) будет предоставлен для всех заказов. Неважно, как они были доставлены или оплачены.</p>"},{"title":"Могу ли я оплатить заказ при получении?","answer":"<p class=\'text text-main\'>Да. Ряд транспортных компаний предоставляет возможность оплаты заказа по факту получения. Однако обращаем внимание! Как правило, большая часть транспортных компаний для такого сценарии оплаты попросит наличный расчет.</p>"},{"title":"Можно ли оплатить заказ по QR-коду/СБП?","answer":"<p class=\'text text-main\'>Да, этот и все другие современные методы оплаты доступны покупателям FitnessLook. Просто выберете наиболее удобный конкретно для себя способ и воспользуйтесь им.</p>"},{"title":"Хочу оплатить от организации, как это сделать?","answer":"<p class=\'text text-main\'>Сообщите об этом менеджеру. Он объяснит, на какую почту направить свои реквизиты, после чего мы выставим счет, и его можно будет оплатить от юридического лица.</p>"},{"title":"Как оформить рассрочку или кредит, кто предоставляет услугу?","answer":"<p class=\'text text-main\'>Реализация программ покупки в рассрочку и кредит осуществляются нашими банками-партнерами. На текущий момент, мы сотрудничаем с Тинькофф Банк, Почта Банк, МТС Банк, Хоум Кредит Банк и другими добросовестными и благонадежными банками.</p><p class=\'text text-main\'>Для оформления рассрочки или кредита необходимо при заказе выбрать вид услуги и срок закрытия платежей. После этого заполните короткую форму, получите одобрение банков и выберете подходящий. Заявка, как правило, подтверждается за 1-2 минуты.</p><p class=\'text text-main\'>Кроме того, выгодная покупка в рассрочку доступна обладателям карты «Халва». Однако обращаем внимание! Чтобы воспользоваться этой программой лояльности от ПАО «СОВКОМБАНК», необходимо будет совершить online-оплату заказа.</p>"}]');

/***/ }),
/* 10 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   phoneMask: () => (/* binding */ phoneMask),
/* harmony export */   sendForm: () => (/* binding */ sendForm),
/* harmony export */   setErrorState: () => (/* binding */ setErrorState),
/* harmony export */   setFormSubmit: () => (/* binding */ setFormSubmit),
/* harmony export */   setSuccessState: () => (/* binding */ setSuccessState)
/* harmony export */ });
/* harmony import */ var _delivery_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var imask__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);



const TIMEOUT_DELAY = 3000;
const buttonNewLocation = document.querySelector('#button-new-location');
const formBlock = document.querySelector('#form-communicate');
const form = document.querySelector('#form-delivery');
const phoneInput = form.querySelector('#phone-field');
const templateSuccess = document.querySelector('#success').content.querySelector('.message');
const templateError = document.querySelector('#error').content.querySelector('.message');
const content = document.querySelector('#main_content_template');
const body = document.querySelector('body');
const bg = document.querySelector('.content');
const maskOptions = {
  mask: '+{7}(000)000-00-00'
};
const phoneMask = (0,imask__WEBPACK_IMPORTED_MODULE_2__["default"])(phoneInput, maskOptions);
buttonNewLocation.addEventListener('click', () => {
  formBlock.classList.toggle('form-communicate--open');
  if (formBlock.classList.contains('form-communicate--open')) {
    (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.scrollToElement)('#form-block');
  }
});
const setFormSubmit = (...callbacks) => {
  form.addEventListener('submit', evt => {
    evt.preventDefault();
    callbacks.forEach(cb => cb());
  });
};
const sendForm = (onSuccess = () => {}, onError = () => {}) => {
  const setState = () => {
    const formData = new FormData(form);
    const data = {};
    data['form_name'] = form.id;
    formData.forEach((value, key) => data[key] = value);
    data.phone = phoneMask.unmaskedValue;
    (0,_delivery_api_js__WEBPACK_IMPORTED_MODULE_0__.sendData)(() => onSuccess(), () => onError(), data);
  };
  return setState;
};
const isEscape = evt => evt.key === 'Escape' || evt.key === 'ESC';
const showMessage = (template, buttonClose) => {
  content.appendChild(template);
  bg.classList.add('content--lock');
  body.classList.add('body-lock');
  const removeModalHandler = () => {
    template.remove();
    bg.classList.remove('content--lock');
    body.classList.remove('body-lock');
  };
  document.addEventListener('keydown', evt => {
    if (isEscape(evt)) {
      removeModalHandler();
      document.removeEventListener('keydown', evt);
    }
  });
  if (buttonClose) {
    const button = template.querySelector(`.${buttonClose}`);
    button.addEventListener('click', removeModalHandler);
  } else {
    setTimeout(() => removeModalHandler(), TIMEOUT_DELAY);
  }
  const back = document.querySelector('.content--lock');
  if (back) {
    back.addEventListener('click', removeModalHandler);
  }
};
const setSuccessState = () => {
  showMessage(templateSuccess, 'message__close-button');
  form.reset();
};
const setErrorState = () => {
  showMessage(templateError, 'button-close');
};


/***/ }),
/* 11 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getData: () => (/* binding */ getData),
/* harmony export */   sendData: () => (/* binding */ sendData)
/* harmony export */ });
const GET_LINK = 'https://www.fitnesslook.ru/api_front/list_domain/';
const POST_LINK = 'https://www.fitnesslook.ru/api_front/lid/';
const getData = (onSuccess = () => {}, onError = () => {}) => {
  fetch(GET_LINK).then(response => {
    if (response.ok) {
      const regions = response.json();
      return regions;
    }
    throw new Error(`${response.status} — ${response.statusText}`);
  }).then(products => onSuccess(products)).catch(error => onError(error));
};
const sendData = (onSuccess, onError, data) => {
  fetch(POST_LINK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => response.ok ? onSuccess() : onError()).catch(() => onError());
};


/***/ }),
/* 12 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   removeElements: () => (/* binding */ removeElements),
/* harmony export */   scrollToElement: () => (/* binding */ scrollToElement)
/* harmony export */ });
const removeElements = (...selectors) => {
  selectors?.forEach(selector => {
    document.querySelectorAll(selector).forEach(item => item.remove());
  });
};
const scrollToElement = selector => {
  const HEADER_HEIGHT = 153;
  const scrollElement = document.querySelector(selector)?.offsetTop;
  window.scrollTo({
    top: scrollElement + HEADER_HEIGHT,
    behavior: 'smooth'
  });
};


/***/ }),
/* 13 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ChangeDetails: () => (/* reexport safe */ _core_change_details_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   ChunksTailDetails: () => (/* reexport safe */ _masked_pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   DIRECTION: () => (/* reexport safe */ _core_utils_js__WEBPACK_IMPORTED_MODULE_7__.DIRECTION),
/* harmony export */   HTMLContenteditableMaskElement: () => (/* reexport safe */ _controls_html_contenteditable_mask_element_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   HTMLInputMaskElement: () => (/* reexport safe */ _controls_html_input_mask_element_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   HTMLMaskElement: () => (/* reexport safe */ _controls_html_mask_element_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   InputMask: () => (/* reexport safe */ _controls_input_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   MaskElement: () => (/* reexport safe */ _controls_mask_element_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   Masked: () => (/* reexport safe */ _masked_base_js__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   MaskedDate: () => (/* reexport safe */ _masked_date_js__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   MaskedDynamic: () => (/* reexport safe */ _masked_dynamic_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   MaskedEnum: () => (/* reexport safe */ _masked_enum_js__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   MaskedFunction: () => (/* reexport safe */ _masked_function_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   MaskedNumber: () => (/* reexport safe */ _masked_number_js__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   MaskedPattern: () => (/* reexport safe */ _masked_pattern_js__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   MaskedRange: () => (/* reexport safe */ _masked_range_js__WEBPACK_IMPORTED_MODULE_20__["default"]),
/* harmony export */   MaskedRegExp: () => (/* reexport safe */ _masked_regexp_js__WEBPACK_IMPORTED_MODULE_21__["default"]),
/* harmony export */   PIPE_TYPE: () => (/* reexport safe */ _masked_pipe_js__WEBPACK_IMPORTED_MODULE_19__.PIPE_TYPE),
/* harmony export */   PatternFixedDefinition: () => (/* reexport safe */ _masked_pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_17__["default"]),
/* harmony export */   PatternInputDefinition: () => (/* reexport safe */ _masked_pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_18__["default"]),
/* harmony export */   RepeatBlock: () => (/* reexport safe */ _masked_repeat_js__WEBPACK_IMPORTED_MODULE_22__["default"]),
/* harmony export */   createMask: () => (/* reexport safe */ _masked_factory_js__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   createPipe: () => (/* reexport safe */ _masked_pipe_js__WEBPACK_IMPORTED_MODULE_19__.createPipe),
/* harmony export */   "default": () => (/* reexport safe */ _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   forceDirection: () => (/* reexport safe */ _core_utils_js__WEBPACK_IMPORTED_MODULE_7__.forceDirection),
/* harmony export */   normalizeOpts: () => (/* reexport safe */ _masked_factory_js__WEBPACK_IMPORTED_MODULE_12__.normalizeOpts),
/* harmony export */   pipe: () => (/* reexport safe */ _masked_pipe_js__WEBPACK_IMPORTED_MODULE_19__.pipe)
/* harmony export */ });
/* harmony import */ var _controls_input_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _controls_html_contenteditable_mask_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _controls_html_input_mask_element_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _controls_html_mask_element_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(21);
/* harmony import */ var _controls_mask_element_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(19);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(24);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
/* harmony import */ var _masked_base_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(25);
/* harmony import */ var _masked_date_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(27);
/* harmony import */ var _masked_dynamic_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(35);
/* harmony import */ var _masked_enum_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(36);
/* harmony import */ var _masked_factory_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(17);
/* harmony import */ var _masked_function_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(37);
/* harmony import */ var _masked_number_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(38);
/* harmony import */ var _masked_pattern_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(28);
/* harmony import */ var _masked_pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(29);
/* harmony import */ var _masked_pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(31);
/* harmony import */ var _masked_pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(32);
/* harmony import */ var _masked_pipe_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(39);
/* harmony import */ var _masked_range_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(34);
/* harmony import */ var _masked_regexp_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(33);
/* harmony import */ var _masked_repeat_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(40);
/* harmony import */ var _core_action_details_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(16);
/* harmony import */ var _controls_input_history_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(23);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(26);
/* harmony import */ var _masked_pattern_cursor_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(30);



























try {
  globalThis.IMask = _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"];
} catch {}


/***/ }),
/* 14 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InputMask)
/* harmony export */ });
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _core_action_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);
/* harmony import */ var _masked_factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _mask_element_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);
/* harmony import */ var _html_input_mask_element_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20);
/* harmony import */ var _html_contenteditable_mask_element_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(18);
/* harmony import */ var _input_history_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(23);
/* harmony import */ var _html_mask_element_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(21);










/** Listens to element events and controls changes between element and {@link Masked} */
class InputMask {
  /**
    View element
  */

  /** Internal {@link Masked} model */

  constructor(el, opts) {
    this.el = el instanceof _mask_element_js__WEBPACK_IMPORTED_MODULE_3__["default"] ? el : el.isContentEditable && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' ? new _html_contenteditable_mask_element_js__WEBPACK_IMPORTED_MODULE_5__["default"](el) : new _html_input_mask_element_js__WEBPACK_IMPORTED_MODULE_4__["default"](el);
    this.masked = (0,_masked_factory_js__WEBPACK_IMPORTED_MODULE_2__["default"])(opts);
    this._listeners = {};
    this._value = '';
    this._unmaskedValue = '';
    this._rawInputValue = '';
    this.history = new _input_history_js__WEBPACK_IMPORTED_MODULE_7__["default"]();
    this._saveSelection = this._saveSelection.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onClick = this._onClick.bind(this);
    this._onUndo = this._onUndo.bind(this);
    this._onRedo = this._onRedo.bind(this);
    this.alignCursor = this.alignCursor.bind(this);
    this.alignCursorFriendly = this.alignCursorFriendly.bind(this);
    this._bindEvents();

    // refresh
    this.updateValue();
    this._onChange();
  }
  maskEquals(mask) {
    return mask == null || this.masked?.maskEquals(mask);
  }

  /** Masked */
  get mask() {
    return this.masked.mask;
  }
  set mask(mask) {
    if (this.maskEquals(mask)) return;
    if (!(mask instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_6__["default"].Masked) && this.masked.constructor === (0,_masked_factory_js__WEBPACK_IMPORTED_MODULE_2__.maskedClass)(mask)) {
      // TODO "any" no idea
      this.masked.updateOptions({
        mask
      });
      return;
    }
    const masked = mask instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_6__["default"].Masked ? mask : (0,_masked_factory_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
      mask
    });
    masked.unmaskedValue = this.masked.unmaskedValue;
    this.masked = masked;
  }

  /** Raw value */
  get value() {
    return this._value;
  }
  set value(str) {
    if (this.value === str) return;
    this.masked.value = str;
    this.updateControl('auto');
  }

  /** Unmasked value */
  get unmaskedValue() {
    return this._unmaskedValue;
  }
  set unmaskedValue(str) {
    if (this.unmaskedValue === str) return;
    this.masked.unmaskedValue = str;
    this.updateControl('auto');
  }

  /** Raw input value */
  get rawInputValue() {
    return this._rawInputValue;
  }
  set rawInputValue(str) {
    if (this.rawInputValue === str) return;
    this.masked.rawInputValue = str;
    this.updateControl();
    this.alignCursor();
  }

  /** Typed unmasked value */
  get typedValue() {
    return this.masked.typedValue;
  }
  set typedValue(val) {
    if (this.masked.typedValueEquals(val)) return;
    this.masked.typedValue = val;
    this.updateControl('auto');
  }

  /** Display value */
  get displayValue() {
    return this.masked.displayValue;
  }

  /** Starts listening to element events */
  _bindEvents() {
    this.el.bindEvents({
      selectionChange: this._saveSelection,
      input: this._onInput,
      drop: this._onDrop,
      click: this._onClick,
      focus: this._onFocus,
      commit: this._onChange,
      undo: this._onUndo,
      redo: this._onRedo
    });
  }

  /** Stops listening to element events */
  _unbindEvents() {
    if (this.el) this.el.unbindEvents();
  }

  /** Fires custom event */
  _fireEvent(ev, e) {
    const listeners = this._listeners[ev];
    if (!listeners) return;
    listeners.forEach(l => l(e));
  }

  /** Current selection start */
  get selectionStart() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
  }

  /** Current cursor position */
  get cursorPos() {
    return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
  }
  set cursorPos(pos) {
    if (!this.el || !this.el.isActive) return;
    this.el.select(pos, pos);
    this._saveSelection();
  }

  /** Stores current selection */
  _saveSelection( /* ev */
  ) {
    if (this.displayValue !== this.el.value) {
      console.warn('Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.'); // eslint-disable-line no-console
    }
    this._selection = {
      start: this.selectionStart,
      end: this.cursorPos
    };
  }

  /** Syncronizes model value from view */
  updateValue() {
    this.masked.value = this.el.value;
    this._value = this.masked.value;
  }

  /** Syncronizes view from model value, fires change events */
  updateControl(cursorPos) {
    const newUnmaskedValue = this.masked.unmaskedValue;
    const newValue = this.masked.value;
    const newRawInputValue = this.masked.rawInputValue;
    const newDisplayValue = this.displayValue;
    const isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue || this._rawInputValue !== newRawInputValue;
    this._unmaskedValue = newUnmaskedValue;
    this._value = newValue;
    this._rawInputValue = newRawInputValue;
    if (this.el.value !== newDisplayValue) this.el.value = newDisplayValue;
    if (cursorPos === 'auto') this.alignCursor();else if (cursorPos != null) this.cursorPos = cursorPos;
    if (isChanged) this._fireChangeEvents();
    if (!this._historyChanging && (isChanged || this.history.isEmpty)) this.history.push({
      unmaskedValue: newUnmaskedValue,
      selection: {
        start: this.selectionStart,
        end: this.cursorPos
      }
    });
  }

  /** Updates options with deep equal check, recreates {@link Masked} model if mask type changes */
  updateOptions(opts) {
    const {
      mask,
      ...restOpts
    } = opts; // TODO types, yes, mask is optional

    const updateMask = !this.maskEquals(mask);
    const updateOpts = this.masked.optionsIsChanged(restOpts);
    if (updateMask) this.mask = mask;
    if (updateOpts) this.masked.updateOptions(restOpts); // TODO

    if (updateMask || updateOpts) this.updateControl();
  }

  /** Updates cursor */
  updateCursor(cursorPos) {
    if (cursorPos == null) return;
    this.cursorPos = cursorPos;

    // also queue change cursor for mobile browsers
    this._delayUpdateCursor(cursorPos);
  }

  /** Delays cursor update to support mobile browsers */
  _delayUpdateCursor(cursorPos) {
    this._abortUpdateCursor();
    this._changingCursorPos = cursorPos;
    this._cursorChanging = setTimeout(() => {
      if (!this.el) return; // if was destroyed
      this.cursorPos = this._changingCursorPos;
      this._abortUpdateCursor();
    }, 10);
  }

  /** Fires custom events */
  _fireChangeEvents() {
    this._fireEvent('accept', this._inputEvent);
    if (this.masked.isComplete) this._fireEvent('complete', this._inputEvent);
  }

  /** Aborts delayed cursor update */
  _abortUpdateCursor() {
    if (this._cursorChanging) {
      clearTimeout(this._cursorChanging);
      delete this._cursorChanging;
    }
  }

  /** Aligns cursor to nearest available position */
  alignCursor() {
    this.cursorPos = this.masked.nearestInputPos(this.masked.nearestInputPos(this.cursorPos, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.LEFT));
  }

  /** Aligns cursor only if selection is empty */
  alignCursorFriendly() {
    if (this.selectionStart !== this.cursorPos) return; // skip if range is selected
    this.alignCursor();
  }

  /** Adds listener on custom event */
  on(ev, handler) {
    if (!this._listeners[ev]) this._listeners[ev] = [];
    this._listeners[ev].push(handler);
    return this;
  }

  /** Removes custom event listener */
  off(ev, handler) {
    if (!this._listeners[ev]) return this;
    if (!handler) {
      delete this._listeners[ev];
      return this;
    }
    const hIndex = this._listeners[ev].indexOf(handler);
    if (hIndex >= 0) this._listeners[ev].splice(hIndex, 1);
    return this;
  }

  /** Handles view input event */
  _onInput(e) {
    this._inputEvent = e;
    this._abortUpdateCursor();
    const details = new _core_action_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      // new state
      value: this.el.value,
      cursorPos: this.cursorPos,
      // old state
      oldValue: this.displayValue,
      oldSelection: this._selection
    });
    const oldRawValue = this.masked.rawInputValue;
    const offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection, {
      input: true,
      raw: true
    }).offset;

    // force align in remove direction only if no input chars were removed
    // otherwise we still need to align with NONE (to get out from fixed symbols for instance)
    const removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NONE;
    let cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
    if (removeDirection !== _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NONE) cursorPos = this.masked.nearestInputPos(cursorPos, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NONE);
    this.updateControl(cursorPos);
    delete this._inputEvent;
  }

  /** Handles view change event and commits model value */
  _onChange() {
    if (this.displayValue !== this.el.value) {
      this.updateValue();
    }
    this.masked.doCommit();
    this.updateControl();
    this._saveSelection();
  }

  /** Handles view drop event, prevents by default */
  _onDrop(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  /** Restore last selection on focus */
  _onFocus(ev) {
    this.alignCursorFriendly();
  }

  /** Restore last selection on focus */
  _onClick(ev) {
    this.alignCursorFriendly();
  }
  _onUndo() {
    this._applyHistoryState(this.history.undo());
  }
  _onRedo() {
    this._applyHistoryState(this.history.redo());
  }
  _applyHistoryState(state) {
    if (!state) return;
    this._historyChanging = true;
    this.unmaskedValue = state.unmaskedValue;
    this.el.select(state.selection.start, state.selection.end);
    this._saveSelection();
    this._historyChanging = false;
  }

  /** Unbind view events and removes element reference */
  destroy() {
    this._unbindEvents();
    this._listeners.length = 0;
    delete this.el;
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_6__["default"].InputMask = InputMask;


/***/ }),
/* 15 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DIRECTION: () => (/* binding */ DIRECTION),
/* harmony export */   escapeRegExp: () => (/* binding */ escapeRegExp),
/* harmony export */   forceDirection: () => (/* binding */ forceDirection),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isString: () => (/* binding */ isString),
/* harmony export */   objectIncludes: () => (/* binding */ objectIncludes),
/* harmony export */   pick: () => (/* binding */ pick)
/* harmony export */ });
/** Checks if value is string */
function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

/** Checks if value is object */
function isObject(obj) {
  return typeof obj === 'object' && obj != null && obj?.constructor?.name === 'Object';
}
function pick(obj, keys) {
  if (Array.isArray(keys)) return pick(obj, (_, k) => keys.includes(k));
  return Object.entries(obj).reduce((acc, _ref) => {
    let [k, v] = _ref;
    if (keys(v, k)) acc[k] = v;
    return acc;
  }, {});
}

/** Direction */
const DIRECTION = {
  NONE: 'NONE',
  LEFT: 'LEFT',
  FORCE_LEFT: 'FORCE_LEFT',
  RIGHT: 'RIGHT',
  FORCE_RIGHT: 'FORCE_RIGHT'
};

/** Direction */

function forceDirection(direction) {
  switch (direction) {
    case DIRECTION.LEFT:
      return DIRECTION.FORCE_LEFT;
    case DIRECTION.RIGHT:
      return DIRECTION.FORCE_RIGHT;
    default:
      return direction;
  }
}

/** Escapes regular expression control chars */
function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1');
}

// cloned from https://github.com/epoberezkin/fast-deep-equal with small changes
function objectIncludes(b, a) {
  if (a === b) return true;
  const arrA = Array.isArray(a),
    arrB = Array.isArray(b);
  let i;
  if (arrA && arrB) {
    if (a.length != b.length) return false;
    for (i = 0; i < a.length; i++) if (!objectIncludes(a[i], b[i])) return false;
    return true;
  }
  if (arrA != arrB) return false;
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const dateA = a instanceof Date,
      dateB = b instanceof Date;
    if (dateA && dateB) return a.getTime() == b.getTime();
    if (dateA != dateB) return false;
    const regexpA = a instanceof RegExp,
      regexpB = b instanceof RegExp;
    if (regexpA && regexpB) return a.toString() == b.toString();
    if (regexpA != regexpB) return false;
    const keys = Object.keys(a);
    // if (keys.length !== Object.keys(b).length) return false;

    for (i = 0; i < keys.length; i++) if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    for (i = 0; i < keys.length; i++) if (!objectIncludes(b[keys[i]], a[keys[i]])) return false;
    return true;
  } else if (a && b && typeof a === 'function' && typeof b === 'function') {
    return a.toString() === b.toString();
  }
  return false;
}

/** Selection range */



/***/ }),
/* 16 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ActionDetails)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);


/** Provides details of changing input */
class ActionDetails {
  /** Current input value */

  /** Current cursor position */

  /** Old input value */

  /** Old selection */

  constructor(opts) {
    Object.assign(this, opts);

    // double check if left part was changed (autofilling, other non-standard input triggers)
    while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) {
      --this.oldSelection.start;
    }

    // double check right part
    while (this.value.slice(this.cursorPos) !== this.oldValue.slice(this.oldSelection.end)) {
      if (this.value.length - this.cursorPos < this.oldValue.length - this.oldSelection.end) ++this.oldSelection.end;else ++this.cursorPos;
    }
  }

  /** Start changing position */
  get startChangePos() {
    return Math.min(this.cursorPos, this.oldSelection.start);
  }

  /** Inserted symbols count */
  get insertedCount() {
    return this.cursorPos - this.startChangePos;
  }

  /** Inserted symbols */
  get inserted() {
    return this.value.substr(this.startChangePos, this.insertedCount);
  }

  /** Removed symbols count */
  get removedCount() {
    // Math.max for opposite operation
    return Math.max(this.oldSelection.end - this.startChangePos ||
    // for Delete
    this.oldValue.length - this.value.length, 0);
  }

  /** Removed symbols */
  get removed() {
    return this.oldValue.substr(this.startChangePos, this.removedCount);
  }

  /** Unchanged head symbols */
  get head() {
    return this.value.substring(0, this.startChangePos);
  }

  /** Unchanged tail symbols */
  get tail() {
    return this.value.substring(this.startChangePos + this.insertedCount);
  }

  /** Remove direction */
  get removeDirection() {
    if (!this.removedCount || this.insertedCount) return _utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NONE;

    // align right if delete at right
    return (this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos) &&
    // if not range removed (event with backspace)
    this.oldSelection.end === this.oldSelection.start ? _utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.RIGHT : _utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.LEFT;
  }
}


/***/ }),
/* 17 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createMask),
/* harmony export */   maskedClass: () => (/* binding */ maskedClass),
/* harmony export */   normalizeOpts: () => (/* binding */ normalizeOpts)
/* harmony export */ });
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);



// TODO can't use overloads here because of https://github.com/microsoft/TypeScript/issues/50754
// export function maskedClass(mask: string): typeof MaskedPattern;
// export function maskedClass(mask: DateConstructor): typeof MaskedDate;
// export function maskedClass(mask: NumberConstructor): typeof MaskedNumber;
// export function maskedClass(mask: Array<any> | ArrayConstructor): typeof MaskedDynamic;
// export function maskedClass(mask: MaskedDate): typeof MaskedDate;
// export function maskedClass(mask: MaskedNumber): typeof MaskedNumber;
// export function maskedClass(mask: MaskedEnum): typeof MaskedEnum;
// export function maskedClass(mask: MaskedRange): typeof MaskedRange;
// export function maskedClass(mask: MaskedRegExp): typeof MaskedRegExp;
// export function maskedClass(mask: MaskedFunction): typeof MaskedFunction;
// export function maskedClass(mask: MaskedPattern): typeof MaskedPattern;
// export function maskedClass(mask: MaskedDynamic): typeof MaskedDynamic;
// export function maskedClass(mask: Masked): typeof Masked;
// export function maskedClass(mask: typeof Masked): typeof Masked;
// export function maskedClass(mask: typeof MaskedDate): typeof MaskedDate;
// export function maskedClass(mask: typeof MaskedNumber): typeof MaskedNumber;
// export function maskedClass(mask: typeof MaskedEnum): typeof MaskedEnum;
// export function maskedClass(mask: typeof MaskedRange): typeof MaskedRange;
// export function maskedClass(mask: typeof MaskedRegExp): typeof MaskedRegExp;
// export function maskedClass(mask: typeof MaskedFunction): typeof MaskedFunction;
// export function maskedClass(mask: typeof MaskedPattern): typeof MaskedPattern;
// export function maskedClass(mask: typeof MaskedDynamic): typeof MaskedDynamic;
// export function maskedClass<Mask extends typeof Masked> (mask: Mask): Mask;
// export function maskedClass(mask: RegExp): typeof MaskedRegExp;
// export function maskedClass(mask: (value: string, ...args: any[]) => boolean): typeof MaskedFunction;

/** Get Masked class by mask type */
function maskedClass(mask) /* TODO */{
  if (mask == null) throw new Error('mask property should be defined');
  if (mask instanceof RegExp) return _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedRegExp;
  if ((0,_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.isString)(mask)) return _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedPattern;
  if (mask === Date) return _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedDate;
  if (mask === Number) return _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedNumber;
  if (Array.isArray(mask) || mask === Array) return _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedDynamic;
  if (_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked && mask.prototype instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked) return mask;
  if (_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked && mask instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked) return mask.constructor;
  if (mask instanceof Function) return _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedFunction;
  console.warn('Mask not found for mask', mask); // eslint-disable-line no-console
  return _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked;
}
function normalizeOpts(opts) {
  if (!opts) throw new Error('Options in not defined');
  if (_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked) {
    if (opts.prototype instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked) return {
      mask: opts
    };

    /*
      handle cases like:
      1) opts = Masked
      2) opts = { mask: Masked, ...instanceOpts }
    */
    const {
      mask = undefined,
      ...instanceOpts
    } = opts instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked ? {
      mask: opts
    } : (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(opts) && opts.mask instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked ? opts : {};
    if (mask) {
      const _mask = mask.mask;
      return {
        ...(0,_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.pick)(mask, (_, k) => !k.startsWith('_')),
        mask: mask.constructor,
        _mask,
        ...instanceOpts
      };
    }
  }
  if (!(0,_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.isObject)(opts)) return {
    mask: opts
  };
  return {
    ...opts
  };
}

// TODO can't use overloads here because of https://github.com/microsoft/TypeScript/issues/50754

// From masked
// export default function createMask<Opts extends Masked, ReturnMasked=Opts> (opts: Opts): ReturnMasked;
// // From masked class
// export default function createMask<Opts extends MaskedOptions<typeof Masked>, ReturnMasked extends Masked=InstanceType<Opts['mask']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedDate>, ReturnMasked extends MaskedDate=MaskedDate<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedNumber>, ReturnMasked extends MaskedNumber=MaskedNumber<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedEnum>, ReturnMasked extends MaskedEnum=MaskedEnum<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedRange>, ReturnMasked extends MaskedRange=MaskedRange<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedRegExp>, ReturnMasked extends MaskedRegExp=MaskedRegExp<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedFunction>, ReturnMasked extends MaskedFunction=MaskedFunction<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedPattern>, ReturnMasked extends MaskedPattern=MaskedPattern<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<typeof MaskedDynamic>, ReturnMasked extends MaskedDynamic=MaskedDynamic<Opts['parent']>> (opts: Opts): ReturnMasked;
// // From mask opts
// export default function createMask<Opts extends MaskedOptions<Masked>, ReturnMasked=Opts extends MaskedOptions<infer M> ? M : never> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedNumberOptions, ReturnMasked extends MaskedNumber=MaskedNumber<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedDateFactoryOptions, ReturnMasked extends MaskedDate=MaskedDate<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedEnumOptions, ReturnMasked extends MaskedEnum=MaskedEnum<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedRangeOptions, ReturnMasked extends MaskedRange=MaskedRange<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedPatternOptions, ReturnMasked extends MaskedPattern=MaskedPattern<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedDynamicOptions, ReturnMasked extends MaskedDynamic=MaskedDynamic<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<RegExp>, ReturnMasked extends MaskedRegExp=MaskedRegExp<Opts['parent']>> (opts: Opts): ReturnMasked;
// export default function createMask<Opts extends MaskedOptions<Function>, ReturnMasked extends MaskedFunction=MaskedFunction<Opts['parent']>> (opts: Opts): ReturnMasked;

/** Creates new {@link Masked} depending on mask type */
function createMask(opts) {
  if (_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked && opts instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].Masked) return opts;
  const nOpts = normalizeOpts(opts);
  const MaskedClass = maskedClass(nOpts.mask);
  if (!MaskedClass) throw new Error(`Masked class is not found for provided mask ${nOpts.mask}, appropriate module needs to be imported manually before creating mask.`);
  if (nOpts.mask === MaskedClass) delete nOpts.mask;
  if (nOpts._mask) {
    nOpts.mask = nOpts._mask;
    delete nOpts._mask;
  }
  return new MaskedClass(nOpts);
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].createMask = createMask;


/***/ }),
/* 18 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ IMask)
/* harmony export */ });
/** Applies mask on element */
function IMask(el, opts) {
  // currently available only for input-like elements
  return new IMask.InputMask(el, opts);
}


/***/ }),
/* 19 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskElement)
/* harmony export */ });
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);


/**  Generic element API to use with mask */
class MaskElement {
  /** */

  /** */

  /** */

  /** Safely returns selection start */
  get selectionStart() {
    let start;
    try {
      start = this._unsafeSelectionStart;
    } catch {}
    return start != null ? start : this.value.length;
  }

  /** Safely returns selection end */
  get selectionEnd() {
    let end;
    try {
      end = this._unsafeSelectionEnd;
    } catch {}
    return end != null ? end : this.value.length;
  }

  /** Safely sets element selection */
  select(start, end) {
    if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd) return;
    try {
      this._unsafeSelect(start, end);
    } catch {}
  }

  /** */
  get isActive() {
    return false;
  }
  /** */

  /** */

  /** */
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_0__["default"].MaskElement = MaskElement;


/***/ }),
/* 20 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTMLInputMaskElement)
/* harmony export */ });
/* harmony import */ var _html_mask_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _mask_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);




/** Bridge between InputElement and {@link Masked} */
class HTMLInputMaskElement extends _html_mask_element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** InputElement to use mask on */

  constructor(input) {
    super(input);
    this.input = input;
  }

  /** Returns InputElement selection start */
  get _unsafeSelectionStart() {
    return this.input.selectionStart != null ? this.input.selectionStart : this.value.length;
  }

  /** Returns InputElement selection end */
  get _unsafeSelectionEnd() {
    return this.input.selectionEnd;
  }

  /** Sets InputElement selection */
  _unsafeSelect(start, end) {
    this.input.setSelectionRange(start, end);
  }
  get value() {
    return this.input.value;
  }
  set value(value) {
    this.input.value = value;
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].HTMLMaskElement = _html_mask_element_js__WEBPACK_IMPORTED_MODULE_0__["default"];


/***/ }),
/* 21 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTMLMaskElement)
/* harmony export */ });
/* harmony import */ var _mask_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(19);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);


const KEY_Z = 90;
const KEY_Y = 89;

/** Bridge between HTMLElement and {@link Masked} */
class HTMLMaskElement extends _mask_element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** HTMLElement to use mask on */

  constructor(input) {
    super();
    this.input = input;
    this._onKeydown = this._onKeydown.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onBeforeinput = this._onBeforeinput.bind(this);
    this._onCompositionEnd = this._onCompositionEnd.bind(this);
  }
  get rootElement() {
    return this.input.getRootNode?.() ?? document;
  }

  /** Is element in focus */
  get isActive() {
    return this.input === this.rootElement.activeElement;
  }

  /** Binds HTMLElement events to mask internal events */
  bindEvents(handlers) {
    this.input.addEventListener('keydown', this._onKeydown);
    this.input.addEventListener('input', this._onInput);
    this.input.addEventListener('beforeinput', this._onBeforeinput);
    this.input.addEventListener('compositionend', this._onCompositionEnd);
    this.input.addEventListener('drop', handlers.drop);
    this.input.addEventListener('click', handlers.click);
    this.input.addEventListener('focus', handlers.focus);
    this.input.addEventListener('blur', handlers.commit);
    this._handlers = handlers;
  }
  _onKeydown(e) {
    if (this._handlers.redo && (e.keyCode === KEY_Z && e.shiftKey && (e.metaKey || e.ctrlKey) || e.keyCode === KEY_Y && e.ctrlKey)) {
      e.preventDefault();
      return this._handlers.redo(e);
    }
    if (this._handlers.undo && e.keyCode === KEY_Z && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      return this._handlers.undo(e);
    }
    if (!e.isComposing) this._handlers.selectionChange(e);
  }
  _onBeforeinput(e) {
    if (e.inputType === 'historyUndo' && this._handlers.undo) {
      e.preventDefault();
      return this._handlers.undo(e);
    }
    if (e.inputType === 'historyRedo' && this._handlers.redo) {
      e.preventDefault();
      return this._handlers.redo(e);
    }
  }
  _onCompositionEnd(e) {
    this._handlers.input(e);
  }
  _onInput(e) {
    if (!e.isComposing) this._handlers.input(e);
  }

  /** Unbinds HTMLElement events to mask internal events */
  unbindEvents() {
    this.input.removeEventListener('keydown', this._onKeydown);
    this.input.removeEventListener('input', this._onInput);
    this.input.removeEventListener('beforeinput', this._onBeforeinput);
    this.input.removeEventListener('compositionend', this._onCompositionEnd);
    this.input.removeEventListener('drop', this._handlers.drop);
    this.input.removeEventListener('click', this._handlers.click);
    this.input.removeEventListener('focus', this._handlers.focus);
    this.input.removeEventListener('blur', this._handlers.commit);
    this._handlers = {};
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].HTMLMaskElement = HTMLMaskElement;


/***/ }),
/* 22 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTMLContenteditableMaskElement)
/* harmony export */ });
/* harmony import */ var _html_mask_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _mask_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);



class HTMLContenteditableMaskElement extends _html_mask_element_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** Returns HTMLElement selection start */
  get _unsafeSelectionStart() {
    const root = this.rootElement;
    const selection = root.getSelection && root.getSelection();
    const anchorOffset = selection && selection.anchorOffset;
    const focusOffset = selection && selection.focusOffset;
    if (focusOffset == null || anchorOffset == null || anchorOffset < focusOffset) {
      return anchorOffset;
    }
    return focusOffset;
  }

  /** Returns HTMLElement selection end */
  get _unsafeSelectionEnd() {
    const root = this.rootElement;
    const selection = root.getSelection && root.getSelection();
    const anchorOffset = selection && selection.anchorOffset;
    const focusOffset = selection && selection.focusOffset;
    if (focusOffset == null || anchorOffset == null || anchorOffset > focusOffset) {
      return anchorOffset;
    }
    return focusOffset;
  }

  /** Sets HTMLElement selection */
  _unsafeSelect(start, end) {
    if (!this.rootElement.createRange) return;
    const range = this.rootElement.createRange();
    range.setStart(this.input.firstChild || this.input, start);
    range.setEnd(this.input.lastChild || this.input, end);
    const root = this.rootElement;
    const selection = root.getSelection && root.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  /** HTMLElement value */
  get value() {
    return this.input.textContent || '';
  }
  set value(value) {
    this.input.textContent = value;
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;


/***/ }),
/* 23 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InputHistory)
/* harmony export */ });
class InputHistory {
  static MAX_LENGTH = 100;
  states = [];
  currentIndex = 0;
  get currentState() {
    return this.states[this.currentIndex];
  }
  get isEmpty() {
    return this.states.length === 0;
  }
  push(state) {
    // if current index points before the last element then remove the future
    if (this.currentIndex < this.states.length - 1) this.states.length = this.currentIndex + 1;
    this.states.push(state);
    if (this.states.length > InputHistory.MAX_LENGTH) this.states.shift();
    this.currentIndex = this.states.length - 1;
  }
  go(steps) {
    this.currentIndex = Math.min(Math.max(this.currentIndex + steps, 0), this.states.length - 1);
    return this.currentState;
  }
  undo() {
    return this.go(-1);
  }
  redo() {
    return this.go(+1);
  }
  clear() {
    this.states.length = 0;
    this.currentIndex = 0;
  }
}


/***/ }),
/* 24 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChangeDetails)
/* harmony export */ });
/* harmony import */ var _holder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);


/** Provides details of changing model value */
class ChangeDetails {
  /** Inserted symbols */

  /** Can skip chars */

  /** Additional offset if any changes occurred before tail */

  /** Raw inserted is used by dynamic mask */

  static normalize(prep) {
    return Array.isArray(prep) ? prep : [prep, new ChangeDetails()];
  }
  constructor(details) {
    Object.assign(this, {
      inserted: '',
      rawInserted: '',
      skip: false,
      tailShift: 0
    }, details);
  }

  /** Aggregate changes */
  aggregate(details) {
    this.rawInserted += details.rawInserted;
    this.skip = this.skip || details.skip;
    this.inserted += details.inserted;
    this.tailShift += details.tailShift;
    return this;
  }

  /** Total offset considering all changes */
  get offset() {
    return this.tailShift + this.inserted.length;
  }
}
_holder_js__WEBPACK_IMPORTED_MODULE_0__["default"].ChangeDetails = ChangeDetails;


/***/ }),
/* 25 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Masked)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);





/** Append flags */

/** Extract flags */

// see https://github.com/microsoft/TypeScript/issues/6223

/** Provides common masking stuff */
class Masked {
  static DEFAULTS = {
    skipInvalid: true
  };
  static EMPTY_VALUES = [undefined, null, ''];

  /** */

  /** */

  /** Transforms value before mask processing */

  /** Transforms each char before mask processing */

  /** Validates if value is acceptable */

  /** Does additional processing at the end of editing */

  /** Format typed value to string */

  /** Parse string to get typed value */

  /** Enable characters overwriting */

  /** */

  /** */

  /** */

  constructor(opts) {
    this._value = '';
    this._update({
      ...Masked.DEFAULTS,
      ...opts
    });
    this._initialized = true;
  }

  /** Sets and applies new options */
  updateOptions(opts) {
    if (!this.optionsIsChanged(opts)) return;
    this.withValueRefresh(this._update.bind(this, opts));
  }

  /** Sets new options */
  _update(opts) {
    Object.assign(this, opts);
  }

  /** Mask state */
  get state() {
    return {
      _value: this.value,
      _rawInputValue: this.rawInputValue
    };
  }
  set state(state) {
    this._value = state._value;
  }

  /** Resets value */
  reset() {
    this._value = '';
  }
  get value() {
    return this._value;
  }
  set value(value) {
    this.resolve(value, {
      input: true
    });
  }

  /** Resolve new value */
  resolve(value, flags) {
    if (flags === void 0) {
      flags = {
        input: true
      };
    }
    this.reset();
    this.append(value, flags, '');
    this.doCommit();
  }
  get unmaskedValue() {
    return this.value;
  }
  set unmaskedValue(value) {
    this.resolve(value, {});
  }
  get typedValue() {
    return this.parse ? this.parse(this.value, this) : this.unmaskedValue;
  }
  set typedValue(value) {
    if (this.format) {
      this.value = this.format(value, this);
    } else {
      this.unmaskedValue = String(value);
    }
  }

  /** Value that includes raw user input */
  get rawInputValue() {
    return this.extractInput(0, this.displayValue.length, {
      raw: true
    });
  }
  set rawInputValue(value) {
    this.resolve(value, {
      raw: true
    });
  }
  get displayValue() {
    return this.value;
  }
  get isComplete() {
    return true;
  }
  get isFilled() {
    return this.isComplete;
  }

  /** Finds nearest input position in direction */
  nearestInputPos(cursorPos, direction) {
    return cursorPos;
  }
  totalInputPositions(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    return Math.min(this.displayValue.length, toPos - fromPos);
  }

  /** Extracts value in range considering flags */
  extractInput(fromPos, toPos, flags) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    return this.displayValue.slice(fromPos, toPos);
  }

  /** Extracts tail in range */
  extractTail(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    return new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_1__["default"](this.extractInput(fromPos, toPos), fromPos);
  }

  /** Appends tail */
  appendTail(tail) {
    if ((0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.isString)(tail)) tail = new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_1__["default"](String(tail));
    return tail.appendTo(this);
  }

  /** Appends char */
  _appendCharRaw(ch, flags) {
    if (!ch) return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this._value += ch;
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
      inserted: ch,
      rawInserted: ch
    });
  }

  /** Appends char */
  _appendChar(ch, flags, checkTail) {
    if (flags === void 0) {
      flags = {};
    }
    const consistentState = this.state;
    let details;
    [ch, details] = this.doPrepareChar(ch, flags);
    if (ch) details = details.aggregate(this._appendCharRaw(ch, flags));
    if (details.inserted) {
      let consistentTail;
      let appended = this.doValidate(flags) !== false;
      if (appended && checkTail != null) {
        // validation ok, check tail
        const beforeTailState = this.state;
        if (this.overwrite === true) {
          consistentTail = checkTail.state;
          for (let i = 0; i < details.rawInserted.length; ++i) {
            checkTail.unshift(this.displayValue.length - details.tailShift);
          }
        }
        let tailDetails = this.appendTail(checkTail);
        appended = tailDetails.rawInserted.length === checkTail.toString().length;

        // not ok, try shift
        if (!(appended && tailDetails.inserted) && this.overwrite === 'shift') {
          this.state = beforeTailState;
          consistentTail = checkTail.state;
          for (let i = 0; i < details.rawInserted.length; ++i) {
            checkTail.shift();
          }
          tailDetails = this.appendTail(checkTail);
          appended = tailDetails.rawInserted.length === checkTail.toString().length;
        }

        // if ok, rollback state after tail
        if (appended && tailDetails.inserted) this.state = beforeTailState;
      }

      // revert all if something went wrong
      if (!appended) {
        details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
        this.state = consistentState;
        if (checkTail && consistentTail) checkTail.state = consistentTail;
      }
    }
    return details;
  }

  /** Appends optional placeholder at the end */
  _appendPlaceholder() {
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  /** Appends optional eager placeholder at the end */
  _appendEager() {
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  /** Appends symbols considering flags */
  append(str, flags, tail) {
    if (!(0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.isString)(str)) throw new Error('value should be string');
    const checkTail = (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.isString)(tail) ? new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_1__["default"](String(tail)) : tail;
    if (flags?.tail) flags._beforeTailState = this.state;
    let details;
    [str, details] = this.doPrepare(str, flags);
    for (let ci = 0; ci < str.length; ++ci) {
      const d = this._appendChar(str[ci], flags, checkTail);
      if (!d.rawInserted && !this.doSkipInvalid(str[ci], flags, checkTail)) break;
      details.aggregate(d);
    }
    if ((this.eager === true || this.eager === 'append') && flags?.input && str) {
      details.aggregate(this._appendEager());
    }

    // append tail but aggregate only tailShift
    if (checkTail != null) {
      details.tailShift += this.appendTail(checkTail).tailShift;
      // TODO it's a good idea to clear state after appending ends
      // but it causes bugs when one append calls another (when dynamic dispatch set rawInputValue)
      // this._resetBeforeTailState();
    }
    return details;
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    this._value = this.displayValue.slice(0, fromPos) + this.displayValue.slice(toPos);
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }

  /** Calls function and reapplies current value */
  withValueRefresh(fn) {
    if (this._refreshing || !this._initialized) return fn();
    this._refreshing = true;
    const rawInput = this.rawInputValue;
    const value = this.value;
    const ret = fn();
    this.rawInputValue = rawInput;
    // append lost trailing chars at the end
    if (this.value && this.value !== value && value.indexOf(this.value) === 0) {
      this.append(value.slice(this.displayValue.length), {}, '');
      this.doCommit();
    }
    delete this._refreshing;
    return ret;
  }
  runIsolated(fn) {
    if (this._isolated || !this._initialized) return fn(this);
    this._isolated = true;
    const state = this.state;
    const ret = fn(this);
    this.state = state;
    delete this._isolated;
    return ret;
  }
  doSkipInvalid(ch, flags, checkTail) {
    return Boolean(this.skipInvalid);
  }

  /** Prepares string before mask processing */
  doPrepare(str, flags) {
    if (flags === void 0) {
      flags = {};
    }
    return _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(this.prepare ? this.prepare(str, this, flags) : str);
  }

  /** Prepares each char before mask processing */
  doPrepareChar(str, flags) {
    if (flags === void 0) {
      flags = {};
    }
    return _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"].normalize(this.prepareChar ? this.prepareChar(str, this, flags) : str);
  }

  /** Validates if value is acceptable */
  doValidate(flags) {
    return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
  }

  /** Does additional processing at the end of editing */
  doCommit() {
    if (this.commit) this.commit(this.value, this);
  }
  splice(start, deleteCount, inserted, removeDirection, flags) {
    if (removeDirection === void 0) {
      removeDirection = _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE;
    }
    if (flags === void 0) {
      flags = {
        input: true
      };
    }
    const tailPos = start + deleteCount;
    const tail = this.extractTail(tailPos);
    const eagerRemove = this.eager === true || this.eager === 'remove';
    let oldRawValue;
    if (eagerRemove) {
      removeDirection = (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.forceDirection)(removeDirection);
      oldRawValue = this.extractInput(0, tailPos, {
        raw: true
      });
    }
    let startChangePos = start;
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();

    // if it is just deletion without insertion
    if (removeDirection !== _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE) {
      startChangePos = this.nearestInputPos(start, deleteCount > 1 && start !== 0 && !eagerRemove ? _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE : removeDirection);

      // adjust tailShift if start was aligned
      details.tailShift = startChangePos - start;
    }
    details.aggregate(this.remove(startChangePos));
    if (eagerRemove && removeDirection !== _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE && oldRawValue === this.rawInputValue) {
      if (removeDirection === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_LEFT) {
        let valLength;
        while (oldRawValue === this.rawInputValue && (valLength = this.displayValue.length)) {
          details.aggregate(new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
            tailShift: -1
          })).aggregate(this.remove(valLength - 1));
        }
      } else if (removeDirection === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_RIGHT) {
        tail.unshift();
      }
    }
    return details.aggregate(this.append(inserted, flags, tail));
  }
  maskEquals(mask) {
    return this.mask === mask;
  }
  optionsIsChanged(opts) {
    return !(0,_core_utils_js__WEBPACK_IMPORTED_MODULE_2__.objectIncludes)(this, opts);
  }
  typedValueEquals(value) {
    const tval = this.typedValue;
    return value === tval || Masked.EMPTY_VALUES.includes(value) && Masked.EMPTY_VALUES.includes(tval) || (this.format ? this.format(value, this) === this.format(this.typedValue, this) : false);
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_3__["default"].Masked = Masked;


/***/ }),
/* 26 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ContinuousTailDetails)
/* harmony export */ });
/** Provides details of continuous extracted tail */
class ContinuousTailDetails {
  /** Tail value as string */

  /** Tail start position */

  /** Start position */

  constructor(value, from, stop) {
    if (value === void 0) {
      value = '';
    }
    if (from === void 0) {
      from = 0;
    }
    this.value = value;
    this.from = from;
    this.stop = stop;
  }
  toString() {
    return this.value;
  }
  extend(tail) {
    this.value += String(tail);
  }
  appendTo(masked) {
    return masked.append(this.toString(), {
      tail: true
    }).aggregate(masked._appendPlaceholder());
  }
  get state() {
    return {
      value: this.value,
      from: this.from,
      stop: this.stop
    };
  }
  set state(state) {
    Object.assign(this, state);
  }
  unshift(beforePos) {
    if (!this.value.length || beforePos != null && this.from >= beforePos) return '';
    const shiftChar = this.value[0];
    this.value = this.value.slice(1);
    return shiftChar;
  }
  shift() {
    if (!this.value.length) return '';
    const shiftChar = this.value[this.value.length - 1];
    this.value = this.value.slice(0, -1);
    return shiftChar;
  }
}


/***/ }),
/* 27 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedDate)
/* harmony export */ });
/* harmony import */ var _pattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var _range_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(34);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(17);
/* harmony import */ var _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(29);
/* harmony import */ var _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(30);
/* harmony import */ var _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(31);
/* harmony import */ var _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(32);
/* harmony import */ var _regexp_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(33);














/** Date mask */
class MaskedDate extends _pattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  static GET_DEFAULT_BLOCKS = () => ({
    d: {
      mask: _range_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      from: 1,
      to: 31,
      maxLength: 2
    },
    m: {
      mask: _range_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      from: 1,
      to: 12,
      maxLength: 2
    },
    Y: {
      mask: _range_js__WEBPACK_IMPORTED_MODULE_1__["default"],
      from: 1900,
      to: 9999
    }
  });
  static DEFAULTS = {
    mask: Date,
    pattern: 'd{.}`m{.}`Y',
    format: (date, masked) => {
      if (!date) return '';
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return [day, month, year].join('.');
    },
    parse: (str, masked) => {
      const [day, month, year] = str.split('.').map(Number);
      return new Date(year, month - 1, day);
    }
  };
  static extractPatternOptions(opts) {
    const {
      mask,
      pattern,
      ...patternOpts
    } = opts;
    return {
      ...patternOpts,
      mask: (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_3__.isString)(mask) ? mask : pattern
    };
  }

  /** Pattern mask for date according to {@link MaskedDate#format} */

  /** Start date */

  /** End date */

  /** */

  /** Format typed value to string */

  /** Parse string to get typed value */

  constructor(opts) {
    super(MaskedDate.extractPatternOptions({
      ...MaskedDate.DEFAULTS,
      ...opts
    }));
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    const {
      mask,
      pattern,
      blocks,
      ...patternOpts
    } = {
      ...MaskedDate.DEFAULTS,
      ...opts
    };
    const patternBlocks = Object.assign({}, MaskedDate.GET_DEFAULT_BLOCKS());
    // adjust year block
    if (opts.min) patternBlocks.Y.from = opts.min.getFullYear();
    if (opts.max) patternBlocks.Y.to = opts.max.getFullYear();
    if (opts.min && opts.max && patternBlocks.Y.from === patternBlocks.Y.to) {
      patternBlocks.m.from = opts.min.getMonth() + 1;
      patternBlocks.m.to = opts.max.getMonth() + 1;
      if (patternBlocks.m.from === patternBlocks.m.to) {
        patternBlocks.d.from = opts.min.getDate();
        patternBlocks.d.to = opts.max.getDate();
      }
    }
    Object.assign(patternBlocks, this.blocks, blocks);

    // add autofix
    Object.keys(patternBlocks).forEach(bk => {
      const b = patternBlocks[bk];
      if (!('autofix' in b) && 'autofix' in opts) b.autofix = opts.autofix;
    });
    super._update({
      ...patternOpts,
      mask: (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_3__.isString)(mask) ? mask : pattern,
      blocks: patternBlocks
    });
  }
  doValidate(flags) {
    const date = this.date;
    return super.doValidate(flags) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
  }

  /** Checks if date is exists */
  isDateExist(str) {
    return this.format(this.parse(str, this), this).indexOf(str) >= 0;
  }

  /** Parsed Date */
  get date() {
    return this.typedValue;
  }
  set date(date) {
    this.typedValue = date;
  }
  get typedValue() {
    return this.isComplete ? super.typedValue : null;
  }
  set typedValue(value) {
    super.typedValue = value;
  }
  maskEquals(mask) {
    return mask === Date || super.maskEquals(mask);
  }
  optionsIsChanged(opts) {
    return super.optionsIsChanged(MaskedDate.extractPatternOptions(opts));
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_2__["default"].MaskedDate = MaskedDate;


/***/ }),
/* 28 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedPattern)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(17);
/* harmony import */ var _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(29);
/* harmony import */ var _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(30);
/* harmony import */ var _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(31);
/* harmony import */ var _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(32);
/* harmony import */ var _regexp_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(33);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(26);












/** Pattern mask */
class MaskedPattern extends _base_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  static DEFAULTS = {
    lazy: true,
    placeholderChar: '_'
  };
  static STOP_CHAR = '`';
  static ESCAPE_CHAR = '\\';
  static InputDefinition = _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_8__["default"];
  static FixedDefinition = _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_7__["default"];

  /** */

  /** */

  /** Single char for empty input */

  /** Single char for filled input */

  /** Show placeholder only when needed */

  /** Enable characters overwriting */

  /** */

  /** */

  constructor(opts) {
    super({
      ...MaskedPattern.DEFAULTS,
      ...opts,
      definitions: Object.assign({}, _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_8__["default"].DEFAULT_DEFINITIONS, opts?.definitions)
    });
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    opts.definitions = Object.assign({}, this.definitions, opts.definitions);
    super._update(opts);
    this._rebuildMask();
  }
  _rebuildMask() {
    const defs = this.definitions;
    this._blocks = [];
    this.exposeBlock = undefined;
    this._stops = [];
    this._maskedBlocks = {};
    const pattern = this.mask;
    if (!pattern || !defs) return;
    let unmaskingBlock = false;
    let optionalBlock = false;
    for (let i = 0; i < pattern.length; ++i) {
      if (this.blocks) {
        const p = pattern.slice(i);
        const bNames = Object.keys(this.blocks).filter(bName => p.indexOf(bName) === 0);
        // order by key length
        bNames.sort((a, b) => b.length - a.length);
        // use block name with max length
        const bName = bNames[0];
        if (bName) {
          const {
            expose,
            repeat,
            ...bOpts
          } = (0,_factory_js__WEBPACK_IMPORTED_MODULE_4__.normalizeOpts)(this.blocks[bName]); // TODO type Opts<Arg & Extra>
          const blockOpts = {
            lazy: this.lazy,
            eager: this.eager,
            placeholderChar: this.placeholderChar,
            displayChar: this.displayChar,
            overwrite: this.overwrite,
            ...bOpts,
            repeat,
            parent: this
          };
          const maskedBlock = repeat != null ? new _core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].RepeatBlock(blockOpts /* TODO */) : (0,_factory_js__WEBPACK_IMPORTED_MODULE_4__["default"])(blockOpts);
          if (maskedBlock) {
            this._blocks.push(maskedBlock);
            if (expose) this.exposeBlock = maskedBlock;

            // store block index
            if (!this._maskedBlocks[bName]) this._maskedBlocks[bName] = [];
            this._maskedBlocks[bName].push(this._blocks.length - 1);
          }
          i += bName.length - 1;
          continue;
        }
      }
      let char = pattern[i];
      let isInput = (char in defs);
      if (char === MaskedPattern.STOP_CHAR) {
        this._stops.push(this._blocks.length);
        continue;
      }
      if (char === '{' || char === '}') {
        unmaskingBlock = !unmaskingBlock;
        continue;
      }
      if (char === '[' || char === ']') {
        optionalBlock = !optionalBlock;
        continue;
      }
      if (char === MaskedPattern.ESCAPE_CHAR) {
        ++i;
        char = pattern[i];
        if (!char) break;
        isInput = false;
      }
      const def = isInput ? new _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
        isOptional: optionalBlock,
        lazy: this.lazy,
        eager: this.eager,
        placeholderChar: this.placeholderChar,
        displayChar: this.displayChar,
        ...(0,_factory_js__WEBPACK_IMPORTED_MODULE_4__.normalizeOpts)(defs[char]),
        parent: this
      }) : new _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
        char,
        eager: this.eager,
        isUnmasking: unmaskingBlock
      });
      this._blocks.push(def);
    }
  }
  get state() {
    return {
      ...super.state,
      _blocks: this._blocks.map(b => b.state)
    };
  }
  set state(state) {
    if (!state) {
      this.reset();
      return;
    }
    const {
      _blocks,
      ...maskedState
    } = state;
    this._blocks.forEach((b, bi) => b.state = _blocks[bi]);
    super.state = maskedState;
  }
  reset() {
    super.reset();
    this._blocks.forEach(b => b.reset());
  }
  get isComplete() {
    return this.exposeBlock ? this.exposeBlock.isComplete : this._blocks.every(b => b.isComplete);
  }
  get isFilled() {
    return this._blocks.every(b => b.isFilled);
  }
  get isFixed() {
    return this._blocks.every(b => b.isFixed);
  }
  get isOptional() {
    return this._blocks.every(b => b.isOptional);
  }
  doCommit() {
    this._blocks.forEach(b => b.doCommit());
    super.doCommit();
  }
  get unmaskedValue() {
    return this.exposeBlock ? this.exposeBlock.unmaskedValue : this._blocks.reduce((str, b) => str += b.unmaskedValue, '');
  }
  set unmaskedValue(unmaskedValue) {
    if (this.exposeBlock) {
      const tail = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.unmaskedValue = unmaskedValue;
      this.appendTail(tail);
      this.doCommit();
    } else super.unmaskedValue = unmaskedValue;
  }
  get value() {
    return this.exposeBlock ? this.exposeBlock.value :
    // TODO return _value when not in change?
    this._blocks.reduce((str, b) => str += b.value, '');
  }
  set value(value) {
    if (this.exposeBlock) {
      const tail = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.value = value;
      this.appendTail(tail);
      this.doCommit();
    } else super.value = value;
  }
  get typedValue() {
    return this.exposeBlock ? this.exposeBlock.typedValue : super.typedValue;
  }
  set typedValue(value) {
    if (this.exposeBlock) {
      const tail = this.extractTail(this._blockStartPos(this._blocks.indexOf(this.exposeBlock)) + this.exposeBlock.displayValue.length);
      this.exposeBlock.typedValue = value;
      this.appendTail(tail);
      this.doCommit();
    } else super.typedValue = value;
  }
  get displayValue() {
    return this._blocks.reduce((str, b) => str += b.displayValue, '');
  }
  appendTail(tail) {
    return super.appendTail(tail).aggregate(this._appendPlaceholder());
  }
  _appendEager() {
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    let startBlockIndex = this._mapPosToBlock(this.displayValue.length)?.index;
    if (startBlockIndex == null) return details;

    // TODO test if it works for nested pattern masks
    if (this._blocks[startBlockIndex].isFilled) ++startBlockIndex;
    for (let bi = startBlockIndex; bi < this._blocks.length; ++bi) {
      const d = this._blocks[bi]._appendEager();
      if (!d.inserted) break;
      details.aggregate(d);
    }
    return details;
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const blockIter = this._mapPosToBlock(this.displayValue.length);
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    if (!blockIter) return details;
    for (let bi = blockIter.index, block; block = this._blocks[bi]; ++bi) {
      const blockDetails = block._appendChar(ch, {
        ...flags,
        _beforeTailState: flags._beforeTailState?._blocks?.[bi]
      });
      details.aggregate(blockDetails);
      if (blockDetails.skip || blockDetails.rawInserted) break; // go next char
    }
    return details;
  }
  extractTail(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    const chunkTail = new _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_5__["default"]();
    if (fromPos === toPos) return chunkTail;
    this._forEachBlocksInRange(fromPos, toPos, (b, bi, bFromPos, bToPos) => {
      const blockChunk = b.extractTail(bFromPos, bToPos);
      blockChunk.stop = this._findStopBefore(bi);
      blockChunk.from = this._blockStartPos(bi);
      if (blockChunk instanceof _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_5__["default"]) blockChunk.blockIndex = bi;
      chunkTail.extend(blockChunk);
    });
    return chunkTail;
  }
  extractInput(fromPos, toPos, flags) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    if (flags === void 0) {
      flags = {};
    }
    if (fromPos === toPos) return '';
    let input = '';
    this._forEachBlocksInRange(fromPos, toPos, (b, _, fromPos, toPos) => {
      input += b.extractInput(fromPos, toPos, flags);
    });
    return input;
  }
  _findStopBefore(blockIndex) {
    let stopBefore;
    for (let si = 0; si < this._stops.length; ++si) {
      const stop = this._stops[si];
      if (stop <= blockIndex) stopBefore = stop;else break;
    }
    return stopBefore;
  }

  /** Appends placeholder depending on laziness */
  _appendPlaceholder(toBlockIndex) {
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    if (this.lazy && toBlockIndex == null) return details;
    const startBlockIter = this._mapPosToBlock(this.displayValue.length);
    if (!startBlockIter) return details;
    const startBlockIndex = startBlockIter.index;
    const endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;
    this._blocks.slice(startBlockIndex, endBlockIndex).forEach(b => {
      if (!b.lazy || toBlockIndex != null) {
        const bDetails = b._appendPlaceholder(b._blocks?.length);
        this._value += bDetails.inserted;
        details.aggregate(bDetails);
      }
    });
    return details;
  }

  /** Finds block in pos */
  _mapPosToBlock(pos) {
    let accVal = '';
    for (let bi = 0; bi < this._blocks.length; ++bi) {
      const block = this._blocks[bi];
      const blockStartPos = accVal.length;
      accVal += block.displayValue;
      if (pos <= accVal.length) {
        return {
          index: bi,
          offset: pos - blockStartPos
        };
      }
    }
  }
  _blockStartPos(blockIndex) {
    return this._blocks.slice(0, blockIndex).reduce((pos, b) => pos += b.displayValue.length, 0);
  }
  _forEachBlocksInRange(fromPos, toPos, fn) {
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    const fromBlockIter = this._mapPosToBlock(fromPos);
    if (fromBlockIter) {
      const toBlockIter = this._mapPosToBlock(toPos);
      // process first block
      const isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
      const fromBlockStartPos = fromBlockIter.offset;
      const fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].displayValue.length;
      fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);
      if (toBlockIter && !isSameBlock) {
        // process intermediate blocks
        for (let bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
          fn(this._blocks[bi], bi, 0, this._blocks[bi].displayValue.length);
        }

        // process last block
        fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
      }
    }
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    const removeDetails = super.remove(fromPos, toPos);
    this._forEachBlocksInRange(fromPos, toPos, (b, _, bFromPos, bToPos) => {
      removeDetails.aggregate(b.remove(bFromPos, bToPos));
    });
    return removeDetails;
  }
  nearestInputPos(cursorPos, direction) {
    if (direction === void 0) {
      direction = _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE;
    }
    if (!this._blocks.length) return 0;
    const cursor = new _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_6__["default"](this, cursorPos);
    if (direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE) {
      // -------------------------------------------------
      // NONE should only go out from fixed to the right!
      // -------------------------------------------------
      if (cursor.pushRightBeforeInput()) return cursor.pos;
      cursor.popState();
      if (cursor.pushLeftBeforeInput()) return cursor.pos;
      return this.displayValue.length;
    }

    // FORCE is only about a|* otherwise is 0
    if (direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.LEFT || direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_LEFT) {
      // try to break fast when *|a
      if (direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.LEFT) {
        cursor.pushRightBeforeFilled();
        if (cursor.ok && cursor.pos === cursorPos) return cursorPos;
        cursor.popState();
      }

      // forward flow
      cursor.pushLeftBeforeInput();
      cursor.pushLeftBeforeRequired();
      cursor.pushLeftBeforeFilled();

      // backward flow
      if (direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.LEFT) {
        cursor.pushRightBeforeInput();
        cursor.pushRightBeforeRequired();
        if (cursor.ok && cursor.pos <= cursorPos) return cursor.pos;
        cursor.popState();
        if (cursor.ok && cursor.pos <= cursorPos) return cursor.pos;
        cursor.popState();
      }
      if (cursor.ok) return cursor.pos;
      if (direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_LEFT) return 0;
      cursor.popState();
      if (cursor.ok) return cursor.pos;
      cursor.popState();
      if (cursor.ok) return cursor.pos;
      return 0;
    }
    if (direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.RIGHT || direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_RIGHT) {
      // forward flow
      cursor.pushRightBeforeInput();
      cursor.pushRightBeforeRequired();
      if (cursor.pushRightBeforeFilled()) return cursor.pos;
      if (direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_RIGHT) return this.displayValue.length;

      // backward flow
      cursor.popState();
      if (cursor.ok) return cursor.pos;
      cursor.popState();
      if (cursor.ok) return cursor.pos;
      return this.nearestInputPos(cursorPos, _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.LEFT);
    }
    return cursorPos;
  }
  totalInputPositions(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    let total = 0;
    this._forEachBlocksInRange(fromPos, toPos, (b, _, bFromPos, bToPos) => {
      total += b.totalInputPositions(bFromPos, bToPos);
    });
    return total;
  }

  /** Get block by name */
  maskedBlock(name) {
    return this.maskedBlocks(name)[0];
  }

  /** Get all blocks by name */
  maskedBlocks(name) {
    const indices = this._maskedBlocks[name];
    if (!indices) return [];
    return indices.map(gi => this._blocks[gi]);
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedPattern = MaskedPattern;


/***/ }),
/* 29 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ChunksTailDetails)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);




class ChunksTailDetails {
  /** */

  constructor(chunks, from) {
    if (chunks === void 0) {
      chunks = [];
    }
    if (from === void 0) {
      from = 0;
    }
    this.chunks = chunks;
    this.from = from;
  }
  toString() {
    return this.chunks.map(String).join('');
  }
  extend(tailChunk) {
    if (!String(tailChunk)) return;
    tailChunk = (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString)(tailChunk) ? new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__["default"](String(tailChunk)) : tailChunk;
    const lastChunk = this.chunks[this.chunks.length - 1];
    const extendLast = lastChunk && (
    // if stops are same or tail has no stop
    lastChunk.stop === tailChunk.stop || tailChunk.stop == null) &&
    // if tail chunk goes just after last chunk
    tailChunk.from === lastChunk.from + lastChunk.toString().length;
    if (tailChunk instanceof _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__["default"]) {
      // check the ability to extend previous chunk
      if (extendLast) {
        // extend previous chunk
        lastChunk.extend(tailChunk.toString());
      } else {
        // append new chunk
        this.chunks.push(tailChunk);
      }
    } else if (tailChunk instanceof ChunksTailDetails) {
      if (tailChunk.stop == null) {
        // unwrap floating chunks to parent, keeping `from` pos
        let firstTailChunk;
        while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
          firstTailChunk = tailChunk.chunks.shift(); // not possible to be `undefined` because length was checked above
          firstTailChunk.from += tailChunk.from;
          this.extend(firstTailChunk);
        }
      }

      // if tail chunk still has value
      if (tailChunk.toString()) {
        // if chunks contains stops, then popup stop to container
        tailChunk.stop = tailChunk.blockIndex;
        this.chunks.push(tailChunk);
      }
    }
  }
  appendTo(masked) {
    if (!(masked instanceof _core_holder_js__WEBPACK_IMPORTED_MODULE_3__["default"].MaskedPattern)) {
      const tail = new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__["default"](this.toString());
      return tail.appendTo(masked);
    }
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    for (let ci = 0; ci < this.chunks.length && !details.skip; ++ci) {
      const chunk = this.chunks[ci];
      const lastBlockIter = masked._mapPosToBlock(masked.displayValue.length);
      const stop = chunk.stop;
      let chunkBlock;
      if (stop != null && (
      // if block not found or stop is behind lastBlock
      !lastBlockIter || lastBlockIter.index <= stop)) {
        if (chunk instanceof ChunksTailDetails ||
        // for continuous block also check if stop is exist
        masked._stops.indexOf(stop) >= 0) {
          const phDetails = masked._appendPlaceholder(stop);
          details.aggregate(phDetails);
        }
        chunkBlock = chunk instanceof ChunksTailDetails && masked._blocks[stop];
      }
      if (chunkBlock) {
        const tailDetails = chunkBlock.appendTail(chunk);
        tailDetails.skip = false; // always ignore skip, it will be set on last
        details.aggregate(tailDetails);
        masked._value += tailDetails.inserted;

        // get not inserted chars
        const remainChars = chunk.toString().slice(tailDetails.rawInserted.length);
        if (remainChars) details.aggregate(masked.append(remainChars, {
          tail: true
        }));
      } else {
        details.aggregate(masked.append(chunk.toString(), {
          tail: true
        }));
      }
    }
    return details;
  }
  get state() {
    return {
      chunks: this.chunks.map(c => c.state),
      from: this.from,
      stop: this.stop,
      blockIndex: this.blockIndex
    };
  }
  set state(state) {
    const {
      chunks,
      ...props
    } = state;
    Object.assign(this, props);
    this.chunks = chunks.map(cstate => {
      const chunk = "chunks" in cstate ? new ChunksTailDetails() : new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
      chunk.state = cstate;
      return chunk;
    });
  }
  unshift(beforePos) {
    if (!this.chunks.length || beforePos != null && this.from >= beforePos) return '';
    const chunkShiftPos = beforePos != null ? beforePos - this.from : beforePos;
    let ci = 0;
    while (ci < this.chunks.length) {
      const chunk = this.chunks[ci];
      const shiftChar = chunk.unshift(chunkShiftPos);
      if (chunk.toString()) {
        // chunk still contains value
        // but not shifted - means no more available chars to shift
        if (!shiftChar) break;
        ++ci;
      } else {
        // clean if chunk has no value
        this.chunks.splice(ci, 1);
      }
      if (shiftChar) return shiftChar;
    }
    return '';
  }
  shift() {
    if (!this.chunks.length) return '';
    let ci = this.chunks.length - 1;
    while (0 <= ci) {
      const chunk = this.chunks[ci];
      const shiftChar = chunk.shift();
      if (chunk.toString()) {
        // chunk still contains value
        // but not shifted - means no more available chars to shift
        if (!shiftChar) break;
        --ci;
      } else {
        // clean if chunk has no value
        this.chunks.splice(ci, 1);
      }
      if (shiftChar) return shiftChar;
    }
    return '';
  }
}


/***/ }),
/* 30 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PatternCursor)
/* harmony export */ });
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);

class PatternCursor {
  constructor(masked, pos) {
    this.masked = masked;
    this._log = [];
    const {
      offset,
      index
    } = masked._mapPosToBlock(pos) || (pos < 0 ?
    // first
    {
      index: 0,
      offset: 0
    } :
    // last
    {
      index: this.masked._blocks.length,
      offset: 0
    });
    this.offset = offset;
    this.index = index;
    this.ok = false;
  }
  get block() {
    return this.masked._blocks[this.index];
  }
  get pos() {
    return this.masked._blockStartPos(this.index) + this.offset;
  }
  get state() {
    return {
      index: this.index,
      offset: this.offset,
      ok: this.ok
    };
  }
  set state(s) {
    Object.assign(this, s);
  }
  pushState() {
    this._log.push(this.state);
  }
  popState() {
    const s = this._log.pop();
    if (s) this.state = s;
    return s;
  }
  bindBlock() {
    if (this.block) return;
    if (this.index < 0) {
      this.index = 0;
      this.offset = 0;
    }
    if (this.index >= this.masked._blocks.length) {
      this.index = this.masked._blocks.length - 1;
      this.offset = this.block.displayValue.length; // TODO this is stupid type error, `block` depends on index that was changed above
    }
  }
  _pushLeft(fn) {
    this.pushState();
    for (this.bindBlock(); 0 <= this.index; --this.index, this.offset = this.block?.displayValue.length || 0) {
      if (fn()) return this.ok = true;
    }
    return this.ok = false;
  }
  _pushRight(fn) {
    this.pushState();
    for (this.bindBlock(); this.index < this.masked._blocks.length; ++this.index, this.offset = 0) {
      if (fn()) return this.ok = true;
    }
    return this.ok = false;
  }
  pushLeftBeforeFilled() {
    return this._pushLeft(() => {
      if (this.block.isFixed || !this.block.value) return;
      this.offset = this.block.nearestInputPos(this.offset, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.FORCE_LEFT);
      if (this.offset !== 0) return true;
    });
  }
  pushLeftBeforeInput() {
    // cases:
    // filled input: 00|
    // optional empty input: 00[]|
    // nested block: XX<[]>|
    return this._pushLeft(() => {
      if (this.block.isFixed) return;
      this.offset = this.block.nearestInputPos(this.offset, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.LEFT);
      return true;
    });
  }
  pushLeftBeforeRequired() {
    return this._pushLeft(() => {
      if (this.block.isFixed || this.block.isOptional && !this.block.value) return;
      this.offset = this.block.nearestInputPos(this.offset, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.LEFT);
      return true;
    });
  }
  pushRightBeforeFilled() {
    return this._pushRight(() => {
      if (this.block.isFixed || !this.block.value) return;
      this.offset = this.block.nearestInputPos(this.offset, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.FORCE_RIGHT);
      if (this.offset !== this.block.value.length) return true;
    });
  }
  pushRightBeforeInput() {
    return this._pushRight(() => {
      if (this.block.isFixed) return;

      // const o = this.offset;
      this.offset = this.block.nearestInputPos(this.offset, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NONE);
      // HACK cases like (STILL DOES NOT WORK FOR NESTED)
      // aa|X
      // aa<X|[]>X_    - this will not work
      // if (o && o === this.offset && this.block instanceof PatternInputDefinition) continue;
      return true;
    });
  }
  pushRightBeforeRequired() {
    return this._pushRight(() => {
      if (this.block.isFixed || this.block.isOptional && !this.block.value) return;

      // TODO check |[*]XX_
      this.offset = this.block.nearestInputPos(this.offset, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NONE);
      return true;
    });
  }
}


/***/ }),
/* 31 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PatternFixedDefinition)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(26);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);




class PatternFixedDefinition {
  /** */

  /** */

  /** */

  /** */

  /** */

  /** */

  constructor(opts) {
    Object.assign(this, opts);
    this._value = '';
    this.isFixed = true;
  }
  get value() {
    return this._value;
  }
  get unmaskedValue() {
    return this.isUnmasking ? this.value : '';
  }
  get rawInputValue() {
    return this._isRawInput ? this.value : '';
  }
  get displayValue() {
    return this.value;
  }
  reset() {
    this._isRawInput = false;
    this._value = '';
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this._value.length;
    }
    this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
    if (!this._value) this._isRawInput = false;
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  nearestInputPos(cursorPos, direction) {
    if (direction === void 0) {
      direction = _core_utils_js__WEBPACK_IMPORTED_MODULE_1__.DIRECTION.NONE;
    }
    const minPos = 0;
    const maxPos = this._value.length;
    switch (direction) {
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_1__.DIRECTION.LEFT:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_1__.DIRECTION.FORCE_LEFT:
        return minPos;
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_1__.DIRECTION.NONE:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_1__.DIRECTION.RIGHT:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_1__.DIRECTION.FORCE_RIGHT:
      default:
        return maxPos;
    }
  }
  totalInputPositions(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this._value.length;
    }
    return this._isRawInput ? toPos - fromPos : 0;
  }
  extractInput(fromPos, toPos, flags) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this._value.length;
    }
    if (flags === void 0) {
      flags = {};
    }
    return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || '';
  }
  get isComplete() {
    return true;
  }
  get isFilled() {
    return Boolean(this._value);
  }
  _appendChar(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    if (this.isFilled) return details;
    const appendEager = this.eager === true || this.eager === 'append';
    const appended = this.char === ch;
    const isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && (!flags.raw || !appendEager) && !flags.tail;
    if (isResolved) details.rawInserted = this.char;
    this._value = details.inserted = this.char;
    this._isRawInput = isResolved && (flags.raw || flags.input);
    return details;
  }
  _appendEager() {
    return this._appendChar(this.char, {
      tail: true
    });
  }
  _appendPlaceholder() {
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    if (this.isFilled) return details;
    this._value = details.inserted = this.char;
    return details;
  }
  extractTail() {
    return new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__["default"]('');
  }
  appendTail(tail) {
    if ((0,_core_utils_js__WEBPACK_IMPORTED_MODULE_1__.isString)(tail)) tail = new _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_2__["default"](String(tail));
    return tail.appendTo(this);
  }
  append(str, flags, tail) {
    const details = this._appendChar(str[0], flags);
    if (tail != null) {
      details.tailShift += this.appendTail(tail).tailShift;
    }
    return details;
  }
  doCommit() {}
  get state() {
    return {
      _value: this._value,
      _rawInputValue: this.rawInputValue
    };
  }
  set state(state) {
    this._value = state._value;
    this._isRawInput = Boolean(state._rawInputValue);
  }
}


/***/ }),
/* 32 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PatternInputDefinition)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);




class PatternInputDefinition {
  static DEFAULT_DEFINITIONS = {
    '0': /\d/,
    'a': /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
    // http://stackoverflow.com/a/22075070
    '*': /./
  };

  /** */

  /** */

  /** */

  /** */

  /** */

  /** */

  /** */

  /** */

  constructor(opts) {
    const {
      parent,
      isOptional,
      placeholderChar,
      displayChar,
      lazy,
      eager,
      ...maskOpts
    } = opts;
    this.masked = (0,_factory_js__WEBPACK_IMPORTED_MODULE_0__["default"])(maskOpts);
    Object.assign(this, {
      parent,
      isOptional,
      placeholderChar,
      displayChar,
      lazy,
      eager
    });
  }
  reset() {
    this.isFilled = false;
    this.masked.reset();
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.value.length;
    }
    if (fromPos === 0 && toPos >= 1) {
      this.isFilled = false;
      return this.masked.remove(fromPos, toPos);
    }
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
  get value() {
    return this.masked.value || (this.isFilled && !this.isOptional ? this.placeholderChar : '');
  }
  get unmaskedValue() {
    return this.masked.unmaskedValue;
  }
  get rawInputValue() {
    return this.masked.rawInputValue;
  }
  get displayValue() {
    return this.masked.value && this.displayChar || this.value;
  }
  get isComplete() {
    return Boolean(this.masked.value) || this.isOptional;
  }
  _appendChar(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    if (this.isFilled) return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    const state = this.masked.state;
    // simulate input
    const details = this.masked._appendChar(ch, this.currentMaskFlags(flags));
    if (details.inserted && this.doValidate(flags) === false) {
      details.inserted = details.rawInserted = '';
      this.masked.state = state;
    }
    if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) {
      details.inserted = this.placeholderChar;
    }
    details.skip = !details.inserted && !this.isOptional;
    this.isFilled = Boolean(details.inserted);
    return details;
  }
  append(str, flags, tail) {
    // TODO probably should be done via _appendChar
    return this.masked.append(str, this.currentMaskFlags(flags), tail);
  }
  _appendPlaceholder() {
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    if (this.isFilled || this.isOptional) return details;
    this.isFilled = true;
    details.inserted = this.placeholderChar;
    return details;
  }
  _appendEager() {
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
  }
  extractTail(fromPos, toPos) {
    return this.masked.extractTail(fromPos, toPos);
  }
  appendTail(tail) {
    return this.masked.appendTail(tail);
  }
  extractInput(fromPos, toPos, flags) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.value.length;
    }
    return this.masked.extractInput(fromPos, toPos, flags);
  }
  nearestInputPos(cursorPos, direction) {
    if (direction === void 0) {
      direction = _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE;
    }
    const minPos = 0;
    const maxPos = this.value.length;
    const boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);
    switch (direction) {
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.LEFT:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_LEFT:
        return this.isComplete ? boundPos : minPos;
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.RIGHT:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.FORCE_RIGHT:
        return this.isComplete ? boundPos : maxPos;
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_2__.DIRECTION.NONE:
      default:
        return boundPos;
    }
  }
  totalInputPositions(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.value.length;
    }
    return this.value.slice(fromPos, toPos).length;
  }
  doValidate(flags) {
    return this.masked.doValidate(this.currentMaskFlags(flags)) && (!this.parent || this.parent.doValidate(this.currentMaskFlags(flags)));
  }
  doCommit() {
    this.masked.doCommit();
  }
  get state() {
    return {
      _value: this.value,
      _rawInputValue: this.rawInputValue,
      masked: this.masked.state,
      isFilled: this.isFilled
    };
  }
  set state(state) {
    this.masked.state = state.masked;
    this.isFilled = state.isFilled;
  }
  currentMaskFlags(flags) {
    return {
      ...flags,
      _beforeTailState: flags?._beforeTailState?.masked || flags?._beforeTailState
    };
  }
}


/***/ }),
/* 33 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedRegExp)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);






/** Masking by RegExp */
class MaskedRegExp extends _base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** */

  /** Enable characters overwriting */

  /** */

  /** */

  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    const mask = opts.mask;
    if (mask) opts.validate = value => value.search(mask) >= 0;
    super._update(opts);
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedRegExp = MaskedRegExp;


/***/ }),
/* 34 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedRange)
/* harmony export */ });
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _pattern_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(28);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(25);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17);
/* harmony import */ var _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(29);
/* harmony import */ var _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(30);
/* harmony import */ var _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(31);
/* harmony import */ var _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(32);
/* harmony import */ var _regexp_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(33);













/** Pattern which accepts ranges */
class MaskedRange extends _pattern_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  /**
    Optionally sets max length of pattern.
    Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
  */

  /** Min bound */

  /** Max bound */

  /** */

  get _matchFrom() {
    return this.maxLength - String(this.from).length;
  }
  constructor(opts) {
    super(opts); // mask will be created in _update
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    const {
      to = this.to || 0,
      from = this.from || 0,
      maxLength = this.maxLength || 0,
      autofix = this.autofix,
      ...patternOpts
    } = opts;
    this.to = to;
    this.from = from;
    this.maxLength = Math.max(String(to).length, maxLength);
    this.autofix = autofix;
    const fromStr = String(this.from).padStart(this.maxLength, '0');
    const toStr = String(this.to).padStart(this.maxLength, '0');
    let sameCharsCount = 0;
    while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) ++sameCharsCount;
    patternOpts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, '\\0') + '0'.repeat(this.maxLength - sameCharsCount);
    super._update(patternOpts);
  }
  get isComplete() {
    return super.isComplete && Boolean(this.value);
  }
  boundaries(str) {
    let minstr = '';
    let maxstr = '';
    const [, placeholder, num] = str.match(/^(\D*)(\d*)(\D*)/) || [];
    if (num) {
      minstr = '0'.repeat(placeholder.length) + num;
      maxstr = '9'.repeat(placeholder.length) + num;
    }
    minstr = minstr.padEnd(this.maxLength, '0');
    maxstr = maxstr.padEnd(this.maxLength, '9');
    return [minstr, maxstr];
  }
  doPrepareChar(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    let details;
    [ch, details] = super.doPrepareChar(ch.replace(/\D/g, ''), flags);
    if (!this.autofix || !ch) {
      details.skip = !this.isComplete;
      return [ch, details];
    }
    const fromStr = String(this.from).padStart(this.maxLength, '0');
    const toStr = String(this.to).padStart(this.maxLength, '0');
    const nextVal = this.value + ch;
    if (nextVal.length > this.maxLength) return ['', details];
    const [minstr, maxstr] = this.boundaries(nextVal);
    if (Number(maxstr) < this.from) return [fromStr[nextVal.length - 1], details];
    if (Number(minstr) > this.to) {
      if (this.autofix === 'pad' && nextVal.length < this.maxLength) {
        return ['', details.aggregate(this.append(fromStr[nextVal.length - 1] + ch, flags))];
      }
      return [toStr[nextVal.length - 1], details];
    }
    return [ch, details];
  }
  doValidate(flags) {
    const str = this.value;
    const firstNonZero = str.search(/[^0]/);
    if (firstNonZero === -1 && str.length <= this._matchFrom) return true;
    const [minstr, maxstr] = this.boundaries(str);
    return this.from <= Number(maxstr) && Number(minstr) <= this.to && super.doValidate(flags);
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_0__["default"].MaskedRange = MaskedRange;


/***/ }),
/* 35 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedDynamic)
/* harmony export */ });
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(18);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26);







/** Dynamic mask for choosing appropriate mask in run-time */
class MaskedDynamic extends _base_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  static DEFAULTS;

  /** Currently chosen mask */

  /** Currently chosen mask */

  /** Compliled {@link Masked} options */

  /** Chooses {@link Masked} depending on input value */

  constructor(opts) {
    super({
      ...MaskedDynamic.DEFAULTS,
      ...opts
    });
    this.currentMask = undefined;
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    super._update(opts);
    if ('mask' in opts) {
      this.exposeMask = undefined;
      // mask could be totally dynamic with only `dispatch` option
      this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(m => {
        const {
          expose,
          ...maskOpts
        } = (0,_factory_js__WEBPACK_IMPORTED_MODULE_2__.normalizeOpts)(m);
        const masked = (0,_factory_js__WEBPACK_IMPORTED_MODULE_2__["default"])({
          overwrite: this._overwrite,
          eager: this._eager,
          skipInvalid: this._skipInvalid,
          ...maskOpts
        });
        if (expose) this.exposeMask = masked;
        return masked;
      }) : [];

      // this.currentMask = this.doDispatch(''); // probably not needed but lets see
    }
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const details = this._applyDispatch(ch, flags);
    if (this.currentMask) {
      details.aggregate(this.currentMask._appendChar(ch, this.currentMaskFlags(flags)));
    }
    return details;
  }
  _applyDispatch(appended, flags, tail) {
    if (appended === void 0) {
      appended = '';
    }
    if (flags === void 0) {
      flags = {};
    }
    if (tail === void 0) {
      tail = '';
    }
    const prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
    const inputValue = this.rawInputValue;
    const insertValue = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._rawInputValue : inputValue;
    const tailValue = inputValue.slice(insertValue.length);
    const prevMask = this.currentMask;
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    const prevMaskState = prevMask?.state;

    // clone flags to prevent overwriting `_beforeTailState`
    this.currentMask = this.doDispatch(appended, {
      ...flags
    }, tail);

    // restore state after dispatch
    if (this.currentMask) {
      if (this.currentMask !== prevMask) {
        // if mask changed reapply input
        this.currentMask.reset();
        if (insertValue) {
          const d = this.currentMask.append(insertValue, {
            raw: true
          });
          details.tailShift = d.inserted.length - prevValueBeforeTail.length;
        }
        if (tailValue) {
          details.tailShift += this.currentMask.append(tailValue, {
            raw: true,
            tail: true
          }).tailShift;
        }
      } else if (prevMaskState) {
        // Dispatch can do something bad with state, so
        // restore prev mask state
        this.currentMask.state = prevMaskState;
      }
    }
    return details;
  }
  _appendPlaceholder() {
    const details = this._applyDispatch();
    if (this.currentMask) {
      details.aggregate(this.currentMask._appendPlaceholder());
    }
    return details;
  }
  _appendEager() {
    const details = this._applyDispatch();
    if (this.currentMask) {
      details.aggregate(this.currentMask._appendEager());
    }
    return details;
  }
  appendTail(tail) {
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    if (tail) details.aggregate(this._applyDispatch('', {}, tail));
    return details.aggregate(this.currentMask ? this.currentMask.appendTail(tail) : super.appendTail(tail));
  }
  currentMaskFlags(flags) {
    return {
      ...flags,
      _beforeTailState: flags._beforeTailState?.currentMaskRef === this.currentMask && flags._beforeTailState?.currentMask || flags._beforeTailState
    };
  }
  doDispatch(appended, flags, tail) {
    if (flags === void 0) {
      flags = {};
    }
    if (tail === void 0) {
      tail = '';
    }
    return this.dispatch(appended, this, flags, tail);
  }
  doValidate(flags) {
    return super.doValidate(flags) && (!this.currentMask || this.currentMask.doValidate(this.currentMaskFlags(flags)));
  }
  doPrepare(str, flags) {
    if (flags === void 0) {
      flags = {};
    }
    let [s, details] = super.doPrepare(str, flags);
    if (this.currentMask) {
      let currentDetails;
      [s, currentDetails] = super.doPrepare(s, this.currentMaskFlags(flags));
      details = details.aggregate(currentDetails);
    }
    return [s, details];
  }
  doPrepareChar(str, flags) {
    if (flags === void 0) {
      flags = {};
    }
    let [s, details] = super.doPrepareChar(str, flags);
    if (this.currentMask) {
      let currentDetails;
      [s, currentDetails] = super.doPrepareChar(s, this.currentMaskFlags(flags));
      details = details.aggregate(currentDetails);
    }
    return [s, details];
  }
  reset() {
    this.currentMask?.reset();
    this.compiledMasks.forEach(m => m.reset());
  }
  get value() {
    return this.exposeMask ? this.exposeMask.value : this.currentMask ? this.currentMask.value : '';
  }
  set value(value) {
    if (this.exposeMask) {
      this.exposeMask.value = value;
      this.currentMask = this.exposeMask;
      this._applyDispatch();
    } else super.value = value;
  }
  get unmaskedValue() {
    return this.exposeMask ? this.exposeMask.unmaskedValue : this.currentMask ? this.currentMask.unmaskedValue : '';
  }
  set unmaskedValue(unmaskedValue) {
    if (this.exposeMask) {
      this.exposeMask.unmaskedValue = unmaskedValue;
      this.currentMask = this.exposeMask;
      this._applyDispatch();
    } else super.unmaskedValue = unmaskedValue;
  }
  get typedValue() {
    return this.exposeMask ? this.exposeMask.typedValue : this.currentMask ? this.currentMask.typedValue : '';
  }
  set typedValue(typedValue) {
    if (this.exposeMask) {
      this.exposeMask.typedValue = typedValue;
      this.currentMask = this.exposeMask;
      this._applyDispatch();
      return;
    }
    let unmaskedValue = String(typedValue);

    // double check it
    if (this.currentMask) {
      this.currentMask.typedValue = typedValue;
      unmaskedValue = this.currentMask.unmaskedValue;
    }
    this.unmaskedValue = unmaskedValue;
  }
  get displayValue() {
    return this.currentMask ? this.currentMask.displayValue : '';
  }
  get isComplete() {
    return Boolean(this.currentMask?.isComplete);
  }
  get isFilled() {
    return Boolean(this.currentMask?.isFilled);
  }
  remove(fromPos, toPos) {
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    if (this.currentMask) {
      details.aggregate(this.currentMask.remove(fromPos, toPos))
      // update with dispatch
      .aggregate(this._applyDispatch());
    }
    return details;
  }
  get state() {
    return {
      ...super.state,
      _rawInputValue: this.rawInputValue,
      compiledMasks: this.compiledMasks.map(m => m.state),
      currentMaskRef: this.currentMask,
      currentMask: this.currentMask?.state
    };
  }
  set state(state) {
    const {
      compiledMasks,
      currentMaskRef,
      currentMask,
      ...maskedState
    } = state;
    if (compiledMasks) this.compiledMasks.forEach((m, mi) => m.state = compiledMasks[mi]);
    if (currentMaskRef != null) {
      this.currentMask = currentMaskRef;
      this.currentMask.state = currentMask;
    }
    super.state = maskedState;
  }
  extractInput(fromPos, toPos, flags) {
    return this.currentMask ? this.currentMask.extractInput(fromPos, toPos, flags) : '';
  }
  extractTail(fromPos, toPos) {
    return this.currentMask ? this.currentMask.extractTail(fromPos, toPos) : super.extractTail(fromPos, toPos);
  }
  doCommit() {
    if (this.currentMask) this.currentMask.doCommit();
    super.doCommit();
  }
  nearestInputPos(cursorPos, direction) {
    return this.currentMask ? this.currentMask.nearestInputPos(cursorPos, direction) : super.nearestInputPos(cursorPos, direction);
  }
  get overwrite() {
    return this.currentMask ? this.currentMask.overwrite : this._overwrite;
  }
  set overwrite(overwrite) {
    this._overwrite = overwrite;
  }
  get eager() {
    return this.currentMask ? this.currentMask.eager : this._eager;
  }
  set eager(eager) {
    this._eager = eager;
  }
  get skipInvalid() {
    return this.currentMask ? this.currentMask.skipInvalid : this._skipInvalid;
  }
  set skipInvalid(skipInvalid) {
    this._skipInvalid = skipInvalid;
  }
  maskEquals(mask) {
    return Array.isArray(mask) ? this.compiledMasks.every((m, mi) => {
      if (!mask[mi]) return;
      const {
        mask: oldMask,
        ...restOpts
      } = mask[mi];
      return (0,_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.objectIncludes)(m, restOpts) && m.maskEquals(oldMask);
    }) : super.maskEquals(mask);
  }
  typedValueEquals(value) {
    return Boolean(this.currentMask?.typedValueEquals(value));
  }
}
MaskedDynamic.DEFAULTS = {
  dispatch: (appended, masked, flags, tail) => {
    if (!masked.compiledMasks.length) return;
    const inputValue = masked.rawInputValue;

    // simulate input
    const inputs = masked.compiledMasks.map((m, index) => {
      const isCurrent = masked.currentMask === m;
      const startInputPos = isCurrent ? m.displayValue.length : m.nearestInputPos(m.displayValue.length, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.FORCE_LEFT);
      if (m.rawInputValue !== inputValue) {
        m.reset();
        m.append(inputValue, {
          raw: true
        });
      } else if (!isCurrent) {
        m.remove(startInputPos);
      }
      m.append(appended, masked.currentMaskFlags(flags));
      m.appendTail(tail);
      return {
        index,
        weight: m.rawInputValue.length,
        totalInputPositions: m.totalInputPositions(0, Math.max(startInputPos, m.nearestInputPos(m.displayValue.length, _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.FORCE_LEFT)))
      };
    });

    // pop masks with longer values first
    inputs.sort((i1, i2) => i2.weight - i1.weight || i2.totalInputPositions - i1.totalInputPositions);
    return masked.compiledMasks[inputs[0].index];
  }
};
_core_holder_js__WEBPACK_IMPORTED_MODULE_4__["default"].MaskedDynamic = MaskedDynamic;


/***/ }),
/* 36 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedEnum)
/* harmony export */ });
/* harmony import */ var _pattern_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(28);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(25);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17);
/* harmony import */ var _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(29);
/* harmony import */ var _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(30);
/* harmony import */ var _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(31);
/* harmony import */ var _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(32);
/* harmony import */ var _regexp_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(33);













/** Pattern which validates enum values */
class MaskedEnum extends _pattern_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(opts) {
    super(opts); // mask will be created in _update
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    const {
      enum: _enum,
      ...eopts
    } = opts;
    if (_enum) {
      const lengths = _enum.map(e => e.length);
      const requiredLength = Math.min(...lengths);
      const optionalLength = Math.max(...lengths) - requiredLength;
      eopts.mask = '*'.repeat(requiredLength);
      if (optionalLength) eopts.mask += '[' + '*'.repeat(optionalLength) + ']';
      this.enum = _enum;
    }
    super._update(eopts);
  }
  doValidate(flags) {
    return this.enum.some(e => e.indexOf(this.unmaskedValue) === 0) && super.doValidate(flags);
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedEnum = MaskedEnum;


/***/ }),
/* 37 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedFunction)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(26);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);






/** Masking by custom Function */
class MaskedFunction extends _base_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /** */

  /** Enable characters overwriting */

  /** */

  /** */

  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    super._update({
      ...opts,
      validate: opts.mask
    });
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].MaskedFunction = MaskedFunction;


/***/ }),
/* 38 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaskedNumber)
/* harmony export */ });
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(15);
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(24);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(18);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26);






/** Number mask */
class MaskedNumber extends _base_js__WEBPACK_IMPORTED_MODULE_2__["default"] {
  static UNMASKED_RADIX = '.';
  static EMPTY_VALUES = [..._base_js__WEBPACK_IMPORTED_MODULE_2__["default"].EMPTY_VALUES, 0];
  static DEFAULTS = {
    mask: Number,
    radix: ',',
    thousandsSeparator: '',
    mapToRadix: [MaskedNumber.UNMASKED_RADIX],
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    scale: 2,
    normalizeZeros: true,
    padFractionalZeros: false,
    parse: Number,
    format: n => n.toLocaleString('en-US', {
      useGrouping: false,
      maximumFractionDigits: 20
    })
  };

  /** Single char */

  /** Single char */

  /** Array of single chars */

  /** */

  /** */

  /** Digits after point */

  /** Flag to remove leading and trailing zeros in the end of editing */

  /** Flag to pad trailing zeros after point in the end of editing */

  /** Enable characters overwriting */

  /** */

  /** */

  /** Format typed value to string */

  /** Parse string to get typed value */

  constructor(opts) {
    super({
      ...MaskedNumber.DEFAULTS,
      ...opts
    });
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    super._update(opts);
    this._updateRegExps();
  }
  _updateRegExps() {
    const start = '^' + (this.allowNegative ? '[+|\\-]?' : '');
    const mid = '\\d*';
    const end = (this.scale ? `(${(0,_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)(this.radix)}\\d{0,${this.scale}})?` : '') + '$';
    this._numberRegExp = new RegExp(start + mid + end);
    this._mapToRadixRegExp = new RegExp(`[${this.mapToRadix.map(_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp).join('')}]`, 'g');
    this._thousandsSeparatorRegExp = new RegExp((0,_core_utils_js__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)(this.thousandsSeparator), 'g');
  }
  _removeThousandsSeparators(value) {
    return value.replace(this._thousandsSeparatorRegExp, '');
  }
  _insertThousandsSeparators(value) {
    // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    const parts = value.split(this.radix);
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
    return parts.join(this.radix);
  }
  doPrepareChar(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const [prepCh, details] = super.doPrepareChar(this._removeThousandsSeparators(this.scale && this.mapToRadix.length && (
    /*
      radix should be mapped when
      1) input is done from keyboard = flags.input && flags.raw
      2) unmasked value is set = !flags.input && !flags.raw
      and should not be mapped when
      1) value is set = flags.input && !flags.raw
      2) raw value is set = !flags.input && flags.raw
    */
    flags.input && flags.raw || !flags.input && !flags.raw) ? ch.replace(this._mapToRadixRegExp, this.radix) : ch), flags);
    if (ch && !prepCh) details.skip = true;
    if (prepCh && !this.allowPositive && !this.value && prepCh !== '-') details.aggregate(this._appendChar('-'));
    return [prepCh, details];
  }
  _separatorsCount(to, extendOnSeparators) {
    if (extendOnSeparators === void 0) {
      extendOnSeparators = false;
    }
    let count = 0;
    for (let pos = 0; pos < to; ++pos) {
      if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
        ++count;
        if (extendOnSeparators) to += this.thousandsSeparator.length;
      }
    }
    return count;
  }
  _separatorsCountFromSlice(slice) {
    if (slice === void 0) {
      slice = this._value;
    }
    return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
  }
  extractInput(fromPos, toPos, flags) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    [fromPos, toPos] = this._adjustRangeWithSeparators(fromPos, toPos);
    return this._removeThousandsSeparators(super.extractInput(fromPos, toPos, flags));
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    if (!this.thousandsSeparator) return super._appendCharRaw(ch, flags);
    const prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
    const prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);
    this._value = this._removeThousandsSeparators(this.value);
    const appendDetails = super._appendCharRaw(ch, flags);
    this._value = this._insertThousandsSeparators(this._value);
    const beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;
    const beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);
    appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
    appendDetails.skip = !appendDetails.rawInserted && ch === this.thousandsSeparator;
    return appendDetails;
  }
  _findSeparatorAround(pos) {
    if (this.thousandsSeparator) {
      const searchFrom = pos - this.thousandsSeparator.length + 1;
      const separatorPos = this.value.indexOf(this.thousandsSeparator, searchFrom);
      if (separatorPos <= pos) return separatorPos;
    }
    return -1;
  }
  _adjustRangeWithSeparators(from, to) {
    const separatorAroundFromPos = this._findSeparatorAround(from);
    if (separatorAroundFromPos >= 0) from = separatorAroundFromPos;
    const separatorAroundToPos = this._findSeparatorAround(to);
    if (separatorAroundToPos >= 0) to = separatorAroundToPos + this.thousandsSeparator.length;
    return [from, to];
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    [fromPos, toPos] = this._adjustRangeWithSeparators(fromPos, toPos);
    const valueBeforePos = this.value.slice(0, fromPos);
    const valueAfterPos = this.value.slice(toPos);
    const prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);
    this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));
    const beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);
    return new _core_change_details_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
      tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
    });
  }
  nearestInputPos(cursorPos, direction) {
    if (!this.thousandsSeparator) return cursorPos;
    switch (direction) {
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.NONE:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.LEFT:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.FORCE_LEFT:
        {
          const separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);
          if (separatorAtLeftPos >= 0) {
            const separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;
            if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.FORCE_LEFT) {
              return separatorAtLeftPos;
            }
          }
          break;
        }
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.RIGHT:
      case _core_utils_js__WEBPACK_IMPORTED_MODULE_0__.DIRECTION.FORCE_RIGHT:
        {
          const separatorAtRightPos = this._findSeparatorAround(cursorPos);
          if (separatorAtRightPos >= 0) {
            return separatorAtRightPos + this.thousandsSeparator.length;
          }
        }
    }
    return cursorPos;
  }
  doValidate(flags) {
    // validate as string
    let valid = Boolean(this._removeThousandsSeparators(this.value).match(this._numberRegExp));
    if (valid) {
      // validate as number
      const number = this.number;
      valid = valid && !isNaN(number) && (
      // check min bound for negative values
      this.min == null || this.min >= 0 || this.min <= this.number) && (
      // check max bound for positive values
      this.max == null || this.max <= 0 || this.number <= this.max);
    }
    return valid && super.doValidate(flags);
  }
  doCommit() {
    if (this.value) {
      const number = this.number;
      let validnum = number;

      // check bounds
      if (this.min != null) validnum = Math.max(validnum, this.min);
      if (this.max != null) validnum = Math.min(validnum, this.max);
      if (validnum !== number) this.unmaskedValue = this.format(validnum, this);
      let formatted = this.value;
      if (this.normalizeZeros) formatted = this._normalizeZeros(formatted);
      if (this.padFractionalZeros && this.scale > 0) formatted = this._padFractionalZeros(formatted);
      this._value = formatted;
    }
    super.doCommit();
  }
  _normalizeZeros(value) {
    const parts = this._removeThousandsSeparators(value).split(this.radix);

    // remove leading zeros
    parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, (match, sign, zeros, num) => sign + num);
    // add leading zero
    if (value.length && !/\d$/.test(parts[0])) parts[0] = parts[0] + '0';
    if (parts.length > 1) {
      parts[1] = parts[1].replace(/0*$/, ''); // remove trailing zeros
      if (!parts[1].length) parts.length = 1; // remove fractional
    }
    return this._insertThousandsSeparators(parts.join(this.radix));
  }
  _padFractionalZeros(value) {
    if (!value) return value;
    const parts = value.split(this.radix);
    if (parts.length < 2) parts.push('');
    parts[1] = parts[1].padEnd(this.scale, '0');
    return parts.join(this.radix);
  }
  doSkipInvalid(ch, flags, checkTail) {
    if (flags === void 0) {
      flags = {};
    }
    const dropFractional = this.scale === 0 && ch !== this.thousandsSeparator && (ch === this.radix || ch === MaskedNumber.UNMASKED_RADIX || this.mapToRadix.includes(ch));
    return super.doSkipInvalid(ch, flags, checkTail) && !dropFractional;
  }
  get unmaskedValue() {
    return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, MaskedNumber.UNMASKED_RADIX);
  }
  set unmaskedValue(unmaskedValue) {
    super.unmaskedValue = unmaskedValue;
  }
  get typedValue() {
    return this.parse(this.unmaskedValue, this);
  }
  set typedValue(n) {
    this.rawInputValue = this.format(n, this).replace(MaskedNumber.UNMASKED_RADIX, this.radix);
  }

  /** Parsed Number */
  get number() {
    return this.typedValue;
  }
  set number(number) {
    this.typedValue = number;
  }
  get allowNegative() {
    return this.min != null && this.min < 0 || this.max != null && this.max < 0;
  }
  get allowPositive() {
    return this.min != null && this.min > 0 || this.max != null && this.max > 0;
  }
  typedValueEquals(value) {
    // handle  0 -> '' case (typed = 0 even if value = '')
    // for details see https://github.com/uNmAnNeR/imaskjs/issues/134
    return (super.typedValueEquals(value) || MaskedNumber.EMPTY_VALUES.includes(value) && MaskedNumber.EMPTY_VALUES.includes(this.typedValue)) && !(value === 0 && this.value === '');
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_3__["default"].MaskedNumber = MaskedNumber;


/***/ }),
/* 39 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PIPE_TYPE: () => (/* binding */ PIPE_TYPE),
/* harmony export */   createPipe: () => (/* binding */ createPipe),
/* harmony export */   pipe: () => (/* binding */ pipe)
/* harmony export */ });
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);




/** Mask pipe source and destination types */
const PIPE_TYPE = {
  MASKED: 'value',
  UNMASKED: 'unmaskedValue',
  TYPED: 'typedValue'
};
/** Creates new pipe function depending on mask type, source and destination options */
function createPipe(arg, from, to) {
  if (from === void 0) {
    from = PIPE_TYPE.MASKED;
  }
  if (to === void 0) {
    to = PIPE_TYPE.MASKED;
  }
  const masked = (0,_factory_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arg);
  return value => masked.runIsolated(m => {
    m[from] = value;
    return m[to];
  });
}

/** Pipes value through mask depending on mask type, source and destination options */
function pipe(value, mask, from, to) {
  return createPipe(mask, from, to)(value);
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].PIPE_TYPE = PIPE_TYPE;
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].createPipe = createPipe;
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].pipe = pipe;


/***/ }),
/* 40 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RepeatBlock)
/* harmony export */ });
/* harmony import */ var _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(24);
/* harmony import */ var _core_holder_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _factory_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _pattern_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28);
/* harmony import */ var _core_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(15);
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25);
/* harmony import */ var _core_continuous_tail_details_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26);
/* harmony import */ var _pattern_chunk_tail_details_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(29);
/* harmony import */ var _pattern_cursor_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(30);
/* harmony import */ var _pattern_fixed_definition_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(31);
/* harmony import */ var _pattern_input_definition_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(32);
/* harmony import */ var _regexp_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(33);













/** Pattern mask */
class RepeatBlock extends _pattern_js__WEBPACK_IMPORTED_MODULE_3__["default"] {
  get repeatFrom() {
    return (Array.isArray(this.repeat) ? this.repeat[0] : this.repeat === Infinity ? 0 : this.repeat) ?? 0;
  }
  get repeatTo() {
    return (Array.isArray(this.repeat) ? this.repeat[1] : this.repeat) ?? Infinity;
  }
  constructor(opts) {
    super(opts);
  }
  updateOptions(opts) {
    super.updateOptions(opts);
  }
  _update(opts) {
    const {
      repeat,
      ...blockOpts
    } = (0,_factory_js__WEBPACK_IMPORTED_MODULE_2__.normalizeOpts)(opts); // TODO type
    this._blockOpts = Object.assign({}, this._blockOpts, blockOpts);
    const block = (0,_factory_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this._blockOpts);
    this.repeat = repeat ?? block.repeat ?? this.repeat ?? Infinity; // TODO type

    super._update({
      mask: 'm'.repeat(Math.max(this.repeatTo === Infinity && this._blocks?.length || 0, this.repeatFrom)),
      blocks: {
        m: block
      },
      eager: block.eager,
      overwrite: block.overwrite,
      skipInvalid: block.skipInvalid,
      lazy: block.lazy,
      placeholderChar: block.placeholderChar,
      displayChar: block.displayChar
    });
  }
  _allocateBlock(bi) {
    if (bi < this._blocks.length) return this._blocks[bi];
    if (this.repeatTo === Infinity || this._blocks.length < this.repeatTo) {
      this._blocks.push((0,_factory_js__WEBPACK_IMPORTED_MODULE_2__["default"])(this._blockOpts));
      this.mask += 'm';
      return this._blocks[this._blocks.length - 1];
    }
  }
  _appendCharRaw(ch, flags) {
    if (flags === void 0) {
      flags = {};
    }
    const details = new _core_change_details_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    for (let bi = this._mapPosToBlock(this.displayValue.length)?.index ?? Math.max(this._blocks.length - 1, 0), block, allocated;
    // try to get a block or
    // try to allocate a new block if not allocated already
    block = this._blocks[bi] ?? (allocated = !allocated && this._allocateBlock(bi)); ++bi) {
      const blockDetails = block._appendChar(ch, {
        ...flags,
        _beforeTailState: flags._beforeTailState?._blocks?.[bi]
      });
      if (blockDetails.skip && allocated) {
        // remove the last allocated block and break
        this._blocks.pop();
        this.mask = this.mask.slice(1);
        break;
      }
      details.aggregate(blockDetails);
      if (blockDetails.skip || blockDetails.rawInserted) break; // go next char
    }
    return details;
  }
  _trimEmptyTail(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    const firstBlockIndex = Math.max(this._mapPosToBlock(fromPos)?.index || 0, this.repeatFrom, 0);
    let lastBlockIndex;
    if (toPos != null) lastBlockIndex = this._mapPosToBlock(toPos)?.index;
    if (lastBlockIndex == null) lastBlockIndex = this._blocks.length - 1;
    let removeCount = 0;
    for (let blockIndex = lastBlockIndex; firstBlockIndex <= blockIndex; --blockIndex, ++removeCount) {
      if (this._blocks[blockIndex].unmaskedValue) break;
    }
    if (removeCount) {
      this._blocks.splice(lastBlockIndex - removeCount + 1, removeCount);
      this.mask = this.mask.slice(removeCount);
    }
  }
  reset() {
    super.reset();
    this._trimEmptyTail();
  }
  remove(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos === void 0) {
      toPos = this.displayValue.length;
    }
    const removeDetails = super.remove(fromPos, toPos);
    this._trimEmptyTail(fromPos, toPos);
    return removeDetails;
  }
  totalInputPositions(fromPos, toPos) {
    if (fromPos === void 0) {
      fromPos = 0;
    }
    if (toPos == null && this.repeatTo === Infinity) return Infinity;
    return super.totalInputPositions(fromPos, toPos);
  }
  get state() {
    return super.state;
  }
  set state(state) {
    this._blocks.length = state._blocks.length;
    this.mask = this.mask.slice(0, this._blocks.length);
    super.state = state;
  }
}
_core_holder_js__WEBPACK_IMPORTED_MODULE_1__["default"].RepeatBlock = RepeatBlock;


/***/ }),
/* 41 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   renderCitiesDelivery: () => (/* binding */ renderCitiesDelivery)
/* harmony export */ });
const regionsTemplate = document.querySelector('#regions-item').content.querySelector('.delivery-region__item');
const regionsList = document.querySelector('#regions-list');
const getFirstDomain = () => {
  const hostFull = window.location.hostname;
  const items = hostFull.split('.');
  return items[0] && items[0] !== 'fitnesslook' ? items[0] : '';
};
const renderCitiesDelivery = items => {
  const regionsContentFragment = document.createDocumentFragment();
  items?.filter(({
    name
  }) => name !== getFirstDomain()).forEach(item => {
    const region = regionsTemplate.cloneNode(true);
    const button = region.querySelector('.button-simple');
    button.textContent = item.city;
    button.href = `https://${item.name}.fitnesslook.ru/pages/dostavka.html`;
    regionsContentFragment.appendChild(region);
  });
  regionsList.appendChild(regionsContentFragment);
};


/***/ }),
/* 42 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
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


/***/ }),
/* 43 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setSimpleSlider: () => (/* binding */ setSimpleSlider),
/* harmony export */   setSlider: () => (/* binding */ setSlider),
/* harmony export */   setTableSlider: () => (/* binding */ setTableSlider),
/* harmony export */   settingSliderAdaptive: () => (/* binding */ settingSliderAdaptive),
/* harmony export */   updateSliderAdaptive: () => (/* binding */ updateSliderAdaptive)
/* harmony export */ });
/* harmony import */ var tiny_slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(44);

const setSimpleSlider = (buttonsSelector, container, activeSlide = 0) => {
  const sliderButtons = document.querySelector(buttonsSelector);
  const slideContainer = document.querySelector(container);
  const children = Array.from(slideContainer.children);
  const buttons = Array.from(sliderButtons.children);
  buttons?.forEach(element => element.classList.remove('button-main--active'));
  children?.forEach(element => {
    element.style.display = 'none';
  });
  children[activeSlide].style.display = 'block';
  buttons[activeSlide].classList.add('button-main--active');
  sliderButtons.addEventListener('click', evt => {
    const item = slideContainer.querySelector(`#${evt.target.value}`);
    buttons?.forEach(element => {
      if (element.value === evt.target.value) {
        element.classList.add('button-main--active');
      } else {
        element.classList.remove('button-main--active');
      }
    });
    children?.forEach(element => {
      element.style.display = 'none';
    });
    item.style.display = 'block';
  });
};
const setSlider = (container, props) => (0,tiny_slider__WEBPACK_IMPORTED_MODULE_0__.tns)({
  container,
  items: 1,
  controls: false,
  gutter: 40,
  loop: true,
  ...props
});
const setTableSlider = (container, props) => (0,tiny_slider__WEBPACK_IMPORTED_MODULE_0__.tns)({
  container,
  items: 5,
  nav: false,
  responsive: {
    768: {
      items: 6
    }
  },
  ...props
});
const settingSliderAdaptive = slider => {
  let newSlider = slider;
  if (window.innerWidth < 768) {
    if (!newSlider.isOn) {
      newSlider = slider.rebuild();
      newSlider.updateSliderHeight();
    }
  } else {
    if (newSlider.isOn) {
      newSlider.destroy();
    }
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      if (!newSlider.isOn) {
        newSlider = slider.rebuild();
        newSlider.updateSliderHeight();
      }
    } else {
      if (newSlider.isOn) {
        newSlider.destroy();
      }
    }
  });
};
const updateSliderAdaptive = slider => {
  window.addEventListener('resize', () => {
    slider.updateSliderHeight();
  });
};


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var win$1 = window;
var raf = win$1.requestAnimationFrame || win$1.webkitRequestAnimationFrame || win$1.mozRequestAnimationFrame || win$1.msRequestAnimationFrame || function (cb) {
  return setTimeout(cb, 16);
};
var win = window;
var caf = win.cancelAnimationFrame || win.mozCancelAnimationFrame || function (id) {
  clearTimeout(id);
};
function extend() {
  var obj,
    name,
    copy,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length;
  for (; i < length; i++) {
    if ((obj = arguments[i]) !== null) {
      for (name in obj) {
        copy = obj[name];
        if (target === copy) {
          continue;
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  return target;
}
function checkStorageValue(value) {
  return ['true', 'false'].indexOf(value) >= 0 ? JSON.parse(value) : value;
}
function setLocalStorage(storage, key, value, access) {
  if (access) {
    try {
      storage.setItem(key, value);
    } catch (e) {}
  }
  return value;
}
function getSlideId() {
  var id = window.tnsId;
  window.tnsId = !id ? 1 : id + 1;
  return 'tns' + window.tnsId;
}
function getBody() {
  var doc = document,
    body = doc.body;
  if (!body) {
    body = doc.createElement('body');
    body.fake = true;
  }
  return body;
}
var docElement = document.documentElement;
function setFakeBody(body) {
  var docOverflow = '';
  if (body.fake) {
    docOverflow = docElement.style.overflow; //avoid crashing IE8, if background image is used

    body.style.background = ''; //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visible

    body.style.overflow = docElement.style.overflow = 'hidden';
    docElement.appendChild(body);
  }
  return docOverflow;
}
function resetFakeBody(body, docOverflow) {
  if (body.fake) {
    body.remove();
    docElement.style.overflow = docOverflow; // Trigger layout so kinetic scrolling isn't disabled in iOS6+
    // eslint-disable-next-line

    docElement.offsetHeight;
  }
}

// get css-calc 
function calc() {
  var doc = document,
    body = getBody(),
    docOverflow = setFakeBody(body),
    div = doc.createElement('div'),
    result = false;
  body.appendChild(div);
  try {
    var str = '(10px * 10)',
      vals = ['calc' + str, '-moz-calc' + str, '-webkit-calc' + str],
      val;
    for (var i = 0; i < 3; i++) {
      val = vals[i];
      div.style.width = val;
      if (div.offsetWidth === 100) {
        result = val.replace(str, '');
        break;
      }
    }
  } catch (e) {}
  body.fake ? resetFakeBody(body, docOverflow) : div.remove();
  return result;
}

// get subpixel support value
function percentageLayout() {
  // check subpixel layout supporting
  var doc = document,
    body = getBody(),
    docOverflow = setFakeBody(body),
    wrapper = doc.createElement('div'),
    outer = doc.createElement('div'),
    str = '',
    count = 70,
    perPage = 3,
    supported = false;
  wrapper.className = "tns-t-subp2";
  outer.className = "tns-t-ct";
  for (var i = 0; i < count; i++) {
    str += '<div></div>';
  }
  outer.innerHTML = str;
  wrapper.appendChild(outer);
  body.appendChild(wrapper);
  supported = Math.abs(wrapper.getBoundingClientRect().left - outer.children[count - perPage].getBoundingClientRect().left) < 2;
  body.fake ? resetFakeBody(body, docOverflow) : wrapper.remove();
  return supported;
}
function mediaquerySupport() {
  if (window.matchMedia || window.msMatchMedia) {
    return true;
  }
  var doc = document,
    body = getBody(),
    docOverflow = setFakeBody(body),
    div = doc.createElement('div'),
    style = doc.createElement('style'),
    rule = '@media all and (min-width:1px){.tns-mq-test{position:absolute}}',
    position;
  style.type = 'text/css';
  div.className = 'tns-mq-test';
  body.appendChild(style);
  body.appendChild(div);
  if (style.styleSheet) {
    style.styleSheet.cssText = rule;
  } else {
    style.appendChild(doc.createTextNode(rule));
  }
  position = window.getComputedStyle ? window.getComputedStyle(div).position : div.currentStyle['position'];
  body.fake ? resetFakeBody(body, docOverflow) : div.remove();
  return position === "absolute";
}

// create and append style sheet
function createStyleSheet(media, nonce) {
  // Create the <style> tag
  var style = document.createElement("style"); // style.setAttribute("type", "text/css");
  // Add a media (and/or media query) here if you'd like!
  // style.setAttribute("media", "screen")
  // style.setAttribute("media", "only screen and (max-width : 1024px)")

  if (media) {
    style.setAttribute("media", media);
  } // Add nonce attribute for Content Security Policy

  if (nonce) {
    style.setAttribute("nonce", nonce);
  } // WebKit hack :(
  // style.appendChild(document.createTextNode(""));
  // Add the <style> element to the page

  document.querySelector('head').appendChild(style);
  return style.sheet ? style.sheet : style.styleSheet;
}

// cross browsers addRule method
function addCSSRule(sheet, selector, rules, index) {
  // return raf(function() {
  'insertRule' in sheet ? sheet.insertRule(selector + '{' + rules + '}', index) : sheet.addRule(selector, rules, index); // });
}

// cross browsers addRule method
function removeCSSRule(sheet, index) {
  // return raf(function() {
  'deleteRule' in sheet ? sheet.deleteRule(index) : sheet.removeRule(index); // });
}
function getCssRulesLength(sheet) {
  var rule = 'insertRule' in sheet ? sheet.cssRules : sheet.rules;
  return rule.length;
}
function toDegree(y, x) {
  return Math.atan2(y, x) * (180 / Math.PI);
}
function getTouchDirection(angle, range) {
  var direction = false,
    gap = Math.abs(90 - Math.abs(angle));
  if (gap >= 90 - range) {
    direction = 'horizontal';
  } else if (gap <= range) {
    direction = 'vertical';
  }
  return direction;
}

// https://toddmotto.com/ditch-the-array-foreach-call-nodelist-hack/
function forEach(arr, callback, scope) {
  for (var i = 0, l = arr.length; i < l; i++) {
    callback.call(scope, arr[i], i);
  }
}
var classListSupport = ('classList' in document.createElement('_'));
var hasClass = classListSupport ? function (el, str) {
  return el.classList.contains(str);
} : function (el, str) {
  return el.className.indexOf(str) >= 0;
};
var addClass = classListSupport ? function (el, str) {
  if (!hasClass(el, str)) {
    el.classList.add(str);
  }
} : function (el, str) {
  if (!hasClass(el, str)) {
    el.className += ' ' + str;
  }
};
var removeClass = classListSupport ? function (el, str) {
  if (hasClass(el, str)) {
    el.classList.remove(str);
  }
} : function (el, str) {
  if (hasClass(el, str)) {
    el.className = el.className.replace(str, '');
  }
};
function hasAttr(el, attr) {
  return el.hasAttribute(attr);
}
function getAttr(el, attr) {
  return el.getAttribute(attr);
}
function isNodeList(el) {
  // Only NodeList has the "item()" function
  return typeof el.item !== "undefined";
}
function setAttrs(els, attrs) {
  els = isNodeList(els) || els instanceof Array ? els : [els];
  if (Object.prototype.toString.call(attrs) !== '[object Object]') {
    return;
  }
  for (var i = els.length; i--;) {
    for (var key in attrs) {
      els[i].setAttribute(key, attrs[key]);
    }
  }
}
function removeAttrs(els, attrs) {
  els = isNodeList(els) || els instanceof Array ? els : [els];
  attrs = attrs instanceof Array ? attrs : [attrs];
  var attrLength = attrs.length;
  for (var i = els.length; i--;) {
    for (var j = attrLength; j--;) {
      els[i].removeAttribute(attrs[j]);
    }
  }
}
function arrayFromNodeList(nl) {
  var arr = [];
  for (var i = 0, l = nl.length; i < l; i++) {
    arr.push(nl[i]);
  }
  return arr;
}
function hideElement(el, forceHide) {
  if (el.style.display !== 'none') {
    el.style.display = 'none';
  }
}
function showElement(el, forceHide) {
  if (el.style.display === 'none') {
    el.style.display = '';
  }
}
function isVisible(el) {
  return window.getComputedStyle(el).display !== 'none';
}
function whichProperty(props) {
  if (typeof props === 'string') {
    var arr = [props],
      Props = props.charAt(0).toUpperCase() + props.substr(1),
      prefixes = ['Webkit', 'Moz', 'ms', 'O'];
    prefixes.forEach(function (prefix) {
      if (prefix !== 'ms' || props === 'transform') {
        arr.push(prefix + Props);
      }
    });
    props = arr;
  }
  var el = document.createElement('fakeelement');
  props.length;
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    if (el.style[prop] !== undefined) {
      return prop;
    }
  }
  return false; // explicit for ie9-
}
function has3DTransforms(tf) {
  if (!tf) {
    return false;
  }
  if (!window.getComputedStyle) {
    return false;
  }
  var doc = document,
    body = getBody(),
    docOverflow = setFakeBody(body),
    el = doc.createElement('p'),
    has3d,
    cssTF = tf.length > 9 ? '-' + tf.slice(0, -9).toLowerCase() + '-' : '';
  cssTF += 'transform'; // Add it to the body to get the computed style

  body.insertBefore(el, null);
  el.style[tf] = 'translate3d(1px,1px,1px)';
  has3d = window.getComputedStyle(el).getPropertyValue(cssTF);
  body.fake ? resetFakeBody(body, docOverflow) : el.remove();
  return has3d !== undefined && has3d.length > 0 && has3d !== "none";
}

// get transitionend, animationend based on transitionDuration
// @propin: string
// @propOut: string, first-letter uppercase
// Usage: getEndProperty('WebkitTransitionDuration', 'Transition') => webkitTransitionEnd
function getEndProperty(propIn, propOut) {
  var endProp = false;
  if (/^Webkit/.test(propIn)) {
    endProp = 'webkit' + propOut + 'End';
  } else if (/^O/.test(propIn)) {
    endProp = 'o' + propOut + 'End';
  } else if (propIn) {
    endProp = propOut.toLowerCase() + 'end';
  }
  return endProp;
}

// Test via a getter in the options object to see if the passive property is accessed
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, 'passive', {
    get: function () {
      supportsPassive = true;
    }
  });
  window.addEventListener("test", null, opts);
} catch (e) {}
var passiveOption = supportsPassive ? {
  passive: true
} : false;
function addEvents(el, obj, preventScrolling) {
  for (var prop in obj) {
    var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 && !preventScrolling ? passiveOption : false;
    el.addEventListener(prop, obj[prop], option);
  }
}
function removeEvents(el, obj) {
  for (var prop in obj) {
    var option = ['touchstart', 'touchmove'].indexOf(prop) >= 0 ? passiveOption : false;
    el.removeEventListener(prop, obj[prop], option);
  }
}
function Events() {
  return {
    topics: {},
    on: function (eventName, fn) {
      this.topics[eventName] = this.topics[eventName] || [];
      this.topics[eventName].push(fn);
    },
    off: function (eventName, fn) {
      if (this.topics[eventName]) {
        for (var i = 0; i < this.topics[eventName].length; i++) {
          if (this.topics[eventName][i] === fn) {
            this.topics[eventName].splice(i, 1);
            break;
          }
        }
      }
    },
    emit: function (eventName, data) {
      data.type = eventName;
      if (this.topics[eventName]) {
        this.topics[eventName].forEach(function (fn) {
          fn(data, eventName);
        });
      }
    }
  };
}
function jsTransform(element, attr, prefix, postfix, to, duration, callback) {
  var tick = Math.min(duration, 10),
    unit = to.indexOf('%') >= 0 ? '%' : 'px',
    to = to.replace(unit, ''),
    from = Number(element.style[attr].replace(prefix, '').replace(postfix, '').replace(unit, '')),
    positionTick = (to - from) / duration * tick;
  setTimeout(moveElement, tick);
  function moveElement() {
    duration -= tick;
    from += positionTick;
    element.style[attr] = prefix + from + unit + postfix;
    if (duration > 0) {
      setTimeout(moveElement, tick);
    } else {
      callback();
    }
  }
}

// Object.keys
if (!Object.keys) {
  Object.keys = function (object) {
    var keys = [];
    for (var name in object) {
      if (Object.prototype.hasOwnProperty.call(object, name)) {
        keys.push(name);
      }
    }
    return keys;
  };
} // ChildNode.remove

if (!("remove" in Element.prototype)) {
  Element.prototype.remove = function () {
    if (this.parentNode) {
      this.parentNode.removeChild(this);
    }
  };
}
var tns = function (options) {
  options = extend({
    container: '.slider',
    mode: 'carousel',
    axis: 'horizontal',
    items: 1,
    gutter: 0,
    edgePadding: 0,
    fixedWidth: false,
    autoWidth: false,
    viewportMax: false,
    slideBy: 1,
    center: false,
    controls: true,
    controlsPosition: 'top',
    controlsText: ['prev', 'next'],
    controlsContainer: false,
    prevButton: false,
    nextButton: false,
    nav: true,
    navPosition: 'top',
    navContainer: false,
    navAsThumbnails: false,
    arrowKeys: false,
    speed: 300,
    autoplay: false,
    autoplayPosition: 'top',
    autoplayTimeout: 5000,
    autoplayDirection: 'forward',
    autoplayText: ['start', 'stop'],
    autoplayHoverPause: false,
    autoplayButton: false,
    autoplayButtonOutput: true,
    autoplayResetOnVisibility: true,
    animateIn: 'tns-fadeIn',
    animateOut: 'tns-fadeOut',
    animateNormal: 'tns-normal',
    animateDelay: false,
    loop: true,
    rewind: false,
    autoHeight: false,
    responsive: false,
    lazyload: false,
    lazyloadSelector: '.tns-lazy-img',
    touch: true,
    mouseDrag: false,
    swipeAngle: 15,
    nested: false,
    preventActionWhenRunning: false,
    preventScrollOnTouch: false,
    freezable: true,
    onInit: false,
    useLocalStorage: true,
    nonce: false
  }, options || {});
  var doc = document,
    win = window,
    KEYS = {
      ENTER: 13,
      SPACE: 32,
      LEFT: 37,
      RIGHT: 39
    },
    tnsStorage = {},
    localStorageAccess = options.useLocalStorage;
  if (localStorageAccess) {
    // check browser version and local storage access
    var browserInfo = navigator.userAgent;
    var uid = new Date();
    try {
      tnsStorage = win.localStorage;
      if (tnsStorage) {
        tnsStorage.setItem(uid, uid);
        localStorageAccess = tnsStorage.getItem(uid) == uid;
        tnsStorage.removeItem(uid);
      } else {
        localStorageAccess = false;
      }
      if (!localStorageAccess) {
        tnsStorage = {};
      }
    } catch (e) {
      localStorageAccess = false;
    }
    if (localStorageAccess) {
      // remove storage when browser version changes
      if (tnsStorage['tnsApp'] && tnsStorage['tnsApp'] !== browserInfo) {
        ['tC', 'tPL', 'tMQ', 'tTf', 't3D', 'tTDu', 'tTDe', 'tADu', 'tADe', 'tTE', 'tAE'].forEach(function (item) {
          tnsStorage.removeItem(item);
        });
      } // update browserInfo

      localStorage['tnsApp'] = browserInfo;
    }
  }
  var CALC = tnsStorage['tC'] ? checkStorageValue(tnsStorage['tC']) : setLocalStorage(tnsStorage, 'tC', calc(), localStorageAccess),
    PERCENTAGELAYOUT = tnsStorage['tPL'] ? checkStorageValue(tnsStorage['tPL']) : setLocalStorage(tnsStorage, 'tPL', percentageLayout(), localStorageAccess),
    CSSMQ = tnsStorage['tMQ'] ? checkStorageValue(tnsStorage['tMQ']) : setLocalStorage(tnsStorage, 'tMQ', mediaquerySupport(), localStorageAccess),
    TRANSFORM = tnsStorage['tTf'] ? checkStorageValue(tnsStorage['tTf']) : setLocalStorage(tnsStorage, 'tTf', whichProperty('transform'), localStorageAccess),
    HAS3DTRANSFORMS = tnsStorage['t3D'] ? checkStorageValue(tnsStorage['t3D']) : setLocalStorage(tnsStorage, 't3D', has3DTransforms(TRANSFORM), localStorageAccess),
    TRANSITIONDURATION = tnsStorage['tTDu'] ? checkStorageValue(tnsStorage['tTDu']) : setLocalStorage(tnsStorage, 'tTDu', whichProperty('transitionDuration'), localStorageAccess),
    TRANSITIONDELAY = tnsStorage['tTDe'] ? checkStorageValue(tnsStorage['tTDe']) : setLocalStorage(tnsStorage, 'tTDe', whichProperty('transitionDelay'), localStorageAccess),
    ANIMATIONDURATION = tnsStorage['tADu'] ? checkStorageValue(tnsStorage['tADu']) : setLocalStorage(tnsStorage, 'tADu', whichProperty('animationDuration'), localStorageAccess),
    ANIMATIONDELAY = tnsStorage['tADe'] ? checkStorageValue(tnsStorage['tADe']) : setLocalStorage(tnsStorage, 'tADe', whichProperty('animationDelay'), localStorageAccess),
    TRANSITIONEND = tnsStorage['tTE'] ? checkStorageValue(tnsStorage['tTE']) : setLocalStorage(tnsStorage, 'tTE', getEndProperty(TRANSITIONDURATION, 'Transition'), localStorageAccess),
    ANIMATIONEND = tnsStorage['tAE'] ? checkStorageValue(tnsStorage['tAE']) : setLocalStorage(tnsStorage, 'tAE', getEndProperty(ANIMATIONDURATION, 'Animation'), localStorageAccess); // get element nodes from selectors

  var supportConsoleWarn = win.console && typeof win.console.warn === "function",
    tnsList = ['container', 'controlsContainer', 'prevButton', 'nextButton', 'navContainer', 'autoplayButton'],
    optionsElements = {};
  tnsList.forEach(function (item) {
    if (typeof options[item] === 'string') {
      var str = options[item],
        el = doc.querySelector(str);
      optionsElements[item] = str;
      if (el && el.nodeName) {
        options[item] = el;
      } else {
        if (supportConsoleWarn) {
          console.warn('Can\'t find', options[item]);
        }
        return;
      }
    }
  }); // make sure at least 1 slide

  if (options.container.children.length < 1) {
    if (supportConsoleWarn) {
      console.warn('No slides found in', options.container);
    }
    return;
  } // update options

  var responsive = options.responsive,
    nested = options.nested,
    carousel = options.mode === 'carousel' ? true : false;
  if (responsive) {
    // apply responsive[0] to options and remove it
    if (0 in responsive) {
      options = extend(options, responsive[0]);
      delete responsive[0];
    }
    var responsiveTem = {};
    for (var key in responsive) {
      var val = responsive[key]; // update responsive
      // from: 300: 2
      // to:
      //   300: {
      //     items: 2
      //   }

      val = typeof val === 'number' ? {
        items: val
      } : val;
      responsiveTem[key] = val;
    }
    responsive = responsiveTem;
    responsiveTem = null;
  } // update options

  function updateOptions(obj) {
    for (var key in obj) {
      if (!carousel) {
        if (key === 'slideBy') {
          obj[key] = 'page';
        }
        if (key === 'edgePadding') {
          obj[key] = false;
        }
        if (key === 'autoHeight') {
          obj[key] = false;
        }
      } // update responsive options

      if (key === 'responsive') {
        updateOptions(obj[key]);
      }
    }
  }
  if (!carousel) {
    updateOptions(options);
  } // === define and set variables ===

  if (!carousel) {
    options.axis = 'horizontal';
    options.slideBy = 'page';
    options.edgePadding = false;
    var animateIn = options.animateIn,
      animateOut = options.animateOut,
      animateDelay = options.animateDelay,
      animateNormal = options.animateNormal;
  }
  var horizontal = options.axis === 'horizontal' ? true : false,
    outerWrapper = doc.createElement('div'),
    innerWrapper = doc.createElement('div'),
    middleWrapper,
    container = options.container,
    containerParent = container.parentNode,
    containerHTML = container.outerHTML,
    slideItems = container.children,
    slideCount = slideItems.length,
    breakpointZone,
    windowWidth = getWindowWidth(),
    isOn = false;
  if (responsive) {
    setBreakpointZone();
  }
  if (carousel) {
    container.className += ' tns-vpfix';
  } // fixedWidth: viewport > rightBoundary > indexMax

  var autoWidth = options.autoWidth,
    fixedWidth = getOption('fixedWidth'),
    edgePadding = getOption('edgePadding'),
    gutter = getOption('gutter'),
    viewport = getViewportWidth(),
    center = getOption('center'),
    items = !autoWidth ? Math.floor(getOption('items')) : 1,
    slideBy = getOption('slideBy'),
    viewportMax = options.viewportMax || options.fixedWidthViewportWidth,
    arrowKeys = getOption('arrowKeys'),
    speed = getOption('speed'),
    rewind = options.rewind,
    loop = rewind ? false : options.loop,
    autoHeight = getOption('autoHeight'),
    controls = getOption('controls'),
    controlsText = getOption('controlsText'),
    nav = getOption('nav'),
    touch = getOption('touch'),
    mouseDrag = getOption('mouseDrag'),
    autoplay = getOption('autoplay'),
    autoplayTimeout = getOption('autoplayTimeout'),
    autoplayText = getOption('autoplayText'),
    autoplayHoverPause = getOption('autoplayHoverPause'),
    autoplayResetOnVisibility = getOption('autoplayResetOnVisibility'),
    sheet = createStyleSheet(null, getOption('nonce')),
    lazyload = options.lazyload,
    lazyloadSelector = options.lazyloadSelector,
    slidePositions,
    // collection of slide positions
    slideItemsOut = [],
    cloneCount = loop ? getCloneCountForLoop() : 0,
    slideCountNew = !carousel ? slideCount + cloneCount : slideCount + cloneCount * 2,
    hasRightDeadZone = (fixedWidth || autoWidth) && !loop ? true : false,
    rightBoundary = fixedWidth ? getRightBoundary() : null,
    updateIndexBeforeTransform = !carousel || !loop ? true : false,
    // transform
    transformAttr = horizontal ? 'left' : 'top',
    transformPrefix = '',
    transformPostfix = '',
    // index
    getIndexMax = function () {
      if (fixedWidth) {
        return function () {
          return center && !loop ? slideCount - 1 : Math.ceil(-rightBoundary / (fixedWidth + gutter));
        };
      } else if (autoWidth) {
        return function () {
          for (var i = 0; i < slideCountNew; i++) {
            if (slidePositions[i] >= -rightBoundary) {
              return i;
            }
          }
        };
      } else {
        return function () {
          if (center && carousel && !loop) {
            return slideCount - 1;
          } else {
            return loop || carousel ? Math.max(0, slideCountNew - Math.ceil(items)) : slideCountNew - 1;
          }
        };
      }
    }(),
    index = getStartIndex(getOption('startIndex')),
    indexCached = index;
  getCurrentSlide();
  var indexMin = 0,
    indexMax = !autoWidth ? getIndexMax() : null,
    preventActionWhenRunning = options.preventActionWhenRunning,
    swipeAngle = options.swipeAngle,
    moveDirectionExpected = swipeAngle ? '?' : true,
    running = false,
    onInit = options.onInit,
    events = new Events(),
    // id, class
    newContainerClasses = ' tns-slider tns-' + options.mode,
    slideId = container.id || getSlideId(),
    disable = getOption('disable'),
    disabled = false,
    freezable = options.freezable,
    freeze = freezable && !autoWidth ? getFreeze() : false,
    frozen = false,
    controlsEvents = {
      'click': onControlsClick,
      'keydown': onControlsKeydown
    },
    navEvents = {
      'click': onNavClick,
      'keydown': onNavKeydown
    },
    hoverEvents = {
      'mouseover': mouseoverPause,
      'mouseout': mouseoutRestart
    },
    visibilityEvent = {
      'visibilitychange': onVisibilityChange
    },
    docmentKeydownEvent = {
      'keydown': onDocumentKeydown
    },
    touchEvents = {
      'touchstart': onPanStart,
      'touchmove': onPanMove,
      'touchend': onPanEnd,
      'touchcancel': onPanEnd
    },
    dragEvents = {
      'mousedown': onPanStart,
      'mousemove': onPanMove,
      'mouseup': onPanEnd,
      'mouseleave': onPanEnd
    },
    hasControls = hasOption('controls'),
    hasNav = hasOption('nav'),
    navAsThumbnails = autoWidth ? true : options.navAsThumbnails,
    hasAutoplay = hasOption('autoplay'),
    hasTouch = hasOption('touch'),
    hasMouseDrag = hasOption('mouseDrag'),
    slideActiveClass = 'tns-slide-active',
    slideClonedClass = 'tns-slide-cloned',
    imgCompleteClass = 'tns-complete',
    imgEvents = {
      'load': onImgLoaded,
      'error': onImgFailed
    },
    imgsComplete,
    liveregionCurrent,
    preventScroll = options.preventScrollOnTouch === 'force' ? true : false; // controls

  if (hasControls) {
    var controlsContainer = options.controlsContainer,
      controlsContainerHTML = options.controlsContainer ? options.controlsContainer.outerHTML : '',
      prevButton = options.prevButton,
      nextButton = options.nextButton,
      prevButtonHTML = options.prevButton ? options.prevButton.outerHTML : '',
      nextButtonHTML = options.nextButton ? options.nextButton.outerHTML : '',
      prevIsButton,
      nextIsButton;
  } // nav

  if (hasNav) {
    var navContainer = options.navContainer,
      navContainerHTML = options.navContainer ? options.navContainer.outerHTML : '',
      navItems,
      pages = autoWidth ? slideCount : getPages(),
      pagesCached = 0,
      navClicked = -1,
      navCurrentIndex = getCurrentNavIndex(),
      navCurrentIndexCached = navCurrentIndex,
      navActiveClass = 'tns-nav-active',
      navStr = 'Carousel Page ',
      navStrCurrent = ' (Current Slide)';
  } // autoplay

  if (hasAutoplay) {
    var autoplayDirection = options.autoplayDirection === 'forward' ? 1 : -1,
      autoplayButton = options.autoplayButton,
      autoplayButtonHTML = options.autoplayButton ? options.autoplayButton.outerHTML : '',
      autoplayHtmlStrings = ['<span class=\'tns-visually-hidden\'>', ' animation</span>'],
      autoplayTimer,
      animating,
      autoplayHoverPaused,
      autoplayUserPaused,
      autoplayVisibilityPaused;
  }
  if (hasTouch || hasMouseDrag) {
    var initPosition = {},
      lastPosition = {},
      translateInit,
      panStart = false,
      rafIndex,
      getDist = horizontal ? function (a, b) {
        return a.x - b.x;
      } : function (a, b) {
        return a.y - b.y;
      };
  } // disable slider when slidecount <= items

  if (!autoWidth) {
    resetVariblesWhenDisable(disable || freeze);
  }
  if (TRANSFORM) {
    transformAttr = TRANSFORM;
    transformPrefix = 'translate';
    if (HAS3DTRANSFORMS) {
      transformPrefix += horizontal ? '3d(' : '3d(0px, ';
      transformPostfix = horizontal ? ', 0px, 0px)' : ', 0px)';
    } else {
      transformPrefix += horizontal ? 'X(' : 'Y(';
      transformPostfix = ')';
    }
  }
  if (carousel) {
    container.className = container.className.replace('tns-vpfix', '');
  }
  initStructure();
  initSheet();
  initSliderTransform(); // === COMMON FUNCTIONS === //

  function resetVariblesWhenDisable(condition) {
    if (condition) {
      controls = nav = touch = mouseDrag = arrowKeys = autoplay = autoplayHoverPause = autoplayResetOnVisibility = false;
    }
  }
  function getCurrentSlide() {
    var tem = carousel ? index - cloneCount : index;
    while (tem < 0) {
      tem += slideCount;
    }
    return tem % slideCount + 1;
  }
  function getStartIndex(ind) {
    ind = ind ? Math.max(0, Math.min(loop ? slideCount - 1 : slideCount - items, ind)) : 0;
    return carousel ? ind + cloneCount : ind;
  }
  function getAbsIndex(i) {
    if (i == null) {
      i = index;
    }
    if (carousel) {
      i -= cloneCount;
    }
    while (i < 0) {
      i += slideCount;
    }
    return Math.floor(i % slideCount);
  }
  function getCurrentNavIndex() {
    var absIndex = getAbsIndex(),
      result;
    result = navAsThumbnails ? absIndex : fixedWidth || autoWidth ? Math.ceil((absIndex + 1) * pages / slideCount - 1) : Math.floor(absIndex / items); // set active nav to the last one when reaches the right edge

    if (!loop && carousel && index === indexMax) {
      result = pages - 1;
    }
    return result;
  }
  function getItemsMax() {
    // fixedWidth or autoWidth while viewportMax is not available
    if (autoWidth || fixedWidth && !viewportMax) {
      return slideCount - 1; // most cases
    } else {
      var str = fixedWidth ? 'fixedWidth' : 'items',
        arr = [];
      if (fixedWidth || options[str] < slideCount) {
        arr.push(options[str]);
      }
      if (responsive) {
        for (var bp in responsive) {
          var tem = responsive[bp][str];
          if (tem && (fixedWidth || tem < slideCount)) {
            arr.push(tem);
          }
        }
      }
      if (!arr.length) {
        arr.push(0);
      }
      return Math.ceil(fixedWidth ? viewportMax / Math.min.apply(null, arr) : Math.max.apply(null, arr));
    }
  }
  function getCloneCountForLoop() {
    var itemsMax = getItemsMax(),
      result = carousel ? Math.ceil((itemsMax * 5 - slideCount) / 2) : itemsMax * 4 - slideCount;
    result = Math.max(itemsMax, result);
    return hasOption('edgePadding') ? result + 1 : result;
  }
  function getWindowWidth() {
    return win.innerWidth || doc.documentElement.clientWidth || doc.body.clientWidth;
  }
  function getInsertPosition(pos) {
    return pos === 'top' ? 'afterbegin' : 'beforeend';
  }
  function getClientWidth(el) {
    if (el == null) {
      return;
    }
    var div = doc.createElement('div'),
      rect,
      width;
    el.appendChild(div);
    rect = div.getBoundingClientRect();
    width = rect.right - rect.left;
    div.remove();
    return width || getClientWidth(el.parentNode);
  }
  function getViewportWidth() {
    var gap = edgePadding ? edgePadding * 2 - gutter : 0;
    return getClientWidth(containerParent) - gap;
  }
  function hasOption(item) {
    if (options[item]) {
      return true;
    } else {
      if (responsive) {
        for (var bp in responsive) {
          if (responsive[bp][item]) {
            return true;
          }
        }
      }
      return false;
    }
  } // get option:
  // fixed width: viewport, fixedWidth, gutter => items
  // others: window width => all variables
  // all: items => slideBy

  function getOption(item, ww) {
    if (ww == null) {
      ww = windowWidth;
    }
    if (item === 'items' && fixedWidth) {
      return Math.floor((viewport + gutter) / (fixedWidth + gutter)) || 1;
    } else {
      var result = options[item];
      if (responsive) {
        for (var bp in responsive) {
          // bp: convert string to number
          if (ww >= parseInt(bp)) {
            if (item in responsive[bp]) {
              result = responsive[bp][item];
            }
          }
        }
      }
      if (item === 'slideBy' && result === 'page') {
        result = getOption('items');
      }
      if (!carousel && (item === 'slideBy' || item === 'items')) {
        result = Math.floor(result);
      }
      return result;
    }
  }
  function getSlideMarginLeft(i) {
    return CALC ? CALC + '(' + i * 100 + '% / ' + slideCountNew + ')' : i * 100 / slideCountNew + '%';
  }
  function getInnerWrapperStyles(edgePaddingTem, gutterTem, fixedWidthTem, speedTem, autoHeightBP) {
    var str = '';
    if (edgePaddingTem !== undefined) {
      var gap = edgePaddingTem;
      if (gutterTem) {
        gap -= gutterTem;
      }
      str = horizontal ? 'margin: 0 ' + gap + 'px 0 ' + edgePaddingTem + 'px;' : 'margin: ' + edgePaddingTem + 'px 0 ' + gap + 'px 0;';
    } else if (gutterTem && !fixedWidthTem) {
      var gutterTemUnit = '-' + gutterTem + 'px',
        dir = horizontal ? gutterTemUnit + ' 0 0' : '0 ' + gutterTemUnit + ' 0';
      str = 'margin: 0 ' + dir + ';';
    }
    if (!carousel && autoHeightBP && TRANSITIONDURATION && speedTem) {
      str += getTransitionDurationStyle(speedTem);
    }
    return str;
  }
  function getContainerWidth(fixedWidthTem, gutterTem, itemsTem) {
    if (fixedWidthTem) {
      return (fixedWidthTem + gutterTem) * slideCountNew + 'px';
    } else {
      return CALC ? CALC + '(' + slideCountNew * 100 + '% / ' + itemsTem + ')' : slideCountNew * 100 / itemsTem + '%';
    }
  }
  function getSlideWidthStyle(fixedWidthTem, gutterTem, itemsTem) {
    var width;
    if (fixedWidthTem) {
      width = fixedWidthTem + gutterTem + 'px';
    } else {
      if (!carousel) {
        itemsTem = Math.floor(itemsTem);
      }
      var dividend = carousel ? slideCountNew : itemsTem;
      width = CALC ? CALC + '(100% / ' + dividend + ')' : 100 / dividend + '%';
    }
    width = 'width:' + width; // inner slider: overwrite outer slider styles

    return nested !== 'inner' ? width + ';' : width + ' !important;';
  }
  function getSlideGutterStyle(gutterTem) {
    var str = ''; // gutter maybe interger || 0
    // so can't use 'if (gutter)'

    if (gutterTem !== false) {
      var prop = horizontal ? 'padding-' : 'margin-',
        dir = horizontal ? 'right' : 'bottom';
      str = prop + dir + ': ' + gutterTem + 'px;';
    }
    return str;
  }
  function getCSSPrefix(name, num) {
    var prefix = name.substring(0, name.length - num).toLowerCase();
    if (prefix) {
      prefix = '-' + prefix + '-';
    }
    return prefix;
  }
  function getTransitionDurationStyle(speed) {
    return getCSSPrefix(TRANSITIONDURATION, 18) + 'transition-duration:' + speed / 1000 + 's;';
  }
  function getAnimationDurationStyle(speed) {
    return getCSSPrefix(ANIMATIONDURATION, 17) + 'animation-duration:' + speed / 1000 + 's;';
  }
  function initStructure() {
    var classOuter = 'tns-outer',
      classInner = 'tns-inner';
    hasOption('gutter');
    outerWrapper.className = classOuter;
    innerWrapper.className = classInner;
    outerWrapper.id = slideId + '-ow';
    innerWrapper.id = slideId + '-iw'; // set container properties

    if (container.id === '') {
      container.id = slideId;
    }
    newContainerClasses += PERCENTAGELAYOUT || autoWidth ? ' tns-subpixel' : ' tns-no-subpixel';
    newContainerClasses += CALC ? ' tns-calc' : ' tns-no-calc';
    if (autoWidth) {
      newContainerClasses += ' tns-autowidth';
    }
    newContainerClasses += ' tns-' + options.axis;
    container.className += newContainerClasses; // add constrain layer for carousel

    if (carousel) {
      middleWrapper = doc.createElement('div');
      middleWrapper.id = slideId + '-mw';
      middleWrapper.className = 'tns-ovh';
      outerWrapper.appendChild(middleWrapper);
      middleWrapper.appendChild(innerWrapper);
    } else {
      outerWrapper.appendChild(innerWrapper);
    }
    if (autoHeight) {
      var wp = middleWrapper ? middleWrapper : innerWrapper;
      wp.className += ' tns-ah';
    }
    containerParent.insertBefore(outerWrapper, container);
    innerWrapper.appendChild(container); // add id, class, aria attributes
    // before clone slides

    forEach(slideItems, function (item, i) {
      addClass(item, 'tns-item');
      if (!item.id) {
        item.id = slideId + '-item' + i;
      }
      if (!carousel && animateNormal) {
        addClass(item, animateNormal);
      }
      setAttrs(item, {
        'aria-hidden': 'true',
        'tabindex': '-1'
      });
    }); // ## clone slides
    // carousel: n + slides + n
    // gallery:      slides + n

    if (cloneCount) {
      var fragmentBefore = doc.createDocumentFragment(),
        fragmentAfter = doc.createDocumentFragment();
      for (var j = cloneCount; j--;) {
        var num = j % slideCount,
          cloneFirst = slideItems[num].cloneNode(true);
        addClass(cloneFirst, slideClonedClass);
        removeAttrs(cloneFirst, 'id');
        fragmentAfter.insertBefore(cloneFirst, fragmentAfter.firstChild);
        if (carousel) {
          var cloneLast = slideItems[slideCount - 1 - num].cloneNode(true);
          addClass(cloneLast, slideClonedClass);
          removeAttrs(cloneLast, 'id');
          fragmentBefore.appendChild(cloneLast);
        }
      }
      container.insertBefore(fragmentBefore, container.firstChild);
      container.appendChild(fragmentAfter);
      slideItems = container.children;
    }
  }
  function initSliderTransform() {
    // ## images loaded/failed
    if (hasOption('autoHeight') || autoWidth || !horizontal) {
      var imgs = container.querySelectorAll('img'); // add img load event listener

      forEach(imgs, function (img) {
        var src = img.src;
        if (!lazyload) {
          // not data img
          if (src && src.indexOf('data:image') < 0) {
            img.src = '';
            addEvents(img, imgEvents);
            addClass(img, 'loading');
            img.src = src; // data img
          } else {
            imgLoaded(img);
          }
        }
      }); // set imgsComplete

      raf(function () {
        imgsLoadedCheck(arrayFromNodeList(imgs), function () {
          imgsComplete = true;
        });
      }); // reset imgs for auto height: check visible imgs only

      if (hasOption('autoHeight')) {
        imgs = getImageArray(index, Math.min(index + items - 1, slideCountNew - 1));
      }
      lazyload ? initSliderTransformStyleCheck() : raf(function () {
        imgsLoadedCheck(arrayFromNodeList(imgs), initSliderTransformStyleCheck);
      });
    } else {
      // set container transform property
      if (carousel) {
        doContainerTransformSilent();
      } // update slider tools and events

      initTools();
      initEvents();
    }
  }
  function initSliderTransformStyleCheck() {
    if (autoWidth && slideCount > 1) {
      // check styles application
      var num = loop ? index : slideCount - 1;
      (function stylesApplicationCheck() {
        var left = slideItems[num].getBoundingClientRect().left;
        var right = slideItems[num - 1].getBoundingClientRect().right;
        Math.abs(left - right) <= 1 ? initSliderTransformCore() : setTimeout(function () {
          stylesApplicationCheck();
        }, 16);
      })();
    } else {
      initSliderTransformCore();
    }
  }
  function initSliderTransformCore() {
    // run Fn()s which are rely on image loading
    if (!horizontal || autoWidth) {
      setSlidePositions();
      if (autoWidth) {
        rightBoundary = getRightBoundary();
        if (freezable) {
          freeze = getFreeze();
        }
        indexMax = getIndexMax(); // <= slidePositions, rightBoundary <=

        resetVariblesWhenDisable(disable || freeze);
      } else {
        updateContentWrapperHeight();
      }
    } // set container transform property

    if (carousel) {
      doContainerTransformSilent();
    } // update slider tools and events

    initTools();
    initEvents();
  }
  function initSheet() {
    // gallery:
    // set animation classes and left value for gallery slider
    if (!carousel) {
      for (var i = index, l = index + Math.min(slideCount, items); i < l; i++) {
        var item = slideItems[i];
        item.style.left = (i - index) * 100 / items + '%';
        addClass(item, animateIn);
        removeClass(item, animateNormal);
      }
    } // #### LAYOUT
    // ## INLINE-BLOCK VS FLOAT
    // ## PercentageLayout:
    // slides: inline-block
    // remove blank space between slides by set font-size: 0
    // ## Non PercentageLayout:
    // slides: float
    //         margin-right: -100%
    //         margin-left: ~
    // Resource: https://docs.google.com/spreadsheets/d/147up245wwTXeQYve3BRSAD4oVcvQmuGsFteJOeA5xNQ/edit?usp=sharing

    if (horizontal) {
      if (PERCENTAGELAYOUT || autoWidth) {
        addCSSRule(sheet, '#' + slideId + ' > .tns-item', 'font-size:' + win.getComputedStyle(slideItems[0]).fontSize + ';', getCssRulesLength(sheet));
        addCSSRule(sheet, '#' + slideId, 'font-size:0;', getCssRulesLength(sheet));
      } else if (carousel) {
        forEach(slideItems, function (slide, i) {
          slide.style.marginLeft = getSlideMarginLeft(i);
        });
      }
    } // ## BASIC STYLES

    if (CSSMQ) {
      // middle wrapper style
      if (TRANSITIONDURATION) {
        var str = middleWrapper && options.autoHeight ? getTransitionDurationStyle(options.speed) : '';
        addCSSRule(sheet, '#' + slideId + '-mw', str, getCssRulesLength(sheet));
      } // inner wrapper styles

      str = getInnerWrapperStyles(options.edgePadding, options.gutter, options.fixedWidth, options.speed, options.autoHeight);
      addCSSRule(sheet, '#' + slideId + '-iw', str, getCssRulesLength(sheet)); // container styles

      if (carousel) {
        str = horizontal && !autoWidth ? 'width:' + getContainerWidth(options.fixedWidth, options.gutter, options.items) + ';' : '';
        if (TRANSITIONDURATION) {
          str += getTransitionDurationStyle(speed);
        }
        addCSSRule(sheet, '#' + slideId, str, getCssRulesLength(sheet));
      } // slide styles

      str = horizontal && !autoWidth ? getSlideWidthStyle(options.fixedWidth, options.gutter, options.items) : '';
      if (options.gutter) {
        str += getSlideGutterStyle(options.gutter);
      } // set gallery items transition-duration

      if (!carousel) {
        if (TRANSITIONDURATION) {
          str += getTransitionDurationStyle(speed);
        }
        if (ANIMATIONDURATION) {
          str += getAnimationDurationStyle(speed);
        }
      }
      if (str) {
        addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet));
      } // non CSS mediaqueries: IE8
      // ## update inner wrapper, container, slides if needed
      // set inline styles for inner wrapper & container
      // insert stylesheet (one line) for slides only (since slides are many)
    } else {
      // middle wrapper styles
      update_carousel_transition_duration(); // inner wrapper styles

      innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, autoHeight); // container styles

      if (carousel && horizontal && !autoWidth) {
        container.style.width = getContainerWidth(fixedWidth, gutter, items);
      } // slide styles

      var str = horizontal && !autoWidth ? getSlideWidthStyle(fixedWidth, gutter, items) : '';
      if (gutter) {
        str += getSlideGutterStyle(gutter);
      } // append to the last line

      if (str) {
        addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet));
      }
    } // ## MEDIAQUERIES

    if (responsive && CSSMQ) {
      for (var bp in responsive) {
        // bp: convert string to number
        bp = parseInt(bp);
        var opts = responsive[bp],
          str = '',
          middleWrapperStr = '',
          innerWrapperStr = '',
          containerStr = '',
          slideStr = '',
          itemsBP = !autoWidth ? getOption('items', bp) : null,
          fixedWidthBP = getOption('fixedWidth', bp),
          speedBP = getOption('speed', bp),
          edgePaddingBP = getOption('edgePadding', bp),
          autoHeightBP = getOption('autoHeight', bp),
          gutterBP = getOption('gutter', bp); // middle wrapper string

        if (TRANSITIONDURATION && middleWrapper && getOption('autoHeight', bp) && 'speed' in opts) {
          middleWrapperStr = '#' + slideId + '-mw{' + getTransitionDurationStyle(speedBP) + '}';
        } // inner wrapper string

        if ('edgePadding' in opts || 'gutter' in opts) {
          innerWrapperStr = '#' + slideId + '-iw{' + getInnerWrapperStyles(edgePaddingBP, gutterBP, fixedWidthBP, speedBP, autoHeightBP) + '}';
        } // container string

        if (carousel && horizontal && !autoWidth && ('fixedWidth' in opts || 'items' in opts || fixedWidth && 'gutter' in opts)) {
          containerStr = 'width:' + getContainerWidth(fixedWidthBP, gutterBP, itemsBP) + ';';
        }
        if (TRANSITIONDURATION && 'speed' in opts) {
          containerStr += getTransitionDurationStyle(speedBP);
        }
        if (containerStr) {
          containerStr = '#' + slideId + '{' + containerStr + '}';
        } // slide string

        if ('fixedWidth' in opts || fixedWidth && 'gutter' in opts || !carousel && 'items' in opts) {
          slideStr += getSlideWidthStyle(fixedWidthBP, gutterBP, itemsBP);
        }
        if ('gutter' in opts) {
          slideStr += getSlideGutterStyle(gutterBP);
        } // set gallery items transition-duration

        if (!carousel && 'speed' in opts) {
          if (TRANSITIONDURATION) {
            slideStr += getTransitionDurationStyle(speedBP);
          }
          if (ANIMATIONDURATION) {
            slideStr += getAnimationDurationStyle(speedBP);
          }
        }
        if (slideStr) {
          slideStr = '#' + slideId + ' > .tns-item{' + slideStr + '}';
        } // add up

        str = middleWrapperStr + innerWrapperStr + containerStr + slideStr;
        if (str) {
          sheet.insertRule('@media (min-width: ' + bp / 16 + 'em) {' + str + '}', sheet.cssRules.length);
        }
      }
    }
  }
  function initTools() {
    // == slides ==
    updateSlideStatus(); // == live region ==

    outerWrapper.insertAdjacentHTML('afterbegin', '<div class="tns-liveregion tns-visually-hidden" aria-live="polite" aria-atomic="true">slide <span class="current">' + getLiveRegionStr() + '</span>  of ' + slideCount + '</div>');
    liveregionCurrent = outerWrapper.querySelector('.tns-liveregion .current'); // == autoplayInit ==

    if (hasAutoplay) {
      var txt = autoplay ? 'stop' : 'start';
      if (autoplayButton) {
        setAttrs(autoplayButton, {
          'data-action': txt
        });
      } else if (options.autoplayButtonOutput) {
        outerWrapper.insertAdjacentHTML(getInsertPosition(options.autoplayPosition), '<button type="button" data-action="' + txt + '">' + autoplayHtmlStrings[0] + txt + autoplayHtmlStrings[1] + autoplayText[0] + '</button>');
        autoplayButton = outerWrapper.querySelector('[data-action]');
      } // add event

      if (autoplayButton) {
        addEvents(autoplayButton, {
          'click': toggleAutoplay
        });
      }
      if (autoplay) {
        startAutoplay();
        if (autoplayHoverPause) {
          addEvents(container, hoverEvents);
        }
        if (autoplayResetOnVisibility) {
          addEvents(container, visibilityEvent);
        }
      }
    } // == navInit ==

    if (hasNav) {
      // will not hide the navs in case they're thumbnails

      if (navContainer) {
        setAttrs(navContainer, {
          'aria-label': 'Carousel Pagination'
        });
        navItems = navContainer.children;
        forEach(navItems, function (item, i) {
          setAttrs(item, {
            'data-nav': i,
            'tabindex': '-1',
            'aria-label': navStr + (i + 1),
            'aria-controls': slideId
          });
        }); // generated nav
      } else {
        var navHtml = '',
          hiddenStr = navAsThumbnails ? '' : 'style="display:none"';
        for (var i = 0; i < slideCount; i++) {
          // hide nav items by default
          navHtml += '<button type="button" data-nav="' + i + '" tabindex="-1" aria-controls="' + slideId + '" ' + hiddenStr + ' aria-label="' + navStr + (i + 1) + '"></button>';
        }
        navHtml = '<div class="tns-nav" aria-label="Carousel Pagination">' + navHtml + '</div>';
        outerWrapper.insertAdjacentHTML(getInsertPosition(options.navPosition), navHtml);
        navContainer = outerWrapper.querySelector('.tns-nav');
        navItems = navContainer.children;
      }
      updateNavVisibility(); // add transition

      if (TRANSITIONDURATION) {
        var prefix = TRANSITIONDURATION.substring(0, TRANSITIONDURATION.length - 18).toLowerCase(),
          str = 'transition: all ' + speed / 1000 + 's';
        if (prefix) {
          str = '-' + prefix + '-' + str;
        }
        addCSSRule(sheet, '[aria-controls^=' + slideId + '-item]', str, getCssRulesLength(sheet));
      }
      setAttrs(navItems[navCurrentIndex], {
        'aria-label': navStr + (navCurrentIndex + 1) + navStrCurrent
      });
      removeAttrs(navItems[navCurrentIndex], 'tabindex');
      addClass(navItems[navCurrentIndex], navActiveClass); // add events

      addEvents(navContainer, navEvents);
    } // == controlsInit ==

    if (hasControls) {
      if (!controlsContainer && (!prevButton || !nextButton)) {
        outerWrapper.insertAdjacentHTML(getInsertPosition(options.controlsPosition), '<div class="tns-controls" aria-label="Carousel Navigation" tabindex="0"><button type="button" data-controls="prev" tabindex="-1" aria-controls="' + slideId + '">' + controlsText[0] + '</button><button type="button" data-controls="next" tabindex="-1" aria-controls="' + slideId + '">' + controlsText[1] + '</button></div>');
        controlsContainer = outerWrapper.querySelector('.tns-controls');
      }
      if (!prevButton || !nextButton) {
        prevButton = controlsContainer.children[0];
        nextButton = controlsContainer.children[1];
      }
      if (options.controlsContainer) {
        setAttrs(controlsContainer, {
          'aria-label': 'Carousel Navigation',
          'tabindex': '0'
        });
      }
      if (options.controlsContainer || options.prevButton && options.nextButton) {
        setAttrs([prevButton, nextButton], {
          'aria-controls': slideId,
          'tabindex': '-1'
        });
      }
      if (options.controlsContainer || options.prevButton && options.nextButton) {
        setAttrs(prevButton, {
          'data-controls': 'prev'
        });
        setAttrs(nextButton, {
          'data-controls': 'next'
        });
      }
      prevIsButton = isButton(prevButton);
      nextIsButton = isButton(nextButton);
      updateControlsStatus(); // add events

      if (controlsContainer) {
        addEvents(controlsContainer, controlsEvents);
      } else {
        addEvents(prevButton, controlsEvents);
        addEvents(nextButton, controlsEvents);
      }
    } // hide tools if needed

    disableUI();
  }
  function initEvents() {
    // add events
    if (carousel && TRANSITIONEND) {
      var eve = {};
      eve[TRANSITIONEND] = onTransitionEnd;
      addEvents(container, eve);
    }
    if (touch) {
      addEvents(container, touchEvents, options.preventScrollOnTouch);
    }
    if (mouseDrag) {
      addEvents(container, dragEvents);
    }
    if (arrowKeys) {
      addEvents(doc, docmentKeydownEvent);
    }
    if (nested === 'inner') {
      events.on('outerResized', function () {
        resizeTasks();
        events.emit('innerLoaded', info());
      });
    } else if (responsive || fixedWidth || autoWidth || autoHeight || !horizontal) {
      addEvents(win, {
        'resize': onResize
      });
    }
    if (autoHeight) {
      if (nested === 'outer') {
        events.on('innerLoaded', doAutoHeight);
      } else if (!disable) {
        doAutoHeight();
      }
    }
    doLazyLoad();
    if (disable) {
      disableSlider();
    } else if (freeze) {
      freezeSlider();
    }
    events.on('indexChanged', additionalUpdates);
    if (nested === 'inner') {
      events.emit('innerLoaded', info());
    }
    if (typeof onInit === 'function') {
      onInit(info());
    }
    isOn = true;
  }
  function destroy() {
    // sheet
    sheet.disabled = true;
    if (sheet.ownerNode) {
      sheet.ownerNode.remove();
    } // remove win event listeners

    removeEvents(win, {
      'resize': onResize
    }); // arrowKeys, controls, nav

    if (arrowKeys) {
      removeEvents(doc, docmentKeydownEvent);
    }
    if (controlsContainer) {
      removeEvents(controlsContainer, controlsEvents);
    }
    if (navContainer) {
      removeEvents(navContainer, navEvents);
    } // autoplay

    removeEvents(container, hoverEvents);
    removeEvents(container, visibilityEvent);
    if (autoplayButton) {
      removeEvents(autoplayButton, {
        'click': toggleAutoplay
      });
    }
    if (autoplay) {
      clearInterval(autoplayTimer);
    } // container

    if (carousel && TRANSITIONEND) {
      var eve = {};
      eve[TRANSITIONEND] = onTransitionEnd;
      removeEvents(container, eve);
    }
    if (touch) {
      removeEvents(container, touchEvents);
    }
    if (mouseDrag) {
      removeEvents(container, dragEvents);
    } // cache Object values in options && reset HTML

    var htmlList = [containerHTML, controlsContainerHTML, prevButtonHTML, nextButtonHTML, navContainerHTML, autoplayButtonHTML];
    tnsList.forEach(function (item, i) {
      var el = item === 'container' ? outerWrapper : options[item];
      if (typeof el === 'object' && el) {
        var prevEl = el.previousElementSibling ? el.previousElementSibling : false,
          parentEl = el.parentNode;
        el.outerHTML = htmlList[i];
        options[item] = prevEl ? prevEl.nextElementSibling : parentEl.firstElementChild;
      }
    }); // reset variables

    tnsList = animateIn = animateOut = animateDelay = animateNormal = horizontal = outerWrapper = innerWrapper = container = containerParent = containerHTML = slideItems = slideCount = breakpointZone = windowWidth = autoWidth = fixedWidth = edgePadding = gutter = viewport = items = slideBy = viewportMax = arrowKeys = speed = rewind = loop = autoHeight = sheet = lazyload = slidePositions = slideItemsOut = cloneCount = slideCountNew = hasRightDeadZone = rightBoundary = updateIndexBeforeTransform = transformAttr = transformPrefix = transformPostfix = getIndexMax = index = indexCached = indexMin = indexMax = swipeAngle = moveDirectionExpected = running = onInit = events = newContainerClasses = slideId = disable = disabled = freezable = freeze = frozen = controlsEvents = navEvents = hoverEvents = visibilityEvent = docmentKeydownEvent = touchEvents = dragEvents = hasControls = hasNav = navAsThumbnails = hasAutoplay = hasTouch = hasMouseDrag = slideActiveClass = imgCompleteClass = imgEvents = imgsComplete = controls = controlsText = controlsContainer = controlsContainerHTML = prevButton = nextButton = prevIsButton = nextIsButton = nav = navContainer = navContainerHTML = navItems = pages = pagesCached = navClicked = navCurrentIndex = navCurrentIndexCached = navActiveClass = navStr = navStrCurrent = autoplay = autoplayTimeout = autoplayDirection = autoplayText = autoplayHoverPause = autoplayButton = autoplayButtonHTML = autoplayResetOnVisibility = autoplayHtmlStrings = autoplayTimer = animating = autoplayHoverPaused = autoplayUserPaused = autoplayVisibilityPaused = initPosition = lastPosition = translateInit = panStart = rafIndex = getDist = touch = mouseDrag = null; // check variables
    // [animateIn, animateOut, animateDelay, animateNormal, horizontal, outerWrapper, innerWrapper, container, containerParent, containerHTML, slideItems, slideCount, breakpointZone, windowWidth, autoWidth, fixedWidth, edgePadding, gutter, viewport, items, slideBy, viewportMax, arrowKeys, speed, rewind, loop, autoHeight, sheet, lazyload, slidePositions, slideItemsOut, cloneCount, slideCountNew, hasRightDeadZone, rightBoundary, updateIndexBeforeTransform, transformAttr, transformPrefix, transformPostfix, getIndexMax, index, indexCached, indexMin, indexMax, resizeTimer, swipeAngle, moveDirectionExpected, running, onInit, events, newContainerClasses, slideId, disable, disabled, freezable, freeze, frozen, controlsEvents, navEvents, hoverEvents, visibilityEvent, docmentKeydownEvent, touchEvents, dragEvents, hasControls, hasNav, navAsThumbnails, hasAutoplay, hasTouch, hasMouseDrag, slideActiveClass, imgCompleteClass, imgEvents, imgsComplete, controls, controlsText, controlsContainer, controlsContainerHTML, prevButton, nextButton, prevIsButton, nextIsButton, nav, navContainer, navContainerHTML, navItems, pages, pagesCached, navClicked, navCurrentIndex, navCurrentIndexCached, navActiveClass, navStr, navStrCurrent, autoplay, autoplayTimeout, autoplayDirection, autoplayText, autoplayHoverPause, autoplayButton, autoplayButtonHTML, autoplayResetOnVisibility, autoplayHtmlStrings, autoplayTimer, animating, autoplayHoverPaused, autoplayUserPaused, autoplayVisibilityPaused, initPosition, lastPosition, translateInit, disX, disY, panStart, rafIndex, getDist, touch, mouseDrag ].forEach(function(item) { if (item !== null) { console.log(item); } });

    for (var a in this) {
      if (a !== 'rebuild') {
        this[a] = null;
      }
    }
    isOn = false;
  } // === ON RESIZE ===
  // responsive || fixedWidth || autoWidth || !horizontal

  function onResize(e) {
    raf(function () {
      resizeTasks(getEvent(e));
    });
  }
  function resizeTasks(e) {
    if (!isOn) {
      return;
    }
    if (nested === 'outer') {
      events.emit('outerResized', info(e));
    }
    windowWidth = getWindowWidth();
    var bpChanged,
      breakpointZoneTem = breakpointZone,
      needContainerTransform = false;
    if (responsive) {
      setBreakpointZone();
      bpChanged = breakpointZoneTem !== breakpointZone; // if (hasRightDeadZone) { needContainerTransform = true; } // *?

      if (bpChanged) {
        events.emit('newBreakpointStart', info(e));
      }
    }
    var indChanged,
      itemsChanged,
      itemsTem = items,
      disableTem = disable,
      freezeTem = freeze,
      arrowKeysTem = arrowKeys,
      controlsTem = controls,
      navTem = nav,
      touchTem = touch,
      mouseDragTem = mouseDrag,
      autoplayTem = autoplay,
      autoplayHoverPauseTem = autoplayHoverPause,
      autoplayResetOnVisibilityTem = autoplayResetOnVisibility,
      indexTem = index;
    if (bpChanged) {
      var fixedWidthTem = fixedWidth,
        autoHeightTem = autoHeight,
        controlsTextTem = controlsText,
        centerTem = center,
        autoplayTextTem = autoplayText;
      if (!CSSMQ) {
        var gutterTem = gutter,
          edgePaddingTem = edgePadding;
      }
    } // get option:
    // fixed width: viewport, fixedWidth, gutter => items
    // others: window width => all variables
    // all: items => slideBy

    arrowKeys = getOption('arrowKeys');
    controls = getOption('controls');
    nav = getOption('nav');
    touch = getOption('touch');
    center = getOption('center');
    mouseDrag = getOption('mouseDrag');
    autoplay = getOption('autoplay');
    autoplayHoverPause = getOption('autoplayHoverPause');
    autoplayResetOnVisibility = getOption('autoplayResetOnVisibility');
    if (bpChanged) {
      disable = getOption('disable');
      fixedWidth = getOption('fixedWidth');
      speed = getOption('speed');
      autoHeight = getOption('autoHeight');
      controlsText = getOption('controlsText');
      autoplayText = getOption('autoplayText');
      autoplayTimeout = getOption('autoplayTimeout');
      if (!CSSMQ) {
        edgePadding = getOption('edgePadding');
        gutter = getOption('gutter');
      }
    } // update options

    resetVariblesWhenDisable(disable);
    viewport = getViewportWidth(); // <= edgePadding, gutter

    if ((!horizontal || autoWidth) && !disable) {
      setSlidePositions();
      if (!horizontal) {
        updateContentWrapperHeight(); // <= setSlidePositions

        needContainerTransform = true;
      }
    }
    if (fixedWidth || autoWidth) {
      rightBoundary = getRightBoundary(); // autoWidth: <= viewport, slidePositions, gutter
      // fixedWidth: <= viewport, fixedWidth, gutter

      indexMax = getIndexMax(); // autoWidth: <= rightBoundary, slidePositions
      // fixedWidth: <= rightBoundary, fixedWidth, gutter
    }
    if (bpChanged || fixedWidth) {
      items = getOption('items');
      slideBy = getOption('slideBy');
      itemsChanged = items !== itemsTem;
      if (itemsChanged) {
        if (!fixedWidth && !autoWidth) {
          indexMax = getIndexMax();
        } // <= items
        // check index before transform in case
        // slider reach the right edge then items become bigger

        updateIndex();
      }
    }
    if (bpChanged) {
      if (disable !== disableTem) {
        if (disable) {
          disableSlider();
        } else {
          enableSlider(); // <= slidePositions, rightBoundary, indexMax
        }
      }
    }
    if (freezable && (bpChanged || fixedWidth || autoWidth)) {
      freeze = getFreeze(); // <= autoWidth: slidePositions, gutter, viewport, rightBoundary
      // <= fixedWidth: fixedWidth, gutter, rightBoundary
      // <= others: items

      if (freeze !== freezeTem) {
        if (freeze) {
          doContainerTransform(getContainerTransformValue(getStartIndex(0)));
          freezeSlider();
        } else {
          unfreezeSlider();
          needContainerTransform = true;
        }
      }
    }
    resetVariblesWhenDisable(disable || freeze); // controls, nav, touch, mouseDrag, arrowKeys, autoplay, autoplayHoverPause, autoplayResetOnVisibility

    if (!autoplay) {
      autoplayHoverPause = autoplayResetOnVisibility = false;
    }
    if (arrowKeys !== arrowKeysTem) {
      arrowKeys ? addEvents(doc, docmentKeydownEvent) : removeEvents(doc, docmentKeydownEvent);
    }
    if (controls !== controlsTem) {
      if (controls) {
        if (controlsContainer) {
          showElement(controlsContainer);
        } else {
          if (prevButton) {
            showElement(prevButton);
          }
          if (nextButton) {
            showElement(nextButton);
          }
        }
      } else {
        if (controlsContainer) {
          hideElement(controlsContainer);
        } else {
          if (prevButton) {
            hideElement(prevButton);
          }
          if (nextButton) {
            hideElement(nextButton);
          }
        }
      }
    }
    if (nav !== navTem) {
      if (nav) {
        showElement(navContainer);
        updateNavVisibility();
      } else {
        hideElement(navContainer);
      }
    }
    if (touch !== touchTem) {
      touch ? addEvents(container, touchEvents, options.preventScrollOnTouch) : removeEvents(container, touchEvents);
    }
    if (mouseDrag !== mouseDragTem) {
      mouseDrag ? addEvents(container, dragEvents) : removeEvents(container, dragEvents);
    }
    if (autoplay !== autoplayTem) {
      if (autoplay) {
        if (autoplayButton) {
          showElement(autoplayButton);
        }
        if (!animating && !autoplayUserPaused) {
          startAutoplay();
        }
      } else {
        if (autoplayButton) {
          hideElement(autoplayButton);
        }
        if (animating) {
          stopAutoplay();
        }
      }
    }
    if (autoplayHoverPause !== autoplayHoverPauseTem) {
      autoplayHoverPause ? addEvents(container, hoverEvents) : removeEvents(container, hoverEvents);
    }
    if (autoplayResetOnVisibility !== autoplayResetOnVisibilityTem) {
      autoplayResetOnVisibility ? addEvents(doc, visibilityEvent) : removeEvents(doc, visibilityEvent);
    }
    if (bpChanged) {
      if (fixedWidth !== fixedWidthTem || center !== centerTem) {
        needContainerTransform = true;
      }
      if (autoHeight !== autoHeightTem) {
        if (!autoHeight) {
          innerWrapper.style.height = '';
        }
      }
      if (controls && controlsText !== controlsTextTem) {
        prevButton.innerHTML = controlsText[0];
        nextButton.innerHTML = controlsText[1];
      }
      if (autoplayButton && autoplayText !== autoplayTextTem) {
        var i = autoplay ? 1 : 0,
          html = autoplayButton.innerHTML,
          len = html.length - autoplayTextTem[i].length;
        if (html.substring(len) === autoplayTextTem[i]) {
          autoplayButton.innerHTML = html.substring(0, len) + autoplayText[i];
        }
      }
    } else {
      if (center && (fixedWidth || autoWidth)) {
        needContainerTransform = true;
      }
    }
    if (itemsChanged || fixedWidth && !autoWidth) {
      pages = getPages();
      updateNavVisibility();
    }
    indChanged = index !== indexTem;
    if (indChanged) {
      events.emit('indexChanged', info());
      needContainerTransform = true;
    } else if (itemsChanged) {
      if (!indChanged) {
        additionalUpdates();
      }
    } else if (fixedWidth || autoWidth) {
      doLazyLoad();
      updateSlideStatus();
      updateLiveRegion();
    }
    if (itemsChanged && !carousel) {
      updateGallerySlidePositions();
    }
    if (!disable && !freeze) {
      // non-mediaqueries: IE8
      if (bpChanged && !CSSMQ) {
        // middle wrapper styles
        // inner wrapper styles
        if (edgePadding !== edgePaddingTem || gutter !== gutterTem) {
          innerWrapper.style.cssText = getInnerWrapperStyles(edgePadding, gutter, fixedWidth, speed, autoHeight);
        }
        if (horizontal) {
          // container styles
          if (carousel) {
            container.style.width = getContainerWidth(fixedWidth, gutter, items);
          } // slide styles

          var str = getSlideWidthStyle(fixedWidth, gutter, items) + getSlideGutterStyle(gutter); // remove the last line and
          // add new styles

          removeCSSRule(sheet, getCssRulesLength(sheet) - 1);
          addCSSRule(sheet, '#' + slideId + ' > .tns-item', str, getCssRulesLength(sheet));
        }
      } // auto height

      if (autoHeight) {
        doAutoHeight();
      }
      if (needContainerTransform) {
        doContainerTransformSilent();
        indexCached = index;
      }
    }
    if (bpChanged) {
      events.emit('newBreakpointEnd', info(e));
    }
  } // === INITIALIZATION FUNCTIONS === //

  function getFreeze() {
    if (!fixedWidth && !autoWidth) {
      var a = center ? items - (items - 1) / 2 : items;
      return slideCount <= a;
    }
    var width = fixedWidth ? (fixedWidth + gutter) * slideCount : slidePositions[slideCount],
      vp = edgePadding ? viewport + edgePadding * 2 : viewport + gutter;
    if (center) {
      vp -= fixedWidth ? (viewport - fixedWidth) / 2 : (viewport - (slidePositions[index + 1] - slidePositions[index] - gutter)) / 2;
    }
    return width <= vp;
  }
  function setBreakpointZone() {
    breakpointZone = 0;
    for (var bp in responsive) {
      bp = parseInt(bp); // convert string to number

      if (windowWidth >= bp) {
        breakpointZone = bp;
      }
    }
  } // (slideBy, indexMin, indexMax) => index

  var updateIndex = function () {
    return loop ? carousel ?
    // loop + carousel
    function () {
      var leftEdge = indexMin,
        rightEdge = indexMax;
      leftEdge += slideBy;
      rightEdge -= slideBy; // adjust edges when has edge paddings
      // or fixed-width slider with extra space on the right side

      if (edgePadding) {
        leftEdge += 1;
        rightEdge -= 1;
      } else if (fixedWidth) {
        if ((viewport + gutter) % (fixedWidth + gutter)) {
          rightEdge -= 1;
        }
      }
      if (cloneCount) {
        if (index > rightEdge) {
          index -= slideCount;
        } else if (index < leftEdge) {
          index += slideCount;
        }
      }
    } :
    // loop + gallery
    function () {
      if (index > indexMax) {
        while (index >= indexMin + slideCount) {
          index -= slideCount;
        }
      } else if (index < indexMin) {
        while (index <= indexMax - slideCount) {
          index += slideCount;
        }
      }
    } :
    // non-loop
    function () {
      index = Math.max(indexMin, Math.min(indexMax, index));
    };
  }();
  function disableUI() {
    if (!autoplay && autoplayButton) {
      hideElement(autoplayButton);
    }
    if (!nav && navContainer) {
      hideElement(navContainer);
    }
    if (!controls) {
      if (controlsContainer) {
        hideElement(controlsContainer);
      } else {
        if (prevButton) {
          hideElement(prevButton);
        }
        if (nextButton) {
          hideElement(nextButton);
        }
      }
    }
  }
  function enableUI() {
    if (autoplay && autoplayButton) {
      showElement(autoplayButton);
    }
    if (nav && navContainer) {
      showElement(navContainer);
    }
    if (controls) {
      if (controlsContainer) {
        showElement(controlsContainer);
      } else {
        if (prevButton) {
          showElement(prevButton);
        }
        if (nextButton) {
          showElement(nextButton);
        }
      }
    }
  }
  function freezeSlider() {
    if (frozen) {
      return;
    } // remove edge padding from inner wrapper

    if (edgePadding) {
      innerWrapper.style.margin = '0px';
    } // add class tns-transparent to cloned slides

    if (cloneCount) {
      var str = 'tns-transparent';
      for (var i = cloneCount; i--;) {
        if (carousel) {
          addClass(slideItems[i], str);
        }
        addClass(slideItems[slideCountNew - i - 1], str);
      }
    } // update tools

    disableUI();
    frozen = true;
  }
  function unfreezeSlider() {
    if (!frozen) {
      return;
    } // restore edge padding for inner wrapper
    // for mordern browsers

    if (edgePadding && CSSMQ) {
      innerWrapper.style.margin = '';
    } // remove class tns-transparent to cloned slides

    if (cloneCount) {
      var str = 'tns-transparent';
      for (var i = cloneCount; i--;) {
        if (carousel) {
          removeClass(slideItems[i], str);
        }
        removeClass(slideItems[slideCountNew - i - 1], str);
      }
    } // update tools

    enableUI();
    frozen = false;
  }
  function disableSlider() {
    if (disabled) {
      return;
    }
    sheet.disabled = true;
    container.className = container.className.replace(newContainerClasses.substring(1), '');
    removeAttrs(container, ['style']);
    if (loop) {
      for (var j = cloneCount; j--;) {
        if (carousel) {
          hideElement(slideItems[j]);
        }
        hideElement(slideItems[slideCountNew - j - 1]);
      }
    } // vertical slider

    if (!horizontal || !carousel) {
      removeAttrs(innerWrapper, ['style']);
    } // gallery

    if (!carousel) {
      for (var i = index, l = index + slideCount; i < l; i++) {
        var item = slideItems[i];
        removeAttrs(item, ['style']);
        removeClass(item, animateIn);
        removeClass(item, animateNormal);
      }
    } // update tools

    disableUI();
    disabled = true;
  }
  function enableSlider() {
    if (!disabled) {
      return;
    }
    sheet.disabled = false;
    container.className += newContainerClasses;
    doContainerTransformSilent();
    if (loop) {
      for (var j = cloneCount; j--;) {
        if (carousel) {
          showElement(slideItems[j]);
        }
        showElement(slideItems[slideCountNew - j - 1]);
      }
    } // gallery

    if (!carousel) {
      for (var i = index, l = index + slideCount; i < l; i++) {
        var item = slideItems[i],
          classN = i < index + items ? animateIn : animateNormal;
        item.style.left = (i - index) * 100 / items + '%';
        addClass(item, classN);
      }
    } // update tools

    enableUI();
    disabled = false;
  }
  function updateLiveRegion() {
    var str = getLiveRegionStr();
    if (liveregionCurrent.innerHTML !== str) {
      liveregionCurrent.innerHTML = str;
    }
  }
  function getLiveRegionStr() {
    var arr = getVisibleSlideRange(),
      start = arr[0] + 1,
      end = arr[1] + 1;
    return start === end ? start + '' : start + ' to ' + end;
  }
  function getVisibleSlideRange(val) {
    if (val == null) {
      val = getContainerTransformValue();
    }
    var start = index,
      end,
      rangestart,
      rangeend; // get range start, range end for autoWidth and fixedWidth

    if (center || edgePadding) {
      if (autoWidth || fixedWidth) {
        rangestart = -(parseFloat(val) + edgePadding);
        rangeend = rangestart + viewport + edgePadding * 2;
      }
    } else {
      if (autoWidth) {
        rangestart = slidePositions[index];
        rangeend = rangestart + viewport;
      }
    } // get start, end
    // - check auto width

    if (autoWidth) {
      slidePositions.forEach(function (point, i) {
        if (i < slideCountNew) {
          if ((center || edgePadding) && point <= rangestart + 0.5) {
            start = i;
          }
          if (rangeend - point >= 0.5) {
            end = i;
          }
        }
      }); // - check percentage width, fixed width
    } else {
      if (fixedWidth) {
        var cell = fixedWidth + gutter;
        if (center || edgePadding) {
          start = Math.floor(rangestart / cell);
          end = Math.ceil(rangeend / cell - 1);
        } else {
          end = start + Math.ceil(viewport / cell) - 1;
        }
      } else {
        if (center || edgePadding) {
          var a = items - 1;
          if (center) {
            start -= a / 2;
            end = index + a / 2;
          } else {
            end = index + a;
          }
          if (edgePadding) {
            var b = edgePadding * items / viewport;
            start -= b;
            end += b;
          }
          start = Math.floor(start);
          end = Math.ceil(end);
        } else {
          end = start + items - 1;
        }
      }
      start = Math.max(start, 0);
      end = Math.min(end, slideCountNew - 1);
    }
    return [start, end];
  }
  function doLazyLoad() {
    if (lazyload && !disable) {
      var arg = getVisibleSlideRange();
      arg.push(lazyloadSelector);
      getImageArray.apply(null, arg).forEach(function (img) {
        if (!hasClass(img, imgCompleteClass)) {
          // stop propagation transitionend event to container
          var eve = {};
          eve[TRANSITIONEND] = function (e) {
            e.stopPropagation();
          };
          addEvents(img, eve);
          addEvents(img, imgEvents); // update src

          img.src = getAttr(img, 'data-src'); // update srcset

          var srcset = getAttr(img, 'data-srcset');
          if (srcset) {
            img.srcset = srcset;
          }
          addClass(img, 'loading');
        }
      });
    }
  }
  function onImgLoaded(e) {
    imgLoaded(getTarget(e));
  }
  function onImgFailed(e) {
    imgFailed(getTarget(e));
  }
  function imgLoaded(img) {
    addClass(img, 'loaded');
    imgCompleted(img);
  }
  function imgFailed(img) {
    addClass(img, 'failed');
    imgCompleted(img);
  }
  function imgCompleted(img) {
    addClass(img, imgCompleteClass);
    removeClass(img, 'loading');
    removeEvents(img, imgEvents);
  }
  function getImageArray(start, end, imgSelector) {
    var imgs = [];
    if (!imgSelector) {
      imgSelector = 'img';
    }
    while (start <= end) {
      forEach(slideItems[start].querySelectorAll(imgSelector), function (img) {
        imgs.push(img);
      });
      start++;
    }
    return imgs;
  } // check if all visible images are loaded
  // and update container height if it's done

  function doAutoHeight() {
    var imgs = getImageArray.apply(null, getVisibleSlideRange());
    raf(function () {
      imgsLoadedCheck(imgs, updateInnerWrapperHeight);
    });
  }
  function imgsLoadedCheck(imgs, cb) {
    // execute callback function if all images are complete
    if (imgsComplete) {
      return cb();
    } // check image classes

    imgs.forEach(function (img, index) {
      if (!lazyload && img.complete) {
        imgCompleted(img);
      } // Check image.complete

      if (hasClass(img, imgCompleteClass)) {
        imgs.splice(index, 1);
      }
    }); // execute callback function if selected images are all complete

    if (!imgs.length) {
      return cb();
    } // otherwise execute this functiona again

    raf(function () {
      imgsLoadedCheck(imgs, cb);
    });
  }
  function additionalUpdates() {
    doLazyLoad();
    updateSlideStatus();
    updateLiveRegion();
    updateControlsStatus();
    updateNavStatus();
  }
  function update_carousel_transition_duration() {
    if (carousel && autoHeight) {
      middleWrapper.style[TRANSITIONDURATION] = speed / 1000 + 's';
    }
  }
  function getMaxSlideHeight(slideStart, slideRange) {
    var heights = [];
    for (var i = slideStart, l = Math.min(slideStart + slideRange, slideCountNew); i < l; i++) {
      heights.push(slideItems[i].offsetHeight);
    }
    return Math.max.apply(null, heights);
  } // update inner wrapper height
  // 1. get the max-height of the visible slides
  // 2. set transitionDuration to speed
  // 3. update inner wrapper height to max-height
  // 4. set transitionDuration to 0s after transition done

  function updateInnerWrapperHeight() {
    var maxHeight = autoHeight ? getMaxSlideHeight(index, items) : getMaxSlideHeight(cloneCount, slideCount),
      wp = middleWrapper ? middleWrapper : innerWrapper;
    if (wp.style.height !== maxHeight) {
      wp.style.height = maxHeight + 'px';
    }
  } // get the distance from the top edge of the first slide to each slide
  // (init) => slidePositions

  function setSlidePositions() {
    slidePositions = [0];
    var attr = horizontal ? 'left' : 'top',
      attr2 = horizontal ? 'right' : 'bottom',
      base = slideItems[0].getBoundingClientRect()[attr];
    forEach(slideItems, function (item, i) {
      // skip the first slide
      if (i) {
        slidePositions.push(item.getBoundingClientRect()[attr] - base);
      } // add the end edge

      if (i === slideCountNew - 1) {
        slidePositions.push(item.getBoundingClientRect()[attr2] - base);
      }
    });
  } // update slide

  function updateSlideStatus() {
    var range = getVisibleSlideRange(),
      start = range[0],
      end = range[1];
    forEach(slideItems, function (item, i) {
      // show slides
      if (i >= start && i <= end) {
        if (hasAttr(item, 'aria-hidden')) {
          removeAttrs(item, ['aria-hidden', 'tabindex']);
          addClass(item, slideActiveClass);
        } // hide slides
      } else {
        if (!hasAttr(item, 'aria-hidden')) {
          setAttrs(item, {
            'aria-hidden': 'true',
            'tabindex': '-1'
          });
          removeClass(item, slideActiveClass);
        }
      }
    });
  } // gallery: update slide position

  function updateGallerySlidePositions() {
    var l = index + Math.min(slideCount, items);
    for (var i = slideCountNew; i--;) {
      var item = slideItems[i];
      if (i >= index && i < l) {
        // add transitions to visible slides when adjusting their positions
        addClass(item, 'tns-moving');
        item.style.left = (i - index) * 100 / items + '%';
        addClass(item, animateIn);
        removeClass(item, animateNormal);
      } else if (item.style.left) {
        item.style.left = '';
        addClass(item, animateNormal);
        removeClass(item, animateIn);
      } // remove outlet animation

      removeClass(item, animateOut);
    } // removing '.tns-moving'

    setTimeout(function () {
      forEach(slideItems, function (el) {
        removeClass(el, 'tns-moving');
      });
    }, 300);
  } // set tabindex on Nav

  function updateNavStatus() {
    // get current nav
    if (nav) {
      navCurrentIndex = navClicked >= 0 ? navClicked : getCurrentNavIndex();
      navClicked = -1;
      if (navCurrentIndex !== navCurrentIndexCached) {
        var navPrev = navItems[navCurrentIndexCached],
          navCurrent = navItems[navCurrentIndex];
        setAttrs(navPrev, {
          'tabindex': '-1',
          'aria-label': navStr + (navCurrentIndexCached + 1)
        });
        removeClass(navPrev, navActiveClass);
        setAttrs(navCurrent, {
          'aria-label': navStr + (navCurrentIndex + 1) + navStrCurrent
        });
        removeAttrs(navCurrent, 'tabindex');
        addClass(navCurrent, navActiveClass);
        navCurrentIndexCached = navCurrentIndex;
      }
    }
  }
  function getLowerCaseNodeName(el) {
    return el.nodeName.toLowerCase();
  }
  function isButton(el) {
    return getLowerCaseNodeName(el) === 'button';
  }
  function isAriaDisabled(el) {
    return el.getAttribute('aria-disabled') === 'true';
  }
  function disEnableElement(isButton, el, val) {
    if (isButton) {
      el.disabled = val;
    } else {
      el.setAttribute('aria-disabled', val.toString());
    }
  } // set 'disabled' to true on controls when reach the edges

  function updateControlsStatus() {
    if (!controls || rewind || loop) {
      return;
    }
    var prevDisabled = prevIsButton ? prevButton.disabled : isAriaDisabled(prevButton),
      nextDisabled = nextIsButton ? nextButton.disabled : isAriaDisabled(nextButton),
      disablePrev = index <= indexMin ? true : false,
      disableNext = !rewind && index >= indexMax ? true : false;
    if (disablePrev && !prevDisabled) {
      disEnableElement(prevIsButton, prevButton, true);
    }
    if (!disablePrev && prevDisabled) {
      disEnableElement(prevIsButton, prevButton, false);
    }
    if (disableNext && !nextDisabled) {
      disEnableElement(nextIsButton, nextButton, true);
    }
    if (!disableNext && nextDisabled) {
      disEnableElement(nextIsButton, nextButton, false);
    }
  } // set duration

  function resetDuration(el, str) {
    if (TRANSITIONDURATION) {
      el.style[TRANSITIONDURATION] = str;
    }
  }
  function getSliderWidth() {
    return fixedWidth ? (fixedWidth + gutter) * slideCountNew : slidePositions[slideCountNew];
  }
  function getCenterGap(num) {
    if (num == null) {
      num = index;
    }
    var gap = edgePadding ? gutter : 0;
    return autoWidth ? (viewport - gap - (slidePositions[num + 1] - slidePositions[num] - gutter)) / 2 : fixedWidth ? (viewport - fixedWidth) / 2 : (items - 1) / 2;
  }
  function getRightBoundary() {
    var gap = edgePadding ? gutter : 0,
      result = viewport + gap - getSliderWidth();
    if (center && !loop) {
      result = fixedWidth ? -(fixedWidth + gutter) * (slideCountNew - 1) - getCenterGap() : getCenterGap(slideCountNew - 1) - slidePositions[slideCountNew - 1];
    }
    if (result > 0) {
      result = 0;
    }
    return result;
  }
  function getContainerTransformValue(num) {
    if (num == null) {
      num = index;
    }
    var val;
    if (horizontal && !autoWidth) {
      if (fixedWidth) {
        val = -(fixedWidth + gutter) * num;
        if (center) {
          val += getCenterGap();
        }
      } else {
        var denominator = TRANSFORM ? slideCountNew : items;
        if (center) {
          num -= getCenterGap();
        }
        val = -num * 100 / denominator;
      }
    } else {
      val = -slidePositions[num];
      if (center && autoWidth) {
        val += getCenterGap();
      }
    }
    if (hasRightDeadZone) {
      val = Math.max(val, rightBoundary);
    }
    val += horizontal && !autoWidth && !fixedWidth ? '%' : 'px';
    return val;
  }
  function doContainerTransformSilent(val) {
    resetDuration(container, '0s');
    doContainerTransform(val);
  }
  function doContainerTransform(val) {
    if (val == null) {
      val = getContainerTransformValue();
    }
    container.style[transformAttr] = transformPrefix + val + transformPostfix;
  }
  function animateSlide(number, classOut, classIn, isOut) {
    var l = number + items;
    if (!loop) {
      l = Math.min(l, slideCountNew);
    }
    for (var i = number; i < l; i++) {
      var item = slideItems[i]; // set item positions

      if (!isOut) {
        item.style.left = (i - index) * 100 / items + '%';
      }
      if (animateDelay && TRANSITIONDELAY) {
        item.style[TRANSITIONDELAY] = item.style[ANIMATIONDELAY] = animateDelay * (i - number) / 1000 + 's';
      }
      removeClass(item, classOut);
      addClass(item, classIn);
      if (isOut) {
        slideItemsOut.push(item);
      }
    }
  } // make transfer after click/drag:
  // 1. change 'transform' property for mordern browsers
  // 2. change 'left' property for legacy browsers

  var transformCore = function () {
    return carousel ? function () {
      resetDuration(container, '');
      if (TRANSITIONDURATION || !speed) {
        // for morden browsers with non-zero duration or
        // zero duration for all browsers
        doContainerTransform(); // run fallback function manually
        // when duration is 0 / container is hidden

        if (!speed || !isVisible(container)) {
          onTransitionEnd();
        }
      } else {
        // for old browser with non-zero duration
        jsTransform(container, transformAttr, transformPrefix, transformPostfix, getContainerTransformValue(), speed, onTransitionEnd);
      }
      if (!horizontal) {
        updateContentWrapperHeight();
      }
    } : function () {
      slideItemsOut = [];
      var eve = {};
      eve[TRANSITIONEND] = eve[ANIMATIONEND] = onTransitionEnd;
      removeEvents(slideItems[indexCached], eve);
      addEvents(slideItems[index], eve);
      animateSlide(indexCached, animateIn, animateOut, true);
      animateSlide(index, animateNormal, animateIn); // run fallback function manually
      // when transition or animation not supported / duration is 0

      if (!TRANSITIONEND || !ANIMATIONEND || !speed || !isVisible(container)) {
        onTransitionEnd();
      }
    };
  }();
  function render(e, sliderMoved) {
    if (updateIndexBeforeTransform) {
      updateIndex();
    } // render when slider was moved (touch or drag) even though index may not change

    if (index !== indexCached || sliderMoved) {
      // events
      events.emit('indexChanged', info());
      events.emit('transitionStart', info());
      if (autoHeight) {
        doAutoHeight();
      } // pause autoplay when click or keydown from user

      if (animating && e && ['click', 'keydown'].indexOf(e.type) >= 0) {
        stopAutoplay();
      }
      running = true;
      transformCore();
    }
  }
  /*
   * Transfer prefixed properties to the same format
   * CSS: -Webkit-Transform => webkittransform
   * JS: WebkitTransform => webkittransform
   * @param {string} str - property
   *
   */

  function strTrans(str) {
    return str.toLowerCase().replace(/-/g, '');
  } // AFTER TRANSFORM
  // Things need to be done after a transfer:
  // 1. check index
  // 2. add classes to visible slide
  // 3. disable controls buttons when reach the first/last slide in non-loop slider
  // 4. update nav status
  // 5. lazyload images
  // 6. update container height

  function onTransitionEnd(event) {
    // check running on gallery mode
    // make sure trantionend/animationend events run only once
    if (carousel || running) {
      events.emit('transitionEnd', info(event));
      if (!carousel && slideItemsOut.length > 0) {
        for (var i = 0; i < slideItemsOut.length; i++) {
          var item = slideItemsOut[i]; // set item positions

          item.style.left = '';
          if (ANIMATIONDELAY && TRANSITIONDELAY) {
            item.style[ANIMATIONDELAY] = '';
            item.style[TRANSITIONDELAY] = '';
          }
          removeClass(item, animateOut);
          addClass(item, animateNormal);
        }
      }
      /* update slides, nav, controls after checking ...
       * => legacy browsers who don't support 'event'
       *    have to check event first, otherwise event.target will cause an error
       * => or 'gallery' mode:
       *   + event target is slide item
       * => or 'carousel' mode:
       *   + event target is container,
       *   + event.property is the same with transform attribute
       */

      if (!event || !carousel && event.target.parentNode === container || event.target === container && strTrans(event.propertyName) === strTrans(transformAttr)) {
        if (!updateIndexBeforeTransform) {
          var indexTem = index;
          updateIndex();
          if (index !== indexTem) {
            events.emit('indexChanged', info());
            doContainerTransformSilent();
          }
        }
        if (nested === 'inner') {
          events.emit('innerLoaded', info());
        }
        running = false;
        indexCached = index;
      }
    }
  } // # ACTIONS

  function goTo(targetIndex, e) {
    if (freeze) {
      return;
    } // prev slideBy

    if (targetIndex === 'prev') {
      onControlsClick(e, -1); // next slideBy
    } else if (targetIndex === 'next') {
      onControlsClick(e, 1); // go to exact slide
    } else {
      if (running) {
        if (preventActionWhenRunning) {
          return;
        } else {
          onTransitionEnd();
        }
      }
      var absIndex = getAbsIndex(),
        indexGap = 0;
      if (targetIndex === 'first') {
        indexGap = -absIndex;
      } else if (targetIndex === 'last') {
        indexGap = carousel ? slideCount - items - absIndex : slideCount - 1 - absIndex;
      } else {
        if (typeof targetIndex !== 'number') {
          targetIndex = parseInt(targetIndex);
        }
        if (!isNaN(targetIndex)) {
          // from directly called goTo function
          if (!e) {
            targetIndex = Math.max(0, Math.min(slideCount - 1, targetIndex));
          }
          indexGap = targetIndex - absIndex;
        }
      } // gallery: make sure new page won't overlap with current page

      if (!carousel && indexGap && Math.abs(indexGap) < items) {
        var factor = indexGap > 0 ? 1 : -1;
        indexGap += index + indexGap - slideCount >= indexMin ? slideCount * factor : slideCount * 2 * factor * -1;
      }
      index += indexGap; // make sure index is in range

      if (carousel && loop) {
        if (index < indexMin) {
          index += slideCount;
        }
        if (index > indexMax) {
          index -= slideCount;
        }
      } // if index is changed, start rendering

      if (getAbsIndex(index) !== getAbsIndex(indexCached)) {
        render(e);
      }
    }
  } // on controls click

  function onControlsClick(e, dir) {
    if (running) {
      if (preventActionWhenRunning) {
        return;
      } else {
        onTransitionEnd();
      }
    }
    var passEventObject;
    if (!dir) {
      e = getEvent(e);
      var target = getTarget(e);
      while (target !== controlsContainer && [prevButton, nextButton].indexOf(target) < 0) {
        target = target.parentNode;
      }
      var targetIn = [prevButton, nextButton].indexOf(target);
      if (targetIn >= 0) {
        passEventObject = true;
        dir = targetIn === 0 ? -1 : 1;
      }
    }
    if (rewind) {
      if (index === indexMin && dir === -1) {
        goTo('last', e);
        return;
      } else if (index === indexMax && dir === 1) {
        goTo('first', e);
        return;
      }
    }
    if (dir) {
      index += slideBy * dir;
      if (autoWidth) {
        index = Math.floor(index);
      } // pass e when click control buttons or keydown

      render(passEventObject || e && e.type === 'keydown' ? e : null);
    }
  } // on nav click

  function onNavClick(e) {
    if (running) {
      if (preventActionWhenRunning) {
        return;
      } else {
        onTransitionEnd();
      }
    }
    e = getEvent(e);
    var target = getTarget(e),
      navIndex; // find the clicked nav item

    while (target !== navContainer && !hasAttr(target, 'data-nav')) {
      target = target.parentNode;
    }
    if (hasAttr(target, 'data-nav')) {
      var navIndex = navClicked = Number(getAttr(target, 'data-nav')),
        targetIndexBase = fixedWidth || autoWidth ? navIndex * slideCount / pages : navIndex * items,
        targetIndex = navAsThumbnails ? navIndex : Math.min(Math.ceil(targetIndexBase), slideCount - 1);
      goTo(targetIndex, e);
      if (navCurrentIndex === navIndex) {
        if (animating) {
          stopAutoplay();
        }
        navClicked = -1; // reset navClicked
      }
    }
  } // autoplay functions

  function setAutoplayTimer() {
    autoplayTimer = setInterval(function () {
      onControlsClick(null, autoplayDirection);
    }, autoplayTimeout);
    animating = true;
  }
  function stopAutoplayTimer() {
    clearInterval(autoplayTimer);
    animating = false;
  }
  function updateAutoplayButton(action, txt) {
    setAttrs(autoplayButton, {
      'data-action': action
    });
    autoplayButton.innerHTML = autoplayHtmlStrings[0] + action + autoplayHtmlStrings[1] + txt;
  }
  function startAutoplay() {
    setAutoplayTimer();
    if (autoplayButton) {
      updateAutoplayButton('stop', autoplayText[1]);
    }
  }
  function stopAutoplay() {
    stopAutoplayTimer();
    if (autoplayButton) {
      updateAutoplayButton('start', autoplayText[0]);
    }
  } // programaitcally play/pause the slider

  function play() {
    if (autoplay && !animating) {
      startAutoplay();
      autoplayUserPaused = false;
    }
  }
  function pause() {
    if (animating) {
      stopAutoplay();
      autoplayUserPaused = true;
    }
  }
  function toggleAutoplay() {
    if (animating) {
      stopAutoplay();
      autoplayUserPaused = true;
    } else {
      startAutoplay();
      autoplayUserPaused = false;
    }
  }
  function onVisibilityChange() {
    if (doc.hidden) {
      if (animating) {
        stopAutoplayTimer();
        autoplayVisibilityPaused = true;
      }
    } else if (autoplayVisibilityPaused) {
      setAutoplayTimer();
      autoplayVisibilityPaused = false;
    }
  }
  function mouseoverPause() {
    if (animating) {
      stopAutoplayTimer();
      autoplayHoverPaused = true;
    }
  }
  function mouseoutRestart() {
    if (autoplayHoverPaused) {
      setAutoplayTimer();
      autoplayHoverPaused = false;
    }
  } // keydown events on document

  function onDocumentKeydown(e) {
    e = getEvent(e);
    var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);
    if (keyIndex >= 0) {
      onControlsClick(e, keyIndex === 0 ? -1 : 1);
    }
  } // on key control

  function onControlsKeydown(e) {
    e = getEvent(e);
    var keyIndex = [KEYS.LEFT, KEYS.RIGHT].indexOf(e.keyCode);
    if (keyIndex >= 0) {
      if (keyIndex === 0) {
        if (!prevButton.disabled) {
          onControlsClick(e, -1);
        }
      } else if (!nextButton.disabled) {
        onControlsClick(e, 1);
      }
    }
  } // set focus

  function setFocus(el) {
    el.focus();
  } // on key nav

  function onNavKeydown(e) {
    e = getEvent(e);
    var curElement = doc.activeElement;
    if (!hasAttr(curElement, 'data-nav')) {
      return;
    } // var code = e.keyCode,

    var keyIndex = [KEYS.LEFT, KEYS.RIGHT, KEYS.ENTER, KEYS.SPACE].indexOf(e.keyCode),
      navIndex = Number(getAttr(curElement, 'data-nav'));
    if (keyIndex >= 0) {
      if (keyIndex === 0) {
        if (navIndex > 0) {
          setFocus(navItems[navIndex - 1]);
        }
      } else if (keyIndex === 1) {
        if (navIndex < pages - 1) {
          setFocus(navItems[navIndex + 1]);
        }
      } else {
        navClicked = navIndex;
        goTo(navIndex, e);
      }
    }
  }
  function getEvent(e) {
    e = e || win.event;
    return isTouchEvent(e) ? e.changedTouches[0] : e;
  }
  function getTarget(e) {
    return e.target || win.event.srcElement;
  }
  function isTouchEvent(e) {
    return e.type.indexOf('touch') >= 0;
  }
  function preventDefaultBehavior(e) {
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
  }
  function getMoveDirectionExpected() {
    return getTouchDirection(toDegree(lastPosition.y - initPosition.y, lastPosition.x - initPosition.x), swipeAngle) === options.axis;
  }
  function onPanStart(e) {
    if (running) {
      if (preventActionWhenRunning) {
        return;
      } else {
        onTransitionEnd();
      }
    }
    if (autoplay && animating) {
      stopAutoplayTimer();
    }
    panStart = true;
    if (rafIndex) {
      caf(rafIndex);
      rafIndex = null;
    }
    var $ = getEvent(e);
    events.emit(isTouchEvent(e) ? 'touchStart' : 'dragStart', info(e));
    if (!isTouchEvent(e) && ['img', 'a'].indexOf(getLowerCaseNodeName(getTarget(e))) >= 0) {
      preventDefaultBehavior(e);
    }
    lastPosition.x = initPosition.x = $.clientX;
    lastPosition.y = initPosition.y = $.clientY;
    if (carousel) {
      translateInit = parseFloat(container.style[transformAttr].replace(transformPrefix, ''));
      resetDuration(container, '0s');
    }
  }
  function onPanMove(e) {
    if (panStart) {
      var $ = getEvent(e);
      lastPosition.x = $.clientX;
      lastPosition.y = $.clientY;
      if (carousel) {
        if (!rafIndex) {
          rafIndex = raf(function () {
            panUpdate(e);
          });
        }
      } else {
        if (moveDirectionExpected === '?') {
          moveDirectionExpected = getMoveDirectionExpected();
        }
        if (moveDirectionExpected) {
          preventScroll = true;
        }
      }
      if ((typeof e.cancelable !== 'boolean' || e.cancelable) && preventScroll) {
        e.preventDefault();
      }
    }
  }
  function panUpdate(e) {
    if (!moveDirectionExpected) {
      panStart = false;
      return;
    }
    caf(rafIndex);
    if (panStart) {
      rafIndex = raf(function () {
        panUpdate(e);
      });
    }
    if (moveDirectionExpected === '?') {
      moveDirectionExpected = getMoveDirectionExpected();
    }
    if (moveDirectionExpected) {
      if (!preventScroll && isTouchEvent(e)) {
        preventScroll = true;
      }
      try {
        if (e.type) {
          events.emit(isTouchEvent(e) ? 'touchMove' : 'dragMove', info(e));
        }
      } catch (err) {}
      var x = translateInit,
        dist = getDist(lastPosition, initPosition);
      if (!horizontal || fixedWidth || autoWidth) {
        x += dist;
        x += 'px';
      } else {
        var percentageX = TRANSFORM ? dist * items * 100 / ((viewport + gutter) * slideCountNew) : dist * 100 / (viewport + gutter);
        x += percentageX;
        x += '%';
      }
      container.style[transformAttr] = transformPrefix + x + transformPostfix;
    }
  }
  function onPanEnd(e) {
    if (panStart) {
      if (rafIndex) {
        caf(rafIndex);
        rafIndex = null;
      }
      if (carousel) {
        resetDuration(container, '');
      }
      panStart = false;
      var $ = getEvent(e);
      lastPosition.x = $.clientX;
      lastPosition.y = $.clientY;
      var dist = getDist(lastPosition, initPosition);
      if (Math.abs(dist)) {
        // drag vs click
        if (!isTouchEvent(e)) {
          // prevent "click"
          var target = getTarget(e);
          addEvents(target, {
            'click': function preventClick(e) {
              preventDefaultBehavior(e);
              removeEvents(target, {
                'click': preventClick
              });
            }
          });
        }
        if (carousel) {
          rafIndex = raf(function () {
            if (horizontal && !autoWidth) {
              var indexMoved = -dist * items / (viewport + gutter);
              indexMoved = dist > 0 ? Math.floor(indexMoved) : Math.ceil(indexMoved);
              index += indexMoved;
            } else {
              var moved = -(translateInit + dist);
              if (moved <= 0) {
                index = indexMin;
              } else if (moved >= slidePositions[slideCountNew - 1]) {
                index = indexMax;
              } else {
                var i = 0;
                while (i < slideCountNew && moved >= slidePositions[i]) {
                  index = i;
                  if (moved > slidePositions[i] && dist < 0) {
                    index += 1;
                  }
                  i++;
                }
              }
            }
            render(e, dist);
            events.emit(isTouchEvent(e) ? 'touchEnd' : 'dragEnd', info(e));
          });
        } else {
          if (moveDirectionExpected) {
            onControlsClick(e, dist > 0 ? -1 : 1);
          }
        }
      }
    } // reset

    if (options.preventScrollOnTouch === 'auto') {
      preventScroll = false;
    }
    if (swipeAngle) {
      moveDirectionExpected = '?';
    }
    if (autoplay && !animating) {
      setAutoplayTimer();
    }
  } // === RESIZE FUNCTIONS === //
  // (slidePositions, index, items) => vertical_conentWrapper.height

  function updateContentWrapperHeight() {
    var wp = middleWrapper ? middleWrapper : innerWrapper;
    wp.style.height = slidePositions[index + items] - slidePositions[index] + 'px';
  }
  function getPages() {
    var rough = fixedWidth ? (fixedWidth + gutter) * slideCount / viewport : slideCount / items;
    return Math.min(Math.ceil(rough), slideCount);
  }
  /*
   * 1. update visible nav items list
   * 2. add "hidden" attributes to previous visible nav items
   * 3. remove "hidden" attrubutes to new visible nav items
   */

  function updateNavVisibility() {
    if (!nav || navAsThumbnails) {
      return;
    }
    if (pages !== pagesCached) {
      var min = pagesCached,
        max = pages,
        fn = showElement;
      if (pagesCached > pages) {
        min = pages;
        max = pagesCached;
        fn = hideElement;
      }
      while (min < max) {
        fn(navItems[min]);
        min++;
      } // cache pages

      pagesCached = pages;
    }
  }
  function info(e) {
    return {
      container: container,
      slideItems: slideItems,
      navContainer: navContainer,
      navItems: navItems,
      controlsContainer: controlsContainer,
      hasControls: hasControls,
      prevButton: prevButton,
      nextButton: nextButton,
      items: items,
      slideBy: slideBy,
      cloneCount: cloneCount,
      slideCount: slideCount,
      slideCountNew: slideCountNew,
      index: index,
      indexCached: indexCached,
      displayIndex: getCurrentSlide(),
      navCurrentIndex: navCurrentIndex,
      navCurrentIndexCached: navCurrentIndexCached,
      pages: pages,
      pagesCached: pagesCached,
      sheet: sheet,
      isOn: isOn,
      event: e || {}
    };
  }
  return {
    version: '2.9.4',
    getInfo: info,
    events: events,
    goTo: goTo,
    play: play,
    pause: pause,
    isOn: isOn,
    updateSliderHeight: updateInnerWrapperHeight,
    refresh: initSliderTransform,
    destroy: destroy,
    rebuild: function () {
      return tns(extend(options, optionsElements));
    }
  };
};
exports.tns = tns;

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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var accordion_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _region_delivery_accordion_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _region_delivery_api_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _region_delivery_popup_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _region_delivery_map_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _region_delivery_modal_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);
/* harmony import */ var _region_delivery_faq_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);
/* harmony import */ var _json_region_delivery_questions_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony import */ var _region_delivery_form_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(10);
/* harmony import */ var _region_delivery_regions_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(41);
/* harmony import */ var _region_delivery_navigation_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(42);
/* harmony import */ var _region_delivery_slider_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(43);












(0,_region_delivery_api_js__WEBPACK_IMPORTED_MODULE_2__.getData)(regions => {
  (0,_region_delivery_regions_js__WEBPACK_IMPORTED_MODULE_9__.renderCitiesDelivery)(regions);
});
(0,_region_delivery_form_js__WEBPACK_IMPORTED_MODULE_8__.setFormSubmit)((0,_region_delivery_form_js__WEBPACK_IMPORTED_MODULE_8__.sendForm)(_region_delivery_form_js__WEBPACK_IMPORTED_MODULE_8__.setSuccessState, _region_delivery_form_js__WEBPACK_IMPORTED_MODULE_8__.setErrorState));
(0,_region_delivery_faq_js__WEBPACK_IMPORTED_MODULE_6__.renderQuestionsList)(_json_region_delivery_questions_json__WEBPACK_IMPORTED_MODULE_7__);

// eslint-disable-next-line
ymaps.ready(_region_delivery_map_js__WEBPACK_IMPORTED_MODULE_4__["default"]);
(0,_region_delivery_popup_js__WEBPACK_IMPORTED_MODULE_3__["default"])();

// Sliders

(0,_region_delivery_slider_js__WEBPACK_IMPORTED_MODULE_11__.setSimpleSlider)('#slider-cost-delivery-buttons', '#slider-cost-delivery');
(0,_region_delivery_slider_js__WEBPACK_IMPORTED_MODULE_11__.setSimpleSlider)('#slider-delivery-type-buttons', '.receiving-type__main-slider');
if (document.querySelector('#pickup-slider') && document.querySelector('#pickup-slider-buttons')) {
  (0,_region_delivery_slider_js__WEBPACK_IMPORTED_MODULE_11__.setSlider)('#pickup-slider', {
    controlsContainer: '#pickup-slider-buttons',
    controls: true,
    nav: false
  });
}

// Accordions

const accordionDelivery = new accordion_js__WEBPACK_IMPORTED_MODULE_0__(Array.from(document.querySelectorAll('.accordion--delivery')));
(0,_region_delivery_accordion_js__WEBPACK_IMPORTED_MODULE_1__.settingAccordionAdaptive)(accordionDelivery);
const accordionFAQ = new accordion_js__WEBPACK_IMPORTED_MODULE_0__(Array.from(document.querySelectorAll('.accordion--faq')), {
  duration: 100
});
(0,_region_delivery_accordion_js__WEBPACK_IMPORTED_MODULE_1__.closeAllAccordions)(accordionFAQ);

// Navigation

(0,_region_delivery_navigation_js__WEBPACK_IMPORTED_MODULE_10__.setNavigation)('#navigation-in');
(0,_region_delivery_navigation_js__WEBPACK_IMPORTED_MODULE_10__.setNavigation)('#cost-regions');
(0,_region_delivery_navigation_js__WEBPACK_IMPORTED_MODULE_10__.setNavigation)('#global-up');
(0,_region_delivery_navigation_js__WEBPACK_IMPORTED_MODULE_10__.setNavigation)('#receiving-up');
(0,_region_delivery_navigation_js__WEBPACK_IMPORTED_MODULE_10__.setNavigation)('#regions-list-button');
(0,_region_delivery_navigation_js__WEBPACK_IMPORTED_MODULE_10__.setNavigation)('#receiving-close-up', () => (0,_region_delivery_accordion_js__WEBPACK_IMPORTED_MODULE_1__.closeAllAccordions)(accordionDelivery));
})();

/******/ })()
;