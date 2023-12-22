const CLOSE_CLASS = 'accordion--close';
const accordion = document.querySelector('.accordion');
const accordionButton = accordion.querySelector('.accordion__button');

const accordionContent = accordion.querySelector('.accordion__content');
const accordionBody = accordion.querySelector('.accordion__body');

if (accordion.classList.contains(CLOSE_CLASS)) {
  accordionBody.style.height = 0;
}

accordionButton.addEventListener('click', () => {
  console.log(accordionContent.offsetHeight);
  if (accordion.classList.contains(CLOSE_CLASS)) {
    accordion.classList.remove(CLOSE_CLASS);
    accordionBody.style.height = `${accordionContent.offsetHeight}px`;
  } else {
    accordion.classList.add(CLOSE_CLASS);
    accordionBody.style.height = 0;
  }
});
