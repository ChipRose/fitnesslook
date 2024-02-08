const closeAllAccordions = (accordions) => {
  accordions?.forEach(item => {
    item.closeAll()
  })
}

const closeAllMobileAccordions = (accordions) => {
  if (window.innerWidth < 768) {
    accordions?.forEach(item => {
      item.closeAll()
    })
  }
}

const openAllDeskAccordions = (accordions) => {
  if (window.innerWidth >= 768) {
    accordions?.forEach(item => {
      item.openAll()
    })
  }
}

const settingAccordionAdaptive = (accordion, slider) => {
  let newAccordion = accordion

  if (!Array.isArray(accordion)) newAccordion = [accordion]
  closeAllMobileAccordions(newAccordion)
  openAllDeskAccordions(newAccordion)
  slider?.updateSliderHeight()

  window.addEventListener('resize', () => {
    closeAllMobileAccordions(newAccordion)
    openAllDeskAccordions(newAccordion)
    slider?.updateSliderHeight()
  })
}

export { settingAccordionAdaptive, closeAllAccordions }
