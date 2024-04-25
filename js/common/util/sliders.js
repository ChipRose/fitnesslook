const setSimpleSlider = (buttonsSelector, container, activeSlide = 0) => {
  const sliderButtons = document.querySelector(buttonsSelector);
  const slideContainer = document.querySelector(container);
  const children = Array.from(slideContainer.children);
  const buttons = Array.from(sliderButtons.children);

  buttons?.forEach((element) => element.classList.remove('button-main--active'));
  children?.forEach((element) => {
    element.style.display = 'none';
  });

  children[activeSlide].style.display = 'block';
  buttons[activeSlide].classList.add('button-main--active');

  sliderButtons.addEventListener('click', (evt) => {
    const item = slideContainer.querySelector(`#${evt.target.value}`);

    buttons?.forEach((element) => {
      if (element.value === evt.target.value) {
        element.classList.add('button-main--active');
      } else {
        element.classList.remove('button-main--active');
      }
    });

    children?.forEach((element) => {
      element.style.display = 'none';
    });
    item.style.display = 'block';
  });
};

export { setSimpleSlider };
