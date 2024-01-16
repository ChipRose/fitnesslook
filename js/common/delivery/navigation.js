const setNavigation = (container, ...callBacks) => {
  const HEADER_HEIGHT = 153;
  const navigationList = document.querySelector(container);

  const navigationHandle = (element, ...callBacks) => {
    const elementHref = element.target.href;
    const elementId = elementHref.substring(elementHref.indexOf('#'));
    const scrollElement = document.querySelector(elementId).offsetTop;
    window.scrollTo({ top: scrollElement + HEADER_HEIGHT, behavior: 'smooth' });

    if (callBacks?.length) {
      callBacks.forEach((cb => {
        cb();
      }))
    }
  }

  navigationList?.addEventListener('click', (evt) => {
    evt.preventDefault();
    navigationHandle(evt, ...callBacks);
  })
}


export { setNavigation };
