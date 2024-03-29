const MONTH_E = {
  'декабрь': 'декабре',
  'январь': 'январе',
  'февраль': 'феврале',
  'март': 'марте',
  'апрель': 'апреле',
  'май': 'мае',
  'июнь': 'июне',
  'июль': 'июле',
  'август': 'августе',
  'сентябрь': 'сентябре',
  'октябрь': 'октябре',
  'ноябрь': 'ноябре',
};

const removeElements = (...selectors) => {
  selectors?.forEach((selector) => {
    document.querySelectorAll(selector).forEach((item) => item.remove());
  });
};

const scrollToElement = (selector) => {
  const HEADER_HEIGHT = 153;
  const scrollElement = document.querySelector(selector)?.offsetTop;
  window.scrollTo({ top: scrollElement + HEADER_HEIGHT, behavior: 'smooth' });
};

const getCurMonth = () => {
  const date = new Date();
  const monthName = date.toLocaleString('default', { month: 'long' });
  return MONTH_E[monthName];
};

export { removeElements, scrollToElement, getCurMonth };
