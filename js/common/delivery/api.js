const GET_LINK = '/api_front/list_domain/';
const POST_LINK = '/api_front/lid/';

const getData = (onSuccess = () => { }, onError = () => { }) => {
  fetch(GET_LINK)
    .then((response) => {
      if (response.ok) {
        const regions = response.json();
        return regions;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((products) => onSuccess(products))
    .catch((error) => onError(error));
};

const sendData = (onSuccess, onError, data) => {
  fetch(POST_LINK,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
  )
    .then((response) => response.ok ? onSuccess() : onError())
    .catch(() => onError());
};

export { getData, sendData };
