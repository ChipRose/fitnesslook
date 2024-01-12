const GET_LINK = 'https://www.fitnesslook.ru/api_front/list_domain/';

const getData = (onSuccess) => {
  fetch(GET_LINK)
    .then((response) => {
      if (response.ok) {
        const regions = response.json();
        return regions;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((products) => onSuccess(products))
    .catch((error) => console.log(error));
}

export {getData}
