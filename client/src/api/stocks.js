import request from "superagent";
import { handleSuccess, handleError } from '../utils/api';


export const getStocksLists = () =>
  request.get('http://localhost:4000/api/stocks')
    .then(handleSuccess)
    .catch(handleError);

export const getStockByID = (id) =>
  request.get(`http://localhost:4000/api/stocks/${id}`)
    .then(handleSuccess)
    .catch(handleError);

export const createStock = (fields) =>
  request.post(`http://localhost:4000/api/stocks/`)
    .send({ ...fields })
    .then(handleSuccess)
    .catch(handleError);

export const unStockProduct = (id, fields) =>
  request.put(`http://localhost:4000/api/stocks/${id}`)
    .send({ ...fields })
    .then(handleSuccess)
    .catch(handleError);
