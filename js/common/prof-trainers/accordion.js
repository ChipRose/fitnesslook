const settingAccordion = (props) => {
  return {
    duration: 400,
    ...props
  }
}

const settingAccordionAdaptive = (cb) => {
  let newAccordion = cb;

  if (!Array.isArray(cb)) newAccordion = [cb]

  if (window.innerWidth < 768) {
    newAccordion.forEach(item => {
      item.closeAll()
    });
  } else {
    newAccordion.forEach(item => {
      item.openAll()
    })
  };

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      newAccordion.forEach(item => {
        item.closeAll()
      });
    } else {
      newAccordion.forEach(item => {
        item.openAll()
      })
    };
  });
}


export { settingAccordion, settingAccordionAdaptive };
