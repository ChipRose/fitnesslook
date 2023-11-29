
const slideProjectItemTemplate = document.querySelector("#project-part").content.querySelector('.slider-project__part');
const slideProjectTemplate = document.querySelector("#project-item").content.querySelector('.projects-list__item');

const projectsList = document.querySelector('#projects-list');

const renderSlide = (project) => {
  const projectsFragment = document.createDocumentFragment();
  const slideProjectsFragment = document.createDocumentFragment();

  project.content.forEach((project) => {
    const projectPart = slideProjectTemplate.cloneNode(true);
    projectPart.querySelector('.accordion__title').textContent = project.type;
    projectPart.querySelector('.accordion__number').innerHTML = project.icon;
    slideProjectsFragment.appendChild(projectPart);
    projectsList.appendChild(slideProjectsFragment);

    project.trainers.forEach((content) => {
      const projectItem = slideProjectItemTemplate.cloneNode(true);

      projectItem.querySelector('.type').textContent = content.title;
      projectItem.querySelector('.model__name').textContent = content.model;
      projectItem.querySelector('.model__type').textContent = content.name;
      projectsFragment.appendChild(projectItem);
    })
    const sliderItems = projectPart.querySelector('#slider-projects');
    sliderItems.appendChild(projectsFragment);
  })
}

export { renderSlide };
