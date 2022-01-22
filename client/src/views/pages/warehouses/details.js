import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Redirect } from 'react-router'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormLabel,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { attemptGetWareHouseByID } from '../../../actions/warehouses';
import { attemptUnStock } from '../../../actions/stocks';
import NewStockModal from '../../components/stocks/newModal';

const WareHouseDetails = () => {
  const currentLocation = useLocation().pathname;
  const [warehouse, setWareHouse] = useState({});
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);


  const fetchWareHouses = () => {
    const houseID = currentLocation.split('/warehouses/')[1];
    if (!houseID) {
      <Redirect to="#/404" />
    } else {
      attemptGetWareHouseByID(houseID)
        .then((details) => {
          setWareHouse(details.data);
          setStocks(details.data.stocks);
          setLoading(false);
        })
        .catch((err) => <Redirect to="#/404" />);
    }
  };

  useEffect(() => { fetchWareHouses(); }, [loading]);

  const closeModal = () => {
    fetchWareHouses();
    setVisible(false);
  };

  const unStock = e => {
    const { value: id_stock, id: id_product } = e.target;

    attemptUnStock(id_stock, { id_product, quantity: 0 })
      .then((data) => {
        fetchWareHouses();
      })
  };

  return !loading && (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <b>WareHouse Details</b>
              <CButton className='float-end' color="success" onClick={() => setVisible(true)} disabled={!warehouse.available_space}>
                Add Stocks
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs='4'>
                  <b>HouseID</b>
                </CCol>
                <CCol xs='2'>
                  <b>:</b>
                </CCol>
                <CCol xs='6'>
                  {warehouse.id_warehouse}
                </CCol>
                <CCol xs='4'>
                  <b>House Name</b>
                </CCol>
                <CCol xs='2'>
                  <b>:</b>
                </CCol>
                <CCol xs='6'>
                  {warehouse.warehouse_name}
                </CCol>
                <CCol xs='4'>
                  <b>Stock Limit</b>
                </CCol>
                <CCol xs='2'>
                  <b>:</b>
                </CCol>
                <CCol xs='6'>
                  {warehouse.stock_limit}
                </CCol>
                <CCol xs='4'>
                  <b>Available Space</b>
                </CCol>
                <CCol xs='2'>
                  <b>:</b>
                </CCol>
                <CCol xs='6'>
                  {warehouse.available_space}
                </CCol>
              </CRow>
              <br />
              <CFormLabel><b>Stock Details</b></CFormLabel>
              <CTable hover responsive borderless>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">Stock ID</CTableHeaderCell>
                    <CTableHeaderCell>Product</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Quantity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {stocks.length > 0 ? (
                  <CTableBody>
                    {stocks.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell className="text-center">
                          <div>{item.id_stock}</div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div>{item.product_name}</div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <div>{item.stock_qty}</div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <div>
                            <CButton size="sm" color='danger' value={item.id_stock} id={item.id_product} onClick={unStock}>
                              Unstock
                            </CButton>
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                )

                  : (
                    <CTableBody>
                      <CTableRow v-for="item in tableItems">
                        <CTableDataCell className="text-center">
                          <div></div>
                        </CTableDataCell>
                        <CTableDataCell>
                          <div></div>
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          <div></div>
                        </CTableDataCell>
                      </CTableRow>
                    </CTableBody>
                  )
                }

              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <NewStockModal
        visible={visible}
        closemodal={closeModal}
      />
    </>
  )
}

export default WareHouseDetails