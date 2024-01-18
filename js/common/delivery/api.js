const GET_LINK = 'https://www.fitnesslook.ru/api_front/list_domain/';
// const POST_LINK ='';
const POST_LINK = 'https://httpbin.org/post';


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

const sendData = (onSuccess, onError, body) => {
  fetch(POST_LINK,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      response.ok ? onSuccess() : onError();
    })
    .catch(() => onError());
};

export { getData, sendData };
