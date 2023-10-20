import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
    'live_uNRLc0COBdNx17WnAGlMUQQ1O3sWv1wRyrDEdbOTLaWw1HoYnzFviM8nc7f87LBo';
  
const apiBaseURL = 'https://api.thecatapi.com/v1';
const breedsURL = `${apiBaseURL}/breeds`;

async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    const catData = response.data;

    if (catData && catData.length > 0) {
      const cat = catData[0];
      return {
        name: cat.breeds[0].name,
        description: cat.breeds[0].description,
        temperament: cat.breeds[0].temperament,
        imageUrl: cat.url,
      };
    }
  } catch (error) {
    throw error;
  }
}

export { fetchBreeds, fetchCatByBreed };
