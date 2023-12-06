const setNavigation = (container) => {
  const navigationList = document.querySelector(container);

  if (navigationList) {
    navigationList.addEventListener('click', (evt) => {
      evt.preventDefault();
      const elementHref = evt.target.href;
      const elementId = elementHref.substring(elementHref.indexOf('#'));
      const scrollElement = document.querySelector(elementId).offsetTop;
      window.scrollTo({ top: scrollElement, behavior: 'smooth' });
    })
  }
}

export { setNavigation }
