import { sendData } from '../delivery/api.js';
import IMask from 'imask';

const TIMEOUT_DELAY = 3000;

const buttonNewLocation = document.querySelector('#button-new-location');
const formBlock = document.querySelector('#form-communicate');
const form = document.querySelector('#form-delivery');
const phoneInput = form.querySelector('#phone-field');

const templateSuccess = document.querySelector('#success').content.querySelector('.message');
const templateError = document.querySelector('#error').content.querySelector('.message');
const content = document.querySelector('#main_content_template');
const body = document.querySelector('body');
const bg = document.querySelector('.content');

const maskOptions = {
  mask: '+{7}(000)000-00-00'
};

const phoneMask = IMask(phoneInput, maskOptions);

buttonNewLocation.addEventListener('click', () => {
  formBlock.classList.toggle('form-communicate--open');
  if (formBlock.classList.contains('form-communicate--open')) {
    const scrollElement = document.querySelector('#form-block').offsetTop;
    window.scrollTo({ top: scrollElement + 153, behavior: 'smooth' });
  }
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
    const data = {};
    data['form_name'] = form.id;
    formData.forEach((value, key) => (data[key] = value));
    data.phone = phoneMask.unmaskedValue;
    sendData(
      () => onSuccess(),
      () => onError(),
      data
    );
  };

  return setState;
};

const isEscape = (evt) => {
  return evt.key === 'Escape' || evt.key === 'ESC';
}

const showMessage = (template, buttonClose) => {

  content.appendChild(template);
  bg.classList.add('content--lock');
  body.classList.add('body-lock');

  const removeModalHandler = () => {
    template.remove();
    bg.classList.remove('content--lock');
    body.classList.remove('body-lock');
  }

  document.addEventListener('keydown', (evt) => {
    if (isEscape(evt)) {
      removeModalHandler();
      document.removeEventListener('keydown', (evt));
    }
  });

  if (buttonClose) {
    const button = template.querySelector(`.${buttonClose}`);
    button.addEventListener('click', removeModalHandler)
  } else {
    setTimeout(() => removeModalHandler(), TIMEOUT_DELAY);
  }

  const back = document.querySelector('.content--lock');
  back && back.addEventListener('click', removeModalHandler)
};

const setSuccessState = () => {
  showMessage(templateSuccess, 'message__close-button');
  form.reset();
};

const setErrorState = () => {
  showMessage(templateError, 'button-close');
};

export { setFormSubmit, sendForm, setSuccessState, setErrorState, phoneMask };
