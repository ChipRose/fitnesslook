import { Fancybox } from '@fancyapps/ui';

const buttonsModal = document.querySelectorAll('.payment-item__button');

buttonsModal.forEach((button) => {
  button?.addEventListener('click', () => {
    Fancybox.bind('[data-fancybox]', {
    });
  });
});
