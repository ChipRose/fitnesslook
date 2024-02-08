const questionTemplate = document.querySelector('#question').content.querySelector('.faq__item')

const questionsList = document.querySelector('#faq-list')

const renderQuestionsList = (questions) => {
  const questionsFragment = document.createDocumentFragment()

  questions.forEach((question) => {
    const questionNode = questionTemplate.cloneNode(true)

    questionNode.querySelector('.title-secondary').textContent = question.title
    questionNode.querySelector('.accordion__text-block').innerHTML = question.answer

    questionsFragment.appendChild(questionNode)
  })
  questionsList.appendChild(questionsFragment)
}

export { renderQuestionsList }
