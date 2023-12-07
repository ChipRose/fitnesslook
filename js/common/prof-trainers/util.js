const getProjectsIndex = (slider) => {
  return {
    current: slider.getInfo().displayIndex,
    next: slider.getInfo().displayIndex === slider.getInfo().slideCount ? '...' : slider.getInfo().displayIndex + 1,
    prev: slider.getInfo().displayIndex === 1 ? '...' : slider.getInfo().displayIndex - 1
  }
}

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

const removeElements = (selectors) => {
  selectors?.forEach((selector) => {
    document.querySelectorAll(selector).forEach(item=>item.remove())
  })
}



export { getProjectsIndex, formatNumber, removeElements, addListeners }
