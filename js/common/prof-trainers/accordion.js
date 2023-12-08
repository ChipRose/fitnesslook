const settingAccordion = (props) => {
  return {
    duration: 400,
    ...props
  }
}

const closeAllMobileAccordion = (accordions) => {
  if (window.innerWidth < 768) {
    accordions.forEach(item => {
      item.closeAll()
    });
  }
}

const openAllDeskAccordion = (accordions) => {
  if (window.innerWidth >= 768) {
    accordions.forEach(item => {
      item.openAll()
    });
  }
}

const settingAccordionAdaptive = (cb) => {
  let newAccordion = cb;

  if (!Array.isArray(cb)) newAccordion = [cb]
  closeAllMobileAccordion(newAccordion);
  openAllDeskAccordion(newAccordion);

  window.addEventListener('resize', () => {
    closeAllMobileAccordion(newAccordion);
    openAllDeskAccordion(newAccordion);
  });
};

const settingMobileAccordionAdaptive = (cb) => {
  let newAccordion = cb;

  if (!Array.isArray(cb)) newAccordion = [cb]
  closeAllMobileAccordion(newAccordion);

  window.addEventListener('resize', () => {
    closeAllMobileAccordion(newAccordion);
  });
}


export { settingAccordion, settingAccordionAdaptive, settingMobileAccordionAdaptive };
