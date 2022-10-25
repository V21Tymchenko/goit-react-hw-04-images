import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImages = async (imageName, pageNumber) => {
  const { data } = await axios.get(
    `/?q=${imageName}&page=${pageNumber}&key=30007287-c01b0e4a3e2dffba00e51bbf9&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data.hits;
};

export default fetchImages;

// const imageApi = axios.create({ baseURL: 'https://pixabay.com/api' });
// const imageApi = axios.create({
//   baseURL: 'https://pixabay.com/api',
//   // params: {
//   //   key: '30007287-c01b0e4a3e2dffba00e51bbf9',
//   //   mage_type: 'photo',
//   //   orientation: 'horizontal',
//   //   per_page: 12,
//   //   q: '',
//   //   page: 1,
//   // },
// });
