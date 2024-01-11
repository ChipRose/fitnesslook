

const LOCATION = {center: [59.997230, 30.269389], controls:['zoomControl'], zoom: 13};
const map=document.querySelector('#map');
map.replaceChildren()



const initMap = () => {
  const myMap = new ymaps.Map('map', LOCATION);
  const myPlacemark = new ymaps.Placemark(myMap.getCenter(),{},{
    iconLayout: 'default#image',
    iconImageHref: '/i/media/stat/icons/ancor.svg',
    icon_imagesize: [200, 200],
    // iconImageOffset: [75, 75]

  });
  myMap.controls.get('zoomControl').options.set('size', 'small');

  myMap.geoObjects
  .add(myPlacemark);

};

export default initMap;
