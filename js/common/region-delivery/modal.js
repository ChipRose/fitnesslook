import { Fancybox } from '@fancyapps/ui'

const buttonsModal = document.querySelectorAll('.button-modal__button')

buttonsModal.forEach((button) => {
  button?.addEventListener('click', () => {
    Fancybox.bind('[data-fancybox]', {
    })
  })
})
