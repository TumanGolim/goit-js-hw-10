import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

function hideLoaderAndError() {
  loader.style.display = 'none';
  error.style.display = 'none';
}

function showLoader() {
  loader.style.display = 'block';
  error.style.display = 'none';
}

hideLoaderAndError();

function isOnline() {
  return navigator.onLine;
}

window.addEventListener('online', () => {
  hideLoaderAndError();
});

window.addEventListener('offline', () => {
  showError('Oops! You are currently offline. Please check your internet connection.');
});

breedSelect.addEventListener('change', async event => {
  const breedId = event.target.value;

  if (!isOnline()) {
    showError('Oops! You are currently offline. Please check your internet connection.');
    return;
  }

  showLoader();
  catInfo.innerHTML = '';

  try {
    const breeds = await fetchBreeds();
    const selectedBreed = breeds.find(breed => breed.id === breedId);

    if (selectedBreed) {
      const catData = await fetchCatByBreed(breedId);
      hideLoaderAndError();
      displayCatData(catData);
    }
  } catch (error) {
    hideLoaderAndError();
    showError('Oops! Something went wrong. Try reloading the page.');
  }
});

async function initApp() {
  if (!isOnline()) {
    showError('Oops! You are currently offline. Please check your internet connection.');
    return;
  }

  showLoader();
  try {
    const breeds = await fetchBreeds();
    hideLoaderAndError();
    populateBreedSelect(breeds);
  } catch (error) {
    hideLoaderAndError();
    showError('Oops! Something went wrong. Try reloading the page.');
  }
}

initApp();

function displayCatData(catData) {
  const catImage = document.createElement('img');
  catImage.src = catData.imageUrl;
  catImage.alt = catData.name;

  const catText = document.createElement('div');
  catText.innerHTML = `
    <h2>${catData.name}</h2>
    <p>${catData.description}</p>
    <p><strong>Temperament:</strong> ${catData.temperament}</p>
  `;

  catImage.classList.add('cat-image');
  catText.classList.add('cat-text');

  catInfo.appendChild(catImage);
  catInfo.appendChild(catText);
}

function populateBreedSelect(breeds) {
  breedSelect.innerHTML = breeds
    .map(breed => `<option value="${breed.id}">${breed.name}</option>`)
    .join('');
}

function showError(message) {
  error.style.display = 'block';
  error.textContent = message;
}
