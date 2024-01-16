const buttonNewLocation = document.querySelector('#button-new-location');
const formBlock = document.querySelector('#form-communicate');
const form = document.querySelector('#form');


buttonNewLocation.addEventListener('click', () => {
  formBlock.classList.toggle('form-communicate--open');
})


const setPromoFormSubmit = (...callbacks) => {
  promoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    callbacks.forEach((cb) => cb());
  });
};

export {setPromoFormSubmit};
