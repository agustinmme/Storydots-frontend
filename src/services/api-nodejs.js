import axios from "axios";

// Al estar usando vite tengo que utilizar de una manera diferente las variables de entorno.
//Normalmente en react seria process.env y el nombre porque corre por debajo dotenv...
// En el caso de nodejs se instala dotenv se requiere/importa y ya se podria utilizar EJ: process.env.ALKEMY_KEY
const baseUrl = import.meta.env.VITE_URL_APINODE;

//Products
const getPageProduct = async (page) => {
  const { data } = await axios.get(`${baseUrl}/products/?page=${page}`);
  return data;
};

const getProduct = async (id) => {
  const { data } = await axios.get(`${baseUrl}/products/${id}`);
  return data;
};

const addProduct = async ({name,description,image_url,price,brandId,token}) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
};
  const { data } = await axios.post(`${baseUrl}/products/new`,{name,description,image_url,price,brandId},config);
  return data;
};

const updateProduct = async ({name,description,image_url,price,id,token}) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const { data } = await axios.put(`${baseUrl}/products/${id}`,{name,description,image_url,price},config);
  return data;
};

const deleteProduct = async (id,token) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  const { data } = await axios.delete(`${baseUrl}/products/${id}`,config);
  return data;
};

//User
const singUp = async (credentials) => {
  const { data } = await axios.post(`${baseUrl}/users/register`,credentials);
  return data;
};

const singIn = async (credentials) => {
  const { data } = await axios.post(`${baseUrl}/users/login`,credentials);
  return data;
};

//Brands

const getAllBrands = async () => {
  const { data } = await axios.get(`${baseUrl}/brands`);
  return data;
};


const getBrand = async (id) => {
  const { data } = await axios.get(`${baseUrl}/brands/${id}`);
  return data;
};

const addBrand = async (name,logo_url) => {
  const { data } = await axios.post(`${baseUrl}/brands/new`);
  return data;
};

const updateBrand = async (name,description,image_url,price,brandId) => {
  const { data } = await axios.put(`${baseUrl}/brands/new`);
  return data;
};

const deleteBrand = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/brands/id`);
  return data;
};

export default {
  getPageProduct,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  singUp,
  singIn,
  getAllBrands
};