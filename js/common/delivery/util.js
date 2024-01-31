const removeElements = (...selectors) => {
  selectors?.forEach((selector) => {
    document.querySelectorAll(selector).forEach(item => item.remove());
  })
}

const scrollToElement = (selector) => {
  const HEADER_HEIGHT = 153;
  const scrollElement = document.querySelector(selector)?.offsetTop;
  console.log(document.querySelector(selector), scrollElement);
  window.scrollTo({ top: scrollElement + HEADER_HEIGHT, behavior: 'smooth' });
}

export { removeElements, scrollToElement };
