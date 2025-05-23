const formatNumber = (number) => typeof Number(number) === 'number' && number.toString().length === 1 ? `0${number}` : number;

const addListeners = (selector, cb) => {
  const elements = document.querySelectorAll(selector);

  elements.forEach((button) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      cb();
    });
  });
};

const formatPrice = (number) => number.toString().split(/(?=(?:...)*$)/).join('\'');

const removeElements = (selectors) => {
  selectors?.forEach((selector) => {
    document.querySelectorAll(selector).forEach((item) => item.remove());
  });
};

const getCompare = (a, b) => b.content.length - a.content.length;

const sortProjects = (array) => array.sort(getCompare);

export { formatNumber, removeElements, addListeners, formatPrice, sortProjects };
