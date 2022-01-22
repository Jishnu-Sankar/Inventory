/**
 * products actions
 */
import { dispatchError } from '../utils/api';
import { getStocksLists, getStockByID, createStock, unStockProduct } from '../api/stocks';
import Notifiy from '../components/Notification.js';

export const attemptGetStocks = () =>
  getStocksLists()
    .then((data) => data.data)
    .catch((err) => dispatchError(err));

export const attemptGetStockByID = (id) =>
  getStockByID(id)
    .then((data) => data)
    .catch((err) => dispatchError(err));

export const attemptAddStock = (fields) =>
  createStock(fields)
    .then((data) => {
      Notifiy.successNotify(data.message);
      return data;
    })
    .catch((err) => dispatchError(err));

export const attemptUnStock = (id_stock, fields) =>
  unStockProduct(id_stock, fields)
    .then((data) => {
      Notifiy.successNotify(data.message);
      return data;
    })
    .catch((err) => dispatchError(err));
