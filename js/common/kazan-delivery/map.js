/* eslint-disable no-undef */
const LOCATION = { center: [55.82975956889855, 49.117705999999984], controls: ['zoomControl'], zoom: 16 };
const ANCOR = {
  iconLayout: 'default#image',
  iconImageHref: '/i/media/stat/icons/ancor.svg',
  iconImageSize: [50, 50],
  iconImageOffset: [-25, -25]
};
const BALOON = {
  balloonContent: '<strong>ТРЦ "Парк Хаус"</strong><p class="text text-main">До 22:00</p>',
  iconCaption: 'До 22:00'
};

const map = document.querySelector('#map');
map.replaceChildren();

const initMap = () => {
  const myMap = new ymaps.Map('map', LOCATION);
  const myPlacemark = new ymaps.Placemark(myMap.getCenter(), BALOON, ANCOR);
  myMap.controls.get('zoomControl').options.set('size', 'small');
  myMap.behaviors.disable('drag');
  myMap.geoObjects
    .add(myPlacemark);
};

export default initMap;
