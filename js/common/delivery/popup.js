const OPEN_CLASS = 'button-popup--open';
const popupItems = document.querySelectorAll('.button-popup');

const closeAllPopup = () => {
  popupItems.forEach((item) => {
    item.classList.remove(OPEN_CLASS)
  })
}

popupItems.forEach((item) => {
  const buttonPopup= item.querySelector('.button-popup__button');

  item.addEventListener('click', () => {
    if(item.classList.contains(OPEN_CLASS)){
      closeAllPopup();
    } else {
      closeAllPopup();
      item.classList.add(OPEN_CLASS)
    }
  });

  buttonPopup.addEventListener('blur', () => {
    closeAllPopup();
  })
})

