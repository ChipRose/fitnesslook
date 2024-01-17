const templateSuccess = document.querySelector('#success').content.querySelector('.success');
const body = document.querySelector('body');

const removeElements = (...selectors) => {
  selectors?.forEach((selector) => {
    document.querySelectorAll(selector).forEach(item => item.remove());
  })
}

const isEscape = (evt) => {
  return evt.key === 'Escape' || evt.key === 'ESC';
}

const showMessage = (template, buttonClose) => {

  body.appendChild(template);

  template.addEventListener('click', () => {
    template.remove();
  })

  document.addEventListener('keydown', (evt) => {
    if (isEscape(evt)) {
      template.remove();
      document.removeEventListener('keydown', (evt));
    }
  });

  if (buttonClose) {
    const button = template.querySelector(`.${buttonClose}`);
    button.addEventListener('click', () => {
      template.remove();
    })
  }
};

export { removeElements };
