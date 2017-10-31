import {SERVER_URL, DEFAULT_NAME} from '../data/constants';

export function loadData(path = SERVER_URL) {
  return fetch(`${path}/questions`).then((res) => res.json());
}

export function loadResults({path = SERVER_URL, name = DEFAULT_NAME}) {
  return fetch(`${path}/stats/${name}`).then((res) => res.json());
}

export function saveResults({path = SERVER_URL, data, name = DEFAULT_NAME}) {
  const requestSettings = {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': `application/json`
    },
    method: `POST`
  };
  return fetch(`${path}/stats/${name}`, requestSettings);
}
