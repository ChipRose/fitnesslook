const closeAllAccordions = (accordions) => {
  accordions.forEach(item => {
    item.closeAll()
  })
}

const closeAllMobileAccordions = (accordions) => {
  if (window.innerWidth < 768) {
    accordions.forEach(item => {
      item.closeAll()
    });
  }
}

const settingAccordionInSlider = (slider, props) => {
  return {
    onOpen: () => {
      slider.updateSliderHeight();
    },
    onClose: () => {
      slider.updateSliderHeight();
    },
    ...props
  }
}

const openAllDeskAccordions = (accordions) => {
  if (window.innerWidth >= 768) {
    accordions.forEach(item => {
      item.openAll()
    });
  }
}

const settingAccordionAdaptive = (accordion, slider) => {
  let newAccordion = accordion;

  if (!Array.isArray(accordion)) newAccordion = [accordion]
  closeAllMobileAccordions(newAccordion);
  openAllDeskAccordions(newAccordion);
  slider?.updateSliderHeight();

  window.addEventListener('resize', () => {
    closeAllMobileAccordions(newAccordion);
    openAllDeskAccordions(newAccordion);
    slider?.updateSliderHeight();
  });
};

export { settingAccordionInSlider, settingAccordionAdaptive, closeAllAccordions };

