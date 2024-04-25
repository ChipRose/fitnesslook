
const setAccordions = (selector = '.accordion-simple') => {
  const accordions = Array.from(document.querySelectorAll(selector));
  const windowWidth = window.innerWidth;
  const accordionContentSelector = `${selector}__content`;
  const accordionAdaptiveSelector = `${selector}--mobonly`.substring(1);

  const accordionHandler = (evt) => {
    evt.preventDefault();

    const currentAccordion = evt.target.closest(selector);
    const currentContent = currentAccordion.querySelector(accordionContentSelector);

    const inactiveAccordion = accordions.filter((accordion) => accordion !== currentAccordion && !accordion.classList.contains('open-desk'));

    inactiveAccordion.forEach((accordion) => {
      accordion.classList.remove('active');
      accordion.querySelector(accordionContentSelector).style.maxHeight = 0;
    });

    let widthChangeFlag = true;

    const closeAccordion = () => {
      if(!currentAccordion.classList.contains('open-desk')){
        currentAccordion.classList.remove('active');
        currentContent.style.maxHeight = 0;
      }
    };

    if (widthChangeFlag) {
      currentAccordion.classList.toggle('active');
    }

    const closeAccordionHandler = () => {
      const windowCloseWidth = window.innerWidth;
      widthChangeFlag = windowCloseWidth === windowWidth;

      if (!widthChangeFlag) {
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

  const setAccordionsListener = (accordion, destroyAccordionFlag) => {
    const accordionContent = accordion.querySelector(accordionContentSelector);

    if (accordion.classList.contains(accordionAdaptiveSelector)) {
      if (destroyAccordionFlag) {
        accordion.removeEventListener('click', accordionHandler);
        accordionContent.style.maxHeight = `${accordionContent.scrollHeight}px`;
        accordion.classList.add('open-desk');
      } else {
        accordion.addEventListener('click', accordionHandler);
        accordionContent.style.maxHeight = 0;
        accordion.classList.remove('open-desk');
      }
    } else {
      accordion.addEventListener('click', accordionHandler);
    }
  };

  accordions?.forEach((accordion) => {
    setAccordionsListener(accordion);
  });

  const windowChangeDeskWidthFlag = window.innerWidth > 767;

  accordions?.forEach((accordion) => {
    setAccordionsListener(accordion, windowChangeDeskWidthFlag);
  });

  window.addEventListener('resize', () => {
    const destroyAccordionFlag = window.innerWidth > 767;

    accordions?.forEach((accordion) => {
      setAccordionsListener(accordion, destroyAccordionFlag);
    });
  });
};

export { setAccordions };

