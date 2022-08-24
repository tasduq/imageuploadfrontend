import axios from 'axios';
let url = 'http://localhost:3001';

const uploadImages = async data => {
  let res = await axios.post(`${url}/api/images/postimages`, data);

  console.log(res);
  return res;
};

const getImages = async data => {
  let res = await axios.get(`${url}/api/images/getimages`);

  console.log(res);
  return res;
};

export { uploadImages, getImages };
