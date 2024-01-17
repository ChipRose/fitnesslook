import { sendData } from '../delivery/api.js';

const buttonNewLocation = document.querySelector('#button-new-location');
const formBlock = document.querySelector('#form-communicate');
const form = document.querySelector('#form');


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

export { setFormSubmit, sendForm };
