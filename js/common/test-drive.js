import $ from 'jquery';

import 'jquery-datetimepicker';

$(document).ready(() => {
  const modalSuccess = document.querySelector('#modal-success');
  const modalError = document.querySelector('#modal-error');

  const closeSuccessButtons = modalSuccess.querySelectorAll('button[data-id="close-modal"]');
  const closeErrorButton = modalError.querySelector('button[data-id="close-modal"]');

  const body = document.querySelector('body');

  const categoryButtons = document.querySelectorAll('.buttons-circle__button');

  //TABS
  const handleTabClick = function () {
    const tabId = $(this).data('tab');

    $('.tab-menu__item').removeClass('tab-menu__item--active');
    $('.tab-content__item').removeClass('tab-content__item--active');

    $(this).addClass('tab-menu__item--active');
    $(`#${tabId}`).addClass('tab-content__item--active');

    const container = $('.tab-menu');
    const scrollLeft = container.scrollLeft();
    const buttonOffset =
      $(this).offset().left - container.offset().left + scrollLeft;

    container.animate(
      {
        scrollLeft:
          buttonOffset - container.width() / 2 + $(this).outerWidth() / 2,
      },
      300
    );
  };

  $('.tab-menu__item').on('click', handleTabClick);

  //FORM

  const openModalSuccess = () => {
    modalSuccess.show();
    body.classList.add('body-lock');
  };

  const closeModalSuccess = () => {
    modalSuccess.close();
    body.classList.remove('body-lock');
  };

  const openModalError = () => {
    modalError.show();
    body.classList.add('body-lock');
  };

  const closeModalError = () => {
    modalError.close();
    body.classList.remove('body-lock');
  };

  const onSuccess = () => {
    openModalSuccess();
  };

  const onError = () => {
    openModalError();
  };

  $('#form-sertificate').on('submit', (event) => {
    event.preventDefault();

    const formData = $('#form-sertificate').serialize();

    $.ajax({
      type: 'POST',
      url: '/callme.php',
      data: formData,
      success: () => {
        $('#form-sertificate')[0].reset();
        onSuccess();
      },
      error: () => {
        onError();
      },
    });
  });

  //MODAL

  closeSuccessButtons.forEach((button) => {
    button.addEventListener('click', closeModalSuccess);
  });

  closeErrorButton.addEventListener('click', closeModalError);

  $(document).on('click', (event) => {
    if (
      $(event.target).closest('#modal-success').length === 0 &&
      modalSuccess.open
    ) {
      closeModalSuccess();
    }
  });

  $(document).on('click', (event) => {
    if (
      $(event.target).closest('#modal-error').length === 0 &&
      modalError.open
    ) {
      closeModalError();
    }
  });

  $(document).on('click', '#modal-success', (event) => {
    event.stopPropagation();
  });

  $(document).on('click', '#modal-error', (event) => {
    event.stopPropagation();
  });

  //SELECT

  document.querySelectorAll('.select').forEach((select) => {
    const selectEl = select.querySelector('.select__field');
    const selectField = select.querySelector('.select__value');
    const options = select.querySelector('.select__list');
    const inputHidden = select.querySelector('input');

    selectEl.addEventListener('click', () => {
      document.querySelectorAll('.select.open').forEach((el) => {
        if (el !== select) {
          el.classList.remove('open');
        }
      });
      select.classList.toggle('open');
    });

    options.querySelectorAll('li').forEach((option) => {
      option.addEventListener('click', () => {
        selectField.textContent = option.textContent;
        selectField.dataset.value = option.dataset.value;
        inputHidden.value = option.dataset.value;
        inputHidden.setCustomValidity('');
        select.classList.remove('open');
      });
    });

    document.addEventListener('click', (evt) => {
      if (!select.contains(evt.target)) {
        select.classList.remove('open');
      }
    });

    const form = select.closest('form');
    if (form) {
      form.addEventListener('submit', (evt) => {
        if (!inputHidden.value) {
          evt.preventDefault();
          inputHidden.setCustomValidity('Пожалуйста, выберите значение');
          inputHidden.reportValidity();
        }
      });

      form.addEventListener('reset', () => {
        selectEl.textContent = selectEl.dataset.placeholder || 'Выберите';
        delete selectEl.dataset.value;
        inputHidden.value = '';
        inputHidden.setCustomValidity('');
      });
    }
  });

  //DATE

  $.datetimepicker.setLocale('ru');
  $('input[name="date"]').datetimepicker({
    format: 'd-m-Y',
    timepicker: false,
    lang: 'ru',
    scrollMonth: false,
    scrollInput: false,
  });
  $('input[name="time"]').datetimepicker({
    format: 'H:i',
    datepicker: false,
    step: 30,
    minTime: '11:00',
    maxTime: '20:00',
    lang: 'ru',
    scrollMonth: false,
    scrollInput: false,
  });

  //CATEGORY BUTTONS

  const handleCategoryClick = (evt) => {
    evt.preventDefault();

    const url = evt.target.closest('[data-url]').dataset.url;

    if (!url) {
      return;
    }

    window.open(url, '_blank');

  };

  categoryButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      handleCategoryClick(evt);
    });
  });
});

export default {};
