const HEADER_HEIGHT = 153;

const navigationHandle = (element, ...callBacks) => {
  const elementHref = element.target.href;
  const elementId = elementHref.substring(elementHref.indexOf('#'));
  const scrollElement = document.querySelector(elementId).offsetTop;
  window.scrollTo({ top: scrollElement + HEADER_HEIGHT, behavior: 'smooth' });

  if (callBacks?.length) {
    callBacks.forEach((cb) => {
      cb();
    });
  }
};

const setNavigation = (container, ...callBacks) => {
  const navigationList = document.querySelector(container);

  navigationList?.addEventListener('click', (evt) => {
    evt.preventDefault();
    navigationHandle(evt, ...callBacks);
  });
};

const setSetNavigation = (container, ...callBacks) => {
  const navigationItemList = document.querySelectorAll(container);

  Array.from(navigationItemList).map((navItem) => {
    navItem.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (callBacks?.length) {
        callBacks.forEach((cb) => {
          cb();
        });
      }
      navigationHandle(evt);
    });
  });
};

export { setNavigation, setSetNavigation };
