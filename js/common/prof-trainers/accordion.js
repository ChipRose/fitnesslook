const settingAccordion = (props) => {
  return {
    duration: 400,
    ...props
  }
}

const settingAccordionInSlider = (slider, props) => {
  return {
    duration: 200,
    onOpen: () => {
      slider.updateSliderHeight()
    },
    onClose: () => {
      slider.updateSliderHeight()
    },
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
    })
  }
}

const openAllDeskAccordions = (accordions) => {
  if (window.innerWidth >= 768) {
    accordions.forEach(item => {
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

const settingMobileAccordionAdaptive = (accordion, slider) => {
  let newAccordion = accordion

  if (!Array.isArray(accordion)) newAccordion = [accordion]
  closeAllMobileAccordions(newAccordion)
  slider?.updateSliderHeight()

  window.addEventListener('resize', () => {
    closeAllMobileAccordions(newAccordion)
    slider?.updateSliderHeight()
  })
}

export { settingAccordion, settingAccordionInSlider, settingAccordionAdaptive, closeAllAccordions, settingMobileAccordionAdaptive }
