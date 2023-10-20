import axios from 'axios';

const apiKey =
  'live_uNRLc0COBdNx17WnAGlMUQQ1O3sWv1wRyrDEdbOTLaWw1HoYnzFviM8nc7f87LBo';

axios.defaults.headers.common['x-api-key'] = apiKey;

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw error;
  }
}
