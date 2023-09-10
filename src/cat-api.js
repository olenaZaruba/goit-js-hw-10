const url = 'https://api.thecatapi.com/v1';
const api_key =
  'live_k60skZ9dAI1usn8K94EWSBkbBDHPZ9LfJ8U2EoZKSUwbAPd2mX1y9eQdFZiEyrUd';

// import { refs } from './index.js';

export function fetchBreeds() {
  return fetch(`${url}/breeds?api_key=${api_key}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(oneBreedId) {
  return fetch(
    `${url}/images/search?api_key=${api_key}&breed_ids=${oneBreedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
