import $ from 'jquery';

$(document).ready(() => {
  // Обработка клика по табам
  const handleTabClick = function () {
    const tabId = $(this).data('tab');

    $('.tab-menu__item').removeClass('tab-menu__item--active');
    $('.tab-content__item').removeClass('tab-content__item--active');

    $(this).addClass('tab-menu__item--active');
    $('#' + tabId).addClass('tab-content__item--active');

    const container = $('.tab-menu');
    const scrollLeft = container.scrollLeft();
    const buttonOffset = $(this).offset().left - container.offset().left + scrollLeft;

    container.animate(
      {
        scrollLeft: buttonOffset - container.width() / 2 + $(this).outerWidth() / 2,
      },
      300
    );
  };

  $('.tab-menu__item').on('click', handleTabClick);

  // Функция для открытия модального окна
  const onSuccess = () => {
    $('#modal-success').addClass('open');
    $('body').addClass('lock');
    $('.main_content').addClass('bg-dark');
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    $('#modal-success').removeClass('open');
    $('body').removeClass('lock');
    $('.main_content').removeClass('bg-dark');
  };

  // Обработка формы
  $('#form-sertificate').on('submit', (event) => {
    event.preventDefault();

    const formData = $('#form-sertificate').serialize();

    $.ajax({
      type: 'POST',
      url: '/callme.php', // Укажите правильный URL для отправки
      data: formData,
      success: (response) => {
        $('#form-sertificate')[0].reset(); // Очищаем форму
        onSuccess(); // Показываем модальное окно

        $('#id_order').text(JSON.parse(response).id);
      },
      error: () => {
        // alert('Произошла ошибка при отправке данных.');
      },
    });
  });

  // Закрытие модального окна по кнопке
  $(document).on('click', '.close-modal-success', () => {
    closeModal();
  });

  // Закрытие модального окна при клике вне его области
  $(document).on('click', (event) => {
    if ($(event.target).closest('#modal-success').length === 0 && $('#modal-success').hasClass('open')) {
      closeModal(); // Закрываем окно, если клик был вне его содержимого
    }
  });

  // Убираем всплытие события при клике на модальном окне или его содержимом
  $(document).on('click', '#modal-success', (event) => {
    event.stopPropagation(); // Предотвращаем закрытие модального окна при клике на нем
  });
});

export default {}; // Экспортируем пустой объект, если ничего явно не нужно экспортировать
