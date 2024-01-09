

// import * as ymaps3 from 'ymaps3';

const LOCATION = {center: [37.623082, 55.75254], zoom: 9};

const initMap = () => {
  const myMap = new ymaps.Map('map-container', LOCATION);
  myMap.disableDragging()
};

export default initMap;
