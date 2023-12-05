const settingAccordion = (props) => {
  return {
    duration: 400,
    ...props
  }
}

const settingAccordionAdaptive = (cb) => {
  console.log(cb);
  let newAccordion = cb;
  if (Array.isArray(cb)) newAccordion = cb[0]

  if (window.innerWidth < 768) {
    newAccordion.closeAll()
  } else {
    newAccordion.openAll()
  };

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      newAccordion.closeAll()
    } else {
      newAccordion.openAll()
    };
  });
}


export { settingAccordion, settingAccordionAdaptive };
