import request from "superagent";
import { handleSuccess, handleError } from '../utils/api';


export const getProductsLists = () =>
  request.get('http://localhost:4000/api/products')
    .then(handleSuccess)
    .catch(handleError);

export const getProductByID = (id) =>
  request.get(`http://localhost:4000/api/products/${id}`)
    .then(handleSuccess)
    .catch(handleError);

export const createProduct = (fields) =>
  request.post(`http://localhost:4000/api/products/`)
    .send({ ...fields })
    .then(handleSuccess)
    .catch(handleError);
