import { Logger } from "sass";

const regionsTemplate = document.querySelector("#regions-item").content.querySelector('.delivery-region__item');
const regionsList = document.querySelector('#regions-list');


console.log(window.location.hostname  );
const renderCitiesDelivery = (items) => {
  const regionsContentFragment = document.createDocumentFragment();

  items?.forEach((item) => {
    const region = regionsTemplate.cloneNode(true);
    const button = region.querySelector('.button-simple');

    button.textContent = item.city;
    button.href = `https://${item.name}.fitnesslook.ru/pages/dostavka.html`;

    regionsContentFragment.appendChild(region);
  })

  regionsList.appendChild(regionsContentFragment);
}

export { renderCitiesDelivery }
