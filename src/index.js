// import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const infoCat= document.querySelector('.info-cat');

function createBreedOption(breed) {
  error.style.display = 'none';

  const option = document.createElement('option');
  option.value = breed.id;
  option.textContent = breed.name;
  breedSelect.appendChild(option);
}

function displayInfoCat(cat) {
  infoCat.innerHTML = `
    <img src="${cat.url}" alt="Cat Image" width= "500" />
    <h3>${cat.breeds[0].name}</h3>
    <p> ${cat.breeds[0].description}</p>
    <p> ${cat.breeds[0].temperament}</p> `;
  infoCat.style.display = 'block';
}

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  if (selectedBreedId) {
    loader.style.display = 'block';
    infoCat.style.display = 'none';
    error.style.display = 'none';

    fetchCatByBreed(selectedBreedId)
      .then(cat => {
        displayInfoCat(cat);
        loader.style.display = 'none';
      })
      .catch(() => {
        Notiflix.Notify.failure(
          `❌Такого пухнастика не вдалося знайти. Будь ласка перезавантажте сторінку! `
        );
        loader.style.display = 'none';
      });
  } else {
    infoCat.style.display = 'none';
  }
});

fetchBreeds()
  .then(breeds => {
    breeds.forEach(breed => createBreedOption(breed));
    loader.style.display = 'none';
  })
  .catch(() => {
    Notiflix.Notify.warning(
      `Oops! Something went wrong! Try reloading the page!`
    );
    loader.style.display = 'none';
  });
