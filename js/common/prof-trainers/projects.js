const slideProjectItemTemplate = document.querySelector('#project-part').content.querySelector('.project-content__item')
const slideProjectTemplate = document.querySelector('#project-item').content.querySelector('.projects-list__item')
const projectsFullTemplate = document.querySelector('#project-full').content.querySelector('.projects-gallery__item')

const projectGallery = document.querySelector('#slider-projects-details')

const renderProjectsGallery = (projects) => {
  const projectsFragment = document.createDocumentFragment()
  const slideProjectsFragment = document.createDocumentFragment()
  const projectsFullFragment = document.createDocumentFragment()

  projects.forEach((project) => {
    const projectFull = projectsFullTemplate.cloneNode(true)

    projectFull.querySelector('.title-info').textContent = project.projectId
    projectsFullFragment.appendChild(projectFull)
    const projectsList = projectFull.querySelector('#projects-list')

    project.content.forEach((project) => {
      const projectPart = slideProjectTemplate.cloneNode(true)

      projectPart.querySelector('.accordion__title').textContent = project.type
      projectPart.querySelector('.accordion__number').innerHTML = project.icon
      slideProjectsFragment.appendChild(projectPart)
      projectsList.appendChild(slideProjectsFragment)

      project.trainers.forEach((content) => {
        const projectItem = slideProjectItemTemplate.cloneNode(true)
        const type = projectItem.querySelector('.type')

        content.title ? type.textContent = content.title : type.remove()
        projectItem.querySelector('.model').href = content?.link
        projectItem.querySelector('.model__name').textContent = content.model
        projectItem.querySelector('.model__type').textContent = content.name
        projectsFragment.appendChild(projectItem)
      })
      const sliderItems = projectPart.querySelector('#project-content')
      sliderItems.appendChild(projectsFragment)
    })
  })
  projectGallery.appendChild(projectsFullFragment)
}

export { renderProjectsGallery }
