
const setAccordions = (selector) => {
  const accordions = Array.from(document.querySelectorAll(selector));
  const windowWidth = window.innerWidth;

  const accordionHandler = (evt) => {
    evt.preventDefault();

    const currentAccordion = evt.target.closest(selector);
    const currentContent = evt.target.nextElementSibling;

    const inactiveAccordion = accordions.filter((accordion) => accordion !== currentAccordion);

    inactiveAccordion.forEach((accordion) => {
      accordion.classList.remove('active');
      accordion.querySelector(`${selector}__content`).style.maxHeight = 0;
    });

    let widthFlag = true;

    const closeAccordion = () => {
      currentAccordion.classList.remove('active');
      currentContent.style.maxHeight = 0;
    };

    if (widthFlag) {
      currentAccordion.classList.toggle('active');
    }

    const closeAccordionHandler = () => {
      const windowCloseWidth = window.innerWidth;
      widthFlag = windowCloseWidth === windowWidth;

      if (!widthFlag) {
        closeAccordion();
      }
    };

    if (currentAccordion.classList.contains('active')) {

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
};

export { setAccordions };

