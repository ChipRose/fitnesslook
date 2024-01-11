const OPEN_CLASS = 'button-popup--open';

const closeAllPopup = (popupItems) => {
  popupItems?.forEach((item) => {
    item.classList.remove(OPEN_CLASS)
  })
}

const setPopup = (popupProperties) => {
  const { popupClass = '.button-popup', buttonClass = '.button-popup__button' } = popupProperties || {};
  const popupItems = document.querySelectorAll(popupClass);

  popupItems.forEach((item) => {
    const buttonPopup = item.querySelector(buttonClass);

    item.addEventListener('click', () => {
      if (item.classList.contains(OPEN_CLASS)) {
        closeAllPopup(popupItems);
      } else {
        closeAllPopup(popupItems);
        item.classList.add(OPEN_CLASS)
      }
    });

    buttonPopup.addEventListener('blur', () => {
      closeAllPopup(popupItems);
    })
  })
}


export default setPopup;

