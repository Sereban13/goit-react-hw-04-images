import axios from 'axios';

const API_KEY = '36106803-d64240cda904fbe2d47e1c8e1';
axios.defaults.baseURL = `https://pixabay.com/api`;

async function getImages(searchQuery, page) {
  const query = searchQuery.slice(14, searchQuery.length);

  const response = await axios.get(
    `/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response;
}

export { getImages };
