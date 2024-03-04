export const initMap = () => {
  const map = document.querySelector('#cdek-map')
  map.replaceChildren();

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
