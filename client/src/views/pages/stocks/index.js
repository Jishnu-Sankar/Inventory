import React, { useEffect, useState } from 'react'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { attemptGetStocks } from '../../../actions/stocks';
import NewStockModal from '../../components/stocks/newModal';

const StocksDashboard = () => {
  const [stocks, setStocksBy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);


  const fetchStocks = () => {
    attemptGetStocks()
      .then((data) => {
        setStocksBy(data);
        setLoading(false);
      })
      .catch(() => { });
  };

  useEffect(() => { fetchStocks(); }, [loading]);

  const closeModal = () => {
    fetchStocks();
    setVisible(false);
  };

  return !loading && (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <b>Stocks</b>
              <CButton className='float-end' color="success" onClick={() => setVisible(true)}>
                Add Stock
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive borderless>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">Stock ID</CTableHeaderCell>
                    <CTableHeaderCell>Ware House</CTableHeaderCell>
                    <CTableHeaderCell>Product</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">Quantity</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {stocks.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <div>{item.id_stock}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.warehouse_name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.product_name}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.stock_qty}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
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

export default StocksDashboard