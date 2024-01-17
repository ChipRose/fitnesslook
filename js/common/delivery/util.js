const removeElements = (...selectors) => {
  selectors?.forEach((selector) => {
    document.querySelectorAll(selector).forEach(item => item.remove());
  })
}

export { removeElements };
