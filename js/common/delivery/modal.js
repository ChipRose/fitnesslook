const paymentSection = document.querySelector('.payment');
const buttonsModal = document.querySelectorAll('.button-modal__item');

buttonsModal.forEach((button) => {
  const modal = button.querySelector('.button-modal__modal');
  const handleClose = () => {
    paymentSection.classList.remove('payment--open');
    modal.classList.remove('button-modal__modal--open');
    window.removeEventListener('keydown', eskClose);
  }

  const eskClose = (evt) => {
    if (evt.code === "Escape" || evt.code === "ESC") {
      handleClose();
    }
  }

  button.querySelector('.button-modal__button')?.addEventListener('click', () => {
    window.addEventListener('keydown', eskClose);

    paymentSection.classList.add('payment--open');
    modal.classList.add('button-modal__modal--open');

    modal.querySelector('.button-model__close-button')?.addEventListener('click', () => {
      handleClose();
    })
  });
})

