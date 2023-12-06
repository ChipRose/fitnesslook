const GET_LINK = 'https://www.fitnesslook.ru/?products_prof_trainers=1';

const getData = (onSuccess) => {
  fetch(GET_LINK)
    .then((response) => {
      if (response.ok) {
        const products = response.json();
        return products;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((products) => onSuccess(products))
    .catch((error) => console.log(error));
}

export {getData}