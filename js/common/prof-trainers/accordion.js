const settingAccordion = (props) => {
  return {
    duration: 400,
    ...props
  }
}

const settingAccordionAdaptive = (cb) => {
  if (window.innerWidth < 768) { cb.closeAll() } else { cb.openAll() };

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) { cb.closeAll() } else { cb.openAll() };
  });
}


export  {settingAccordion, settingAccordionAdaptive};
