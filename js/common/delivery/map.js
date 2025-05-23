/* eslint-disable no-undef */
const LOCATION = { center: [59.997255, 30.268759], controls: ['zoomControl'], zoom: 16 };
const ANCOR = {
  iconLayout: 'default#image',
  iconImageHref: '/i/media/stat/icons/ancor.svg',
  iconImageSize: [50, 50],
  iconImageOffset:[-25,-25]
};

const map = document.querySelector('#map');
map.replaceChildren();

const initMap = () => {
  const myMap = new ymaps.Map('map', LOCATION);
  const myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, ANCOR);
  myMap.controls.get('zoomControl').options.set('size', 'small');
  myMap.behaviors.disable('drag');
  myMap.geoObjects
    .add(myPlacemark);
};

export default initMap;
