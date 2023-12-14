
const formatNumber = (number) => {
  return typeof Number(number) === 'number' && number.toString().length === 1 ? `0${number}` : number;
}

const addListeners = (selector, cb) => {
  const elements=document.querySelectorAll(selector);

  elements.forEach(button => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      cb();
    })
  })
}

const formatPrice = (number)=>{
  return number.toString().split(/(?=(?:...)*$)/).join("'");
}

const removeElements = (selectors) => {
  selectors?.forEach((selector) => {
    document.querySelectorAll(selector).forEach(item=>item.remove())
  })
}

const getCompare = (a, b) => {
  return b.content.length - a.content.length;
}

const sortProjects=(array)=>{
  return array.sort(getCompare)
}

export { formatNumber, removeElements, addListeners, formatPrice, sortProjects }
