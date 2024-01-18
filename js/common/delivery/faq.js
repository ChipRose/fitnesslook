
const questionTemplate = document.querySelector("#question").content.querySelector('.faq__item');

const questionsList = document.querySelector('#faq-list');

const renderQuestionsList = (questions) => {
  const questionsFragment = document.createDocumentFragment();
  // const productContentFragment = document.createDocumentFragment();

  questions.forEach((question) => {
    const questionNode = questionTemplate.cloneNode(true);

    questionNode.querySelector('.title-secondary').textContent = question.title;
    questionNode.querySelector('.accordion__text-block').innerHTML = question.answer;
    // productFull.querySelector('.product-gallery-set__buttons').id = `product-list-buttons-${product.id}`;
    // productFull.querySelector('.product-gallery-set__slider').id = `product-list-${product.id}`;
    // productFull.querySelector('#gallery-cover').src = product.cover?.image;
    // productFull.querySelector('#title-icon-text').textContent = product.type;

    questionsFragment.appendChild(questionNode);

    // const productsContent = productFull.querySelector('.products-content');


  })

  questionsList.appendChild(questionsFragment);

}

export { renderQuestionsList }
