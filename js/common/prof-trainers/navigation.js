const setNavigation = (container) => {
  const HEADER_HEIGHT = 153;
  const navigationList = document.querySelector(container);

  if (navigationList) {
    navigationList.addEventListener('click', (evt) => {
      evt.preventDefault();
      const elementHref = evt.target.href;
      const elementId = elementHref.substring(elementHref.indexOf('#'));
      const scrollElement = document.querySelector(elementId).offsetTop;
      window.scrollTo({ top: scrollElement + HEADER_HEIGHT, behavior: 'smooth' });
    });
  }
};

export { setNavigation };
