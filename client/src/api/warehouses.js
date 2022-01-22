import request from "superagent";
import { handleSuccess, handleError } from '../utils/api';


export const getWareHouseLists = () =>
  request.get('http://localhost:4000/api/warehouses')
    .then(handleSuccess)
    .catch(handleError);

export const getWareHouseByID = (id) =>
  request.get(`http://localhost:4000/api/warehouses/${id}`)
    .then(handleSuccess)
    .catch(handleError);

export const createWareHouse = (fields) =>
  request.post(`http://localhost:4000/api/warehouses/`)
    .send({ ...fields })
    .then(handleSuccess)
    .catch(handleError);
