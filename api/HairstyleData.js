import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllHairstyles = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/hairstyles.json`, {
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

const getHairstylesByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/hairstyles.json?orderBy="uid"&equalTo="${uid}"`, {
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

const getSingleHairstyle = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/hairstyles/${firebaseKey}.json`, {
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

const createHairstyle = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/hairstyles.json`, {
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

const updateHairstyle = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/hairstyles/${payload.firebaseKey}.json`, {
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

const deleteHairstyle = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/hairstyles/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
export {
  getAllHairstyles, getHairstylesByUid, getSingleHairstyle, createHairstyle, updateHairstyle, deleteHairstyle,
};
