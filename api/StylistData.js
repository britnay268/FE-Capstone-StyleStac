import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getStylists = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stylists.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createStylist = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stylists.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateStylist = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/stylists/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { createStylist, updateStylist, getStylists };
