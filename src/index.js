import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './styles.css';

const refs = {
  selector: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};
refs.loader.classList.replace('loader', 'is-hidden');
refs.error.classList.add('is-hidden');
refs.divCatInfo.classList.add('is-hidden');

let breedsId = [];
fetchBreeds()
  .then(data => {
    data.forEach(element => {
      breedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: refs.selector,
      data: breedsId,
    });
  })
  .catch(onFetchError);

refs.selector.addEventListener('change', onChangeSelect);

function onChangeSelect(event) {
  refs.loader.classList.replace('is-hidden', 'loader');

  refs.selector.classList.add('is-hidden');

  const oneBreedId = event.currentTarget.value;
  fetchCatByBreed(oneBreedId)
    .then(data => {
      refs.loader.classList.replace('loader', 'is-hidden');
      refs.selector.classList.remove('is-hidden');

      const { url, breeds } = data[0];
      console.log(data[0]);

      refs.divCatInfo.innerHTML = `
               <div class="box-img">
                    <img src="${url}" alt="${breeds[0].name}" width="400"/>
                    </div>
                    <div class="box">
                    <h1>${breeds[0].name}</h1>
                    <p>${breeds[0].description}</p>
                    <p><b>Temperament:</b> ${breeds[0].temperament}</p>
                </div>`;
      refs.divCatInfo.classList.remove('is-hidden');
    })

    .catch(onFetchError);
}

function onFetchError(error) {
  refs.selector.classList.remove('is-hidden');
  refs.loader.classList.replace('loader', 'is-hidden');

  Notify.failure('Oops! Something went wrong! ', { timeout: 8000 });
}
