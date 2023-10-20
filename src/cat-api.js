import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_uNRLc0COBdNx17WnAGlMUQQ1O3sWv1wRyrDEdbOTLaWw1HoYnzFviM8nc7f87LBo'; 
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
    return response.data;
  } catch (error) {
    throw error;
  }
}

export { fetchBreeds, fetchCatByBreed };
