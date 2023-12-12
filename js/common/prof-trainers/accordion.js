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

const settingAccordionAdaptive = (cb) => {
  let newAccordion = cb;

  if (!Array.isArray(cb)) newAccordion = [cb]
  closeAllMobileAccordions(newAccordion);
  openAllDeskAccordions(newAccordion);

  window.addEventListener('resize', () => {
    closeAllMobileAccordions(newAccordion);
    openAllDeskAccordions(newAccordion);
  });
};

const settingMobileAccordionAdaptive = (cb) => {
  let newAccordion = cb;

  if (!Array.isArray(cb)) newAccordion = [cb]
  closeAllMobileAccordions(newAccordion);

  window.addEventListener('resize', () => {
    closeAllMobileAccordions(newAccordion);
  });
}


export { settingAccordion, settingAccordionAdaptive, closeAllAccordions, settingMobileAccordionAdaptive };
