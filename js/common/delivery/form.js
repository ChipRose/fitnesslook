import { sendData } from '../delivery/api.js';

const TIMEOUT_DELAY = 3000;

const buttonNewLocation = document.querySelector('#button-new-location');
const formBlock = document.querySelector('#form-communicate');
const form = document.querySelector('#form');

const templateSuccess = document.querySelector('#success').content.querySelector('.message');
const templateError = document.querySelector('#error').content.querySelector('.message');
const content = document.querySelector('#main_content_template');


buttonNewLocation.addEventListener('click', () => {
  formBlock.classList.toggle('form-communicate--open');
})

const setFormSubmit = (...callbacks) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    callbacks.forEach((cb) => cb());
  });
};

const sendForm = (onSuccess = () => console.log("Форма отправлена"), onError = () => console.log("Ошибка при отправке")) => {
  const setState = () => {
    const formData = new FormData(form);
    sendData(
      () => onSuccess(),
      () => onError(),
      formData,
    );
  };

  return setState;
};

const isEscape = (evt) => {
  return evt.key === 'Escape' || evt.key === 'ESC';
}

const showMessage = (template, buttonClose) => {

  content.appendChild(template);

  template.addEventListener('click', () => {
    template.remove();
  });

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
  } else {
    setTimeout(() => template.remove(), TIMEOUT_DELAY);
  }
};

const setSuccessState = () => {
  showMessage(templateSuccess);
  form.reset();
};

const setErrorState = () => {
  showMessage(templateError);
};

export { setFormSubmit, sendForm, setSuccessState, setErrorState };
