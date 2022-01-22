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

import { attemptGetWareHouses } from '../../../actions/warehouses';
import NewWareHouseModal from '../../components/warehouses/newWHModal';

const WareHouseDashBoard = () => {
  const [warehouses, setWareHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);


  const fecthUsers = () => {
    attemptGetWareHouses()
      .then((data) => {
        setWareHouses(data);
        setLoading(false);
      })
      .catch(() => { });
  };

  useEffect(() => { fecthUsers(); }, [loading]);

  const closeModal = () => {
    fecthUsers();
    setVisible(false);
  };

  return !loading && (
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              <b>WareHouses</b>
              <CButton className='float-end' color="success" onClick={() => setVisible(true)}>
                Add WareHouse
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive borderless>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      House ID
                    </CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      Stock Limit
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      Available Space
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {warehouses.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <div>{item.id_warehouse}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.warehouse_name}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.stock_limit}</div>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div>{item.available_space}</div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <NewWareHouseModal
        visible={visible}
        closemodal={closeModal}
      />
    </>
  )
}

export default WareHouseDashBoard