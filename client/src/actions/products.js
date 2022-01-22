/**
 * products actions
 */
import { dispatchError } from '../utils/api';
import { getProductsLists, getProductByID, createProduct } from '../api/products';
import Notifiy from '../components/Notification.js';

export const attemptGetProducts = () =>
  getProductsLists()
    .then((data) => data.data)
    .catch((err) => dispatchError(err));

export const attemptGetProductByID = (id) =>
  getProductByID(id)
    .then((data) => data)
    .catch((err) => dispatchError(err));

export const attemptAddProduct = (fields) =>
  createProduct(fields)
    .then((data) => {
      Notifiy.successNotify(data.message);
      return data;
    })
    .catch((err) => dispatchError(err));
