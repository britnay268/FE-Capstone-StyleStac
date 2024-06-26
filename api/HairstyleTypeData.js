import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllHairstyleType = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/hairstyle_type.json`, {
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

const getSingleHairstyleType = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/hairstyle_type/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch(reject);
});

export { getAllHairstyleType, getSingleHairstyleType };
