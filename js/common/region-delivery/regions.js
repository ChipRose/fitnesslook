const regionsTemplate = document.querySelector("#regions-item").content.querySelector('.delivery-region__item');
const regionsList = document.querySelector('#regions-list');



const getFirstDomain = () => {
  const hostFull = window.location.hostname;
  const items = hostFull.split('.');

  return items[0] && items[0] !== "fitnesslook" ? items[0] : '';
}

const renderCitiesDelivery = (items) => {
  const regionsContentFragment = document.createDocumentFragment();
  
  items?.filter(({ name }) => name !== getFirstDomain()).forEach((item) => {
    const region = regionsTemplate.cloneNode(true);
    const button = region.querySelector('.button-simple');

    button.textContent = item.city;
    button.href = `https://${item.name}.fitnesslook.ru/pages/dostavka.html`;

    regionsContentFragment.appendChild(region);
  })

  regionsList.appendChild(regionsContentFragment);
}

export { renderCitiesDelivery }
