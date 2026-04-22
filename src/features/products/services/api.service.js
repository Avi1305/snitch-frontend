import axios from "axios";

const productApi = axios.create({
  baseURL: "/api/products",
  withCredentials:true
});

export async function createProduct(formData) {
  const response  = await productApi.post("/",formData);
  return response.data;
}

export async function getSellerProducts() {
  const response = await productApi.get("/seller");
  return response.data;
} 

export async function getProducts() {
  const response = await productApi.get("/");
  return response.data;
}

export async function getProductById(id) {
  const response = await productApi.get(`/details/${id}`);
  return response.data;
}