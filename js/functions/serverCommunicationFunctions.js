import {SERVER_URL, DEFAULT_NAME} from '../data/constants';
/**
 * Load question list from server in json and convert it to js array/object
 * @param {string} path to data
 * @return {Promise.<*>} promise with resolved json
 */
export function loadData(path = SERVER_URL) {
  return fetch(`${path}/questions`).then(
      (res) => res.json(),
      (err) => window.console.log(err));
}

/**
 * Load statistic data from server in json and convert it to js array/object
 * @param {string} path to data on server
 * @param {string} name of user-owner of statistics 
 * @return {Promise.<*>} promise with resolved json
 */
export function loadResults({path = SERVER_URL, name = DEFAULT_NAME}) {
  return fetch(`${path}/stats/${name}`).then(
      (res) => res.json(),
      (err) => window.console.log(err));
}

/**
 * Save statistic data to server converting it to json
 * @param {string} path to data on server
 * @param {string} name of user-owner of statistics
 * @param {object} data to save
 * @return {Promise.<*>} promise with resolved json
 */
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
