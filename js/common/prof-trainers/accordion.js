const settingAccordion = (props) => {
  return {
    duration: 10,
    ...props
  }
}

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

  window.addEventListener('resize', () => {
    closeAllMobileAccordions(newAccordion);
    openAllDeskAccordions(newAccordion);
  });
};

const settingMobileAccordionAdaptive = (accordion) => {
  let newAccordion = accordion;

  if (!Array.isArray(accordion)) newAccordion = [accordion]
  closeAllMobileAccordions(newAccordion);

  window.addEventListener('resize', () => {
    closeAllMobileAccordions(newAccordion);
  });
}


export { settingAccordion, settingAccordionAdaptive, closeAllAccordions, settingMobileAccordionAdaptive };
