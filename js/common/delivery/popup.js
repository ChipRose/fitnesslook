const OPEN_CLASS = 'button-popup--open';

const closeAllPopup = (popupItems) => {
  popupItems?.forEach((item) => {
    item.classList.remove(OPEN_CLASS);
    item.querySelector('.button-popup__modal').style.width = '0';

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
        item.classList.add(OPEN_CLASS);
        const innerWidth = `${item.querySelector('.button-popup__modal .text').offsetWidth}px`
        item.querySelector('.button-popup__modal').style.width = innerWidth;
        console.log(item.querySelector('.button-popup__modal .text').offsetWidth);
      }

    });

    buttonPopup.addEventListener('blur', () => {
      closeAllPopup(popupItems);
    })
  })
}


export default setPopup;

