// import { formatPrice } from "./util.js";

const regionsTemplate = document.querySelector("#regions-item").content.querySelector('.button-block__item');
const regionsList = document.querySelector('#regions-list');

const renderCitiesDelivery = (items) => {
  console.log(items);
  const regionsContentFragment = document.createDocumentFragment();

  items.forEach((item) => {
    const region = regionsTemplate.cloneNode(true);
    const button = region.querySelector('.button-main');

    button.textContent = item.city;
    button.href = `https://${item.name}.fitnesslook.ru/pages/dostavka.html`;

    regionsContentFragment.appendChild(region);
  })

  regionsList.appendChild(regionsContentFragment);
}

export { renderCitiesDelivery }
