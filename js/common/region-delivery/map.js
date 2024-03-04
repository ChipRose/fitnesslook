const getFirstDomain = () => {
  const hostFull = window.location.hostname;
  const items = hostFull.split('.');

  return items[0] && items[0] !== 'fitnesslook' ? items[0] : '';
};

export const initMap = (regions) => {
  const map = document.querySelector('#cdek-map')
  map.replaceChildren();
  console.log(regions);
  const firstDomain = getFirstDomain();
  console.log(firstDomain);

  const widjet = new ISDEKWidjet({
    hidedelt: true,
    defaultCity: 'auto',
    cityFrom: 'Санкт-Петербург',
    link: 'cdek-map',
    apiKey:'13739b0f-0d5b-4af4-aec0-22bc5523893a',
    region: true,
    choose: false
  });
}
