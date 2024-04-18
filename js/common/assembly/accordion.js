// Accordion

const accordions = Array.from(document.querySelectorAll('.accordion'));

const windowWidth = window.innerWidth;

const accordionHandler = (evt) => {
  evt.preventDefault();
  const curentAccordion = evt.target.closest('.accordion');
  const currentContent = evt.target.nextElementSibling;
  let widthFlag = true;

  if (widthFlag) {
    curentAccordion.classList.toggle('active');
  }

  const closeAccordion = () => {
    curentAccordion.classList.remove('active');
    currentContent.style.maxHeight = 0;
  };

  const closeAccordionHandler = () => {
    const windowCloseWidth = window.innerWidth;
    widthFlag = windowCloseWidth === windowWidth;

    if (!widthFlag) {
      closeAccordion();
    }
  };

  if (curentAccordion.classList.contains('active')) {

    currentContent.style.maxHeight = `${currentContent.scrollHeight}px`;

    window.addEventListener('resize', closeAccordionHandler);

  } else {
    closeAccordion(currentContent);

    window.removeEventListener('resize', closeAccordionHandler);
  }
};

accordions?.forEach((accordion) => {
  accordion.addEventListener('click', accordionHandler);
});
