const paymentSection = document.querySelector('.payment');
const buttonsModal = document.querySelectorAll('.button-modal__item');

const eskClose = (evt) => {
  if (evt.code === "Escape" || evt.code === "ESC") {
    handleClose();
  }
}

buttonsModal.forEach((button) => {
  const modal = button.querySelector('.button-modal__modal');

  const handleMobTooltip = () => {
    modal.classList.add('button-modal__modal--open');
    modal.focus();
    modal.addEventListener('blur', () => {
      modal.classList.remove('button-modal__modal--open');
    })
  }

  const handleClose = () => {
    modal.classList.remove('button-modal__modal--open');
  }

  const handleDeskTooltip = () => {
    modal.classList.add('button-modal__modal--open');
    button.addEventListener('mouseout', handleClose, { once: true });
  }

  const handleWindowResize = () => {
    const windowWidth = window.innerWidth;
    const actElement = button.querySelector('.button-modal__button');

    if (windowWidth < 768) {
      actElement?.removeEventListener('mouseout', handleClose);
      actElement?.removeEventListener('mouseover', handleDeskTooltip);
      actElement?.addEventListener('click', handleMobTooltip);
    } else {
      actElement?.removeEventListener('click', handleMobTooltip);
      actElement?.addEventListener('mouseover', handleDeskTooltip);
    }
  }

  handleWindowResize(button, modal);
  window.addEventListener('resize', handleWindowResize);
})

