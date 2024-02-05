import { Fancybox } from "@fancyapps/ui"

const buttonsModal = document.querySelectorAll('.button-modal__button');

const eskClose = (evt) => {
  if (evt.code === "Escape" || evt.code === "ESC") {
    handleClose();
  }
}

buttonsModal.forEach((button) => {

  button?.addEventListener("click", () => {
    console.log('click');
    Fancybox.bind('[data-fancybox]', {
    });
  })
})

