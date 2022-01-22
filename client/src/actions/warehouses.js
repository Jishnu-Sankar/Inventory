/**
 * ware house actions
 */
import { dispatchError } from '../utils/api';
import { getWareHouseLists, getWareHouseByID, createWareHouse } from '../api/warehouses';
import Notifiy from '../components/Notification.js';

export const attemptGetWareHouses = () =>
  getWareHouseLists()
    .then((data) => data.data)
    .catch((err) => dispatchError(err));

export const attemptGetWareHouseByID = (id) =>
  getWareHouseByID(id)
    .then((data) => data)
    .catch((err) => dispatchError(err));

export const attemptAddWareHouse = (fields) =>
  createWareHouse(fields)
    .then((data) => {
      Notifiy.successNotify(data.message);
      return data;
    })
    .catch((err) => dispatchError(err));
