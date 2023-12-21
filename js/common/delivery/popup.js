const OPEN_CLASS = 'button-popup--open';
const popupItems = document.querySelectorAll('.button-popup');

const closeAllPopup = () => {
  popupItems.forEach((item) => {
    item.classList.remove(OPEN_CLASS)
  })
}

popupItems.forEach((item) => {
  item.addEventListener('click', () => {
    closeAllPopup()
    item.classList.toggle(OPEN_CLASS)
  })
})

